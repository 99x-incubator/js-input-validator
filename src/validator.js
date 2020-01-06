var Utils = require('./utils');

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

// Validator

class Validator {
  constructor(schema) {
    this.schema = schema;
    this.errors = null;
  }

  validate(values = {}) {
    const schema = this.schema;
    this.errors = {};

    const fields = Object.keys(schema);
    fields.forEach((field) => {
      const errorMessages = [];

      const attr = schema[field];
      const value = Utils.sanitize(values[field]);

      if (value && attr.type && typeof attr.type === "string") errorMessages.push(Utils.validateType(value, attr.type));
      if (value && attr.type && typeof attr.type === "object" && Array.isArray(attr.type)) errorMessages.push(Utils.validateTypes(value, attr.type));
      if (value && attr.length) errorMessages.push(Utils.validateLength(value, attr.length));
      if (value && (attr.min || attr.max)) errorMessages.push(Utils.validateMinMax(value, attr.min, attr.max));
      if (value && attr.validate) errorMessages.push(Utils.validateWithCustomMethod(value, values, attr.validate));

      if (attr.required && !value) errorMessages.push(`${attr.name} is required!`);

      errorMessages.drop(null);
      if (errorMessages && errorMessages.length > 0) {
        this.errors[field] = errorMessages;
      }

    });

    return this.errors;
  }

  run(values, list = false) {
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
