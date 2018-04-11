# js-input-validator

[![npm](https://img.shields.io/npm/v/js-input-validator.svg)](https://www.npmjs.com/package/js-input-validator)
[![license](https://img.shields.io/github/license/99xt/js-input-validator.svg)](https://github.com/99xt/js-input-validator/blob/master/LICENSE)

Simple JS Input Validator

## Installation

To install this library, run;

```
npm i -S js-input-validator
```

## Usage

```js
import Validator from "js-input-validator";

// Schema
const schema = {
  field1: {
    name: "field 1",
    type: "number",
    required: true,
    length: {
      min: 1,
      max: 3
    },
    min: 1
  },
  field2: {
    name: "field 2",
    type: ["string", "number"],
    required: true,
    min: 3,
    validate: function(value, values={}) {
      return true;
    }
  },
  field3: {
    name: "field 3",
    type: "number",
    required: false,
    min: 3,
    max: 5
  },
  field4: {
    name: "field 4",
    type: "email"
  }
};

// Values
const errors = new Validator(schema).run({
  field1: "s",
  field3: 4,
  field4: "sasadsa@adsa"
});

// Run Validator with `run` method and get error object
const errors = new Validator(schema).run(values);

// Run Validator with `isValid` method
const data = new Validator(schema);
if (data.isValid()) {
  // Valid
} else {
  // Invalid
}
```

## License

MIT