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
};

function sanitize(value = null) {
  if (!value) return null;
  if (typeof value !== "string") return value;

  return value.trim();
}

function validateEmail(email, errMessage) {
  const errMessage = errMessage || "Invalid email address";
  const patt = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!patt.test(email)) return errMessage;

  return null;
}

function validateLatitude(latitude, errMessage) {
  const errMessage = errMessage || "Invalid latitude!";
  if (!(isFinite(latitude) && Math.abs(latitude) <= 90)) return errMessage;

  return null;
}

function validateLongitude(longitude, errMessage) {
  const errMessage = errMessage || "Invalid longitude!";
  if (!(isFinite(longitude) && Math.abs(longitude) <= 180)) return errMessage;

  return null;
}

function validateUrl(url, errMessage) {
  const errMessage = errMessage || "Invalid URL!";
  const patt = new RegExp(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (!patt.test(url)) return errMessage;

  return null;
}

function validateArray(arr, errMessage) {
  const errMessage = errMessage || "Invalid data type!";
  if (!Array.isArray(arr)) return errMessage;

  return null;
}

function validateType(value, type, errMessage) {
  if (!value || !type) return null;

  if (type === "email") return validateEmail(value, errMessage);
  if (type === "latitude") return validateLatitude(value, errMessage);
  if (type === "longitude") return validateLongitude(value, errMessage);
  if (type === "url") return validateUrl(value, errMessage);
  if (type === "array") return validateArray(value, errMessage);

  const errMessage = errMessage || "Invalid data type!";

  if (typeof value !== type) return errMessage;

  return null;
}

function validateTypes(value, types = [], errMessage) {
  if (!value) return null;
  if (!types.includes(value)) return errMessage || "Invalid data type!";

  return null;
}

function validateLength(value, length, errMessage) {
  const charLength = String(value).length;

  if (typeof length === "number" && charLength !== length)
    return errMessage || `Invalid character size!`;

  if (typeof length === "object") {
    if (length.min && charLength < length.min)
      return (
        parseErrorMessage(errMessage, "$n", length.min) ||
        "Invalid character size! (min)"
      );

    if (length.max && charLength < length.max)
      return (
        parseErrorMessage(errMessage, "$n", length.max) ||
        "Invalid character size! (max)"
      );
  }

  return null;
}

function validateMinMax(value, min, max, errMessage) {
  if (typeof value !== "number") return null;
  if (min && !max && value < min)
    return (
      parseErrorMessage(errMessage, "$n", min) ||
      `Should be greater than ${min}!`
    );
  if (!min && max && value > max)
    return (
      parseErrorMessage(errMessage, "$n", max) || `Should be less than ${max}!`
    );
  if (min && max && (value > max || value < min)) {
    const error = parseErrorMessage(errMessage, "$n1", min);
    const parsedErr = parseErrorMessage(error, "$n2", max);
    return parsedErr || `Should be between ${min} and ${max}!`;
  }

  return null;
}

function validateWithCustomMethod(value, values, validate, errMessage) {
  if (!validate || typeof validate !== "function") return null;

  if (!validate(value, values)) return errMessage || "Invalid";

  return null;
}

function parseErrorMessage(str, key, val) {
  return str.replace(key, val);

  return null;
}

class Validator {
  constructor(schema) {
    this.schema = schema;
    this.errors = null;
  }

  validate(values = {}) {
    const schema = this.schema;
    this.errors = {};

    const fields = Object.keys(schema);
    fields.forEach(function(field) {
      const errorMessages = [];

      const attr = schema[field];
      const value = sanitize(values[field]);

      if (value && attr.type && typeof attr.type === "string")
        errorMessages.push(validateType(value, attr.type, attr.errors.type));
      if (
        value &&
        attr.type &&
        typeof attr.type === "object" &&
        Array.isArray(attr.type)
      )
        errorMessages.push(validateTypes(value, attr.type, attr.errors.type));
      if (value && attr.length)
        errorMessages.push(
          validateLength(value, attr.length, attr.errors.length)
        );
      if (value && (attr.min || attr.max))
        errorMessages.push(
          validateMinMax(value, attr.min, attr.max, attr.errors.minMax)
        );
      if (value && attr.validate)
        errorMessages.push(
          validateWithCustomMethod(
            value,
            values,
            attr.validate,
            attr.errors.validate
          )
        );

      if (attr.required && !value)
        errorMessages.push(parseErrorMessage(attr.errors.required));

      errorMessages.drop(null);
      if (errorMessages && errorMessages.length > 0) {
        this.errors[field] = errorMessages;
      }
    });

    return this.errors;
  }

  run(values, list = false) {
    const errors = this.validate(values);
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
