const Validator = require("../src/");

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

const errors = new Validator(schema).run({
  field1: "s",
  field3: 4,
  field4: "sasadsa@adsa"
});

console.log(errors);