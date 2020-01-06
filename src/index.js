// String constants
const Consts = {
  invalidEmail: "Invalid email address",
  invalidLatitude: "Invalid latitude!",
  invalidLongitude: "Invalid longitude!",
  invalidUrl: "Invalid URL!",
  invalidDataType: "Invalid data type!",
  invaildCharSize: "Invalid character size!",
  invaild: "Invalid"
}

// jsPrototype
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

// Utils.
function sanitize(value=null) {
  if (!value) return null;
  if (typeof value !== "string") return value;

  return value.trim();
}

function validateEmail(email) {
  const patt = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!patt.test(email)) return Consts.invalidEmail;

  return null;
}

function validateLatitude(latitude) {
  if (!(isFinite(latitude) && Math.abs(latitude) <= 90))
      return Consts.invalidLatitude;

  return null;
}

function validateLongitude(longitude) {
   if (!(isFinite(longitude) && Math.abs(longitude) <= 180))
      return Consts.invalidLongitude;

  return null;
}

function validateUrl(url) {
  const patt = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if (!patt.test(url)) return Consts.invalidUrl;

  return null;
}

function validateArray(arr) {
  if (!Array.isArray(arr)) return Consts.invalidDataType;

  return null;
}

function validateType(value, type) {
  if (!value || !type) return null;

  if (type === "email") return validateEmail(value);
  if (type === "latitude") return validateLatitude(value);
  if (type === "longitude") return validateLongitude(value);
  if (type === "url") return validateUrl(value);
  if (type === "array") return validateArray(value);

  if (typeof value !== type) return Consts.invalidDataType;

  return null;
}

function validateTypes(value, types=[]) {
  if (!value) return null;
  if (!types.includes(value)) return Consts.invalidDataType;

  return null;
}

function validateLength(value, length) {
  const charLength = String(value).length;

  if (typeof length === "number" && charLength !== length) return Consts.invaildCharSize;

  if (typeof length === "object") {
    if (length.min && charLength < length.min) return Consts.invaildCharSize + " (min)";
    if (length.max && charLength < length.max) return Consts.invaildCharSize + " (max)";
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

  if (!validate(value, values)) return Consts.invaild;

  return null;
}

// Validator

class Validator {
  constructor(schema) {
    this.schema = schema;
    this.errors = null;
  }

  validate(values={}) {
    const schema = this.schema;
    this.errors = {};

    const fields = Object.keys(schema);
    fields.forEach((field) => {
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
        this.errors[field] = errorMessages;
      }

    });

    return this.errors;
  }

  run(values, list=false) {
    const errors = this.validate(values)
    return list ? Object.values(errors) : errors;
  }

  isValid(values) {
    const errors = this.validate(values);
    return errors.isEmpty();
  }

  getErrors() {
    return this.errors;
  }
}

module.exports = Validator;
