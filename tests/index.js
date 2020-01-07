const chai = require('chai');  
const expect = chai.expect;

const Validator = require("../src/");

describe("JS Input Validator", function() {
	describe("Run()", function() {
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

		const values = {
		  field1: "s",
		  field3: 4,
		  field4: "sasadsa@adsa"
		};

		it("should validate input data object against validation schema and return error object", function() {
			const errors = new Validator(schema).run(values);

			const expectedErrors = {
			  field1: [ 'Invalid data type!', 'Invalid character size! (max)' ],
			  field2: [ 'field 2 is required!' ],
			  field4: [ 'Invalid email address' ]
			}

			expect(errors.field1[0]).to.equal(expectedErrors.field1[0]);
			expect(errors.field1[1]).to.equal(expectedErrors.field1[1]);
			expect(errors.field2[0]).to.equal(expectedErrors.field2[0]);
			expect(errors.field4[0]).to.equal(expectedErrors.field4[0]);
		});
	});
});

