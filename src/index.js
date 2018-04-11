Array.prototype.drop = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

Object.prototype.isEmpty = function() {
  const obj = this;
  return Object.keys(obj).length === 0;
}

function sanitize(value=null) {
  if (!value) return null;
  if (typeof value !== "string") return value;

  return value.trim();
}

function validateEmail(email) {
  const patt = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!patt.test(email)) return "Invalid email address";

  return null;
}

function validateLatitude(latitude) {
  if (!(isFinite(latitude) && Math.abs(latitude) <= 90))
      return "Invalid latitude!";

  return null;
}

function validateLongitude(longitude) {
   if (!(isFinite(longitude) && Math.abs(longitude) <= 180))
      return "Invalid longitude!";

  return null;
}

function validateUrl(url) {
  const patt = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if (!patt.test(url)) return "Invalid URL!";

  return null;
}

function validateArray(arr) {
  if (!Array.isArray(arr)) return "Invalid data type!"

  return null;
}

function validateType(value, type) {
  if (!value || !type) return null;

  if (type === "email") return validateEmail(value);
  if (type === "latitude") return validateLatitude(value);
  if (type === "longitude") return validateLongitude(value);
  if (type === "url") return validateUrl(value);
  if (type === "array") return validateArray(value);

  if (typeof value !== type) return "Invalid data type!";

  return null;
}

function validateTypes(value, types=[]) {
  if (!value) return null;
  if (!types.includes(value)) return "Invalid data type!";

  return null;
}

function validateLength(value, length) {
  const charLength = String(value).length;

  if (typeof length === "number" && charLength !== length) return `Invalid character size!`;

  if (typeof length === "object") {
    if (length.min && charLength < length.min) return "Invalid character size! (min)";
    if (length.max && charLength < length.max) return "Invalid character size! (max)";
  }

  return null;
}

function validateMinMax(value, min, max) {
  if (typeof value !== "number") return null;
  if (min && !max && value < min) return `Should be greater than ${min}!`;
  if (!min && max && value > max) return `Should be less than ${max}!`;
  if (min && max && (value > max || value < min) ) return `Should be between ${min} and ${max}!`;

  return null;
}

function validateWithCustomMethod(value, values, validate) {
  if (!validate || typeof validate !== "function") return null;

  if (!validate(value, values)) return "Invalid";

  return null;
}

class Validator {
  constructor(schema) {
    this.schema = schema;
  }

  validate(values={}) {
    const schema = this.schema;
    const errors = {};

    const fields = Object.keys(schema);
    fields.forEach(function(field) {
      const errorMessages = [];

      const attr = schema[field];
      const value = sanitize(values[field]);

      if (value && attr.type && typeof attr.type === "string") errorMessages.push(validateType(value, attr.type));
      if (value && attr.type && typeof attr.type === "object" && Array.isArray(attr.type)) errorMessages.push(validateTypes(value, attr.type));
      if (value && attr.length) errorMessages.push(validateLength(value, attr.length));
      if (value && (attr.min || attr.max) ) errorMessages.push(validateMinMax(value, attr.min, attr.max));
      if (value && attr.validate) errorMessages.push(validateWithCustomMethod(value, values, attr.validate));

      if (attr.required && !value) errorMessages.push(`${attr.name} is required!`);

      errorMessages.drop(null);
      if (errorMessages && errorMessages.length > 0) {
        errors[field] = errorMessages;
      }

    });

    return errors;    
  }

  run(values) {
    return this.validate(values);
  }

  isValid(values) {
    const errors = this.validate(values);
    return errors.isEmpty();
  }
}

module.exports = Validator;
