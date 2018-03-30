Array.prototype.drop = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

function sanitize(value=null) {
  if (!value) return null;
  if (typeof value !== "string") return value;

  return value.trim();
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

class Validator {

  constructor(schema) {
    this.schema = schema;
  }

  run(values) {
    const schema = this.schema;
    const errors = {};

    const fields = Object.keys(schema);
    fields.forEach(function(field) {
      const errorMessages = [];

      const attr = schema[field];
      const value = sanitize(values[field]);

      if (value && attr.type && attr.type !== typeof value) errorMessages.push("Invalid data type!");
      if (value && attr.length) errorMessages.push(validateLength(value, attr.length));
      if (value && (attr.min || attr.max) ) errorMessages.push(validateMinMax(value, attr.min, attr.max));

      if (attr.required && !value) errorMessages.push(`${attr.name} is required!`);

      errorMessages.drop(null);
      if (errorMessages && errorMessages.length > 0) {
        errors[field] = errorMessages;
      }

    });

    return errors;
  }
}

module.exports = Validator;
