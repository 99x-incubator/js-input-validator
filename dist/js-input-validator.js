(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("js-input-validator", [], factory);
	else if(typeof exports === 'object')
		exports["js-input-validator"] = factory();
	else
		root["js-input-validator"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Validator = __webpack_require__(/*! ./validator */ "./src/validator.js");

module.exports = Validator;

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: sanitize, validateEmail, validateLatitude, validateLongitude, validateUrl, validateArray, validateType, validateTypes, validateLength, validateMinMax, validateWithCustomMethod */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sanitize", function() { return sanitize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEmail", function() { return validateEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateLatitude", function() { return validateLatitude; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateLongitude", function() { return validateLongitude; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateUrl", function() { return validateUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateArray", function() { return validateArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateType", function() { return validateType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateTypes", function() { return validateTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateLength", function() { return validateLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateMinMax", function() { return validateMinMax; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateWithCustomMethod", function() { return validateWithCustomMethod; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Utils.
function sanitize() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (!value) return null;
  if (typeof value !== "string") return value;
  return value.trim();
}
function validateEmail(email) {
  var patt = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if (!patt.test(email)) return "Invalid email address";
  return null;
}
function validateLatitude(latitude) {
  if (!(isFinite(latitude) && Math.abs(latitude) <= 90)) return "Invalid latitude!";
  return null;
}
function validateLongitude(longitude) {
  if (!(isFinite(longitude) && Math.abs(longitude) <= 180)) return "Invalid longitude!";
  return null;
}
function validateUrl(url) {
  var patt = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if (!patt.test(url)) return "Invalid URL!";
  return null;
}
function validateArray(arr) {
  if (!Array.isArray(arr)) return "Invalid data type!";
  return null;
}
function validateType(value, type) {
  if (!value || !type) return null;
  if (type === "email") return validateEmail(value);
  if (type === "latitude") return validateLatitude(value);
  if (type === "longitude") return validateLongitude(value);
  if (type === "url") return validateUrl(value);
  if (type === "array") return validateArray(value);
  if (_typeof(value) !== type) return "Invalid data type!";
  return null;
}
function validateTypes(value) {
  var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (!value) return null;
  if (!types.includes(value)) return "Invalid data type!";
  return null;
}
function validateLength(value, length) {
  var charLength = String(value).length;
  if (typeof length === "number" && charLength !== length) return "Invalid character size!";

  if (_typeof(length) === "object") {
    if (length.min && charLength < length.min) return "Invalid character size! (min)";
    if (length.max && charLength < length.max) return "Invalid character size! (max)";
  }

  return null;
}
function validateMinMax(value, min, max) {
  if (typeof value !== "number") return null;
  if (min && !max && value < min) return "Should be greater than ".concat(min, "!");
  if (!min && max && value > max) return "Should be less than ".concat(max, "!");
  if (min && max && (value > max || value < min)) return "Should be between ".concat(min, " and ").concat(max, "!");
  return null;
}
function validateWithCustomMethod(value, values, validate) {
  if (!validate || typeof validate !== "function") return null;
  if (!validate(value, values)) return "Invalid";
  return null;
}

/***/ }),

/***/ "./src/validator.js":
/*!**************************!*\
  !*** ./src/validator.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Utils = __webpack_require__(/*! ./utils */ "./src/utils.js"); // jsPrototype


Array.prototype.drop = function (deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }

  return this;
};

Object.prototype.isEmpty = function () {
  var obj = this;
  return Object.keys(obj).length === 0;
}; // Validator


var Validator =
/*#__PURE__*/
function () {
  function Validator(schema) {
    _classCallCheck(this, Validator);

    this.schema = schema;
    this.errors = null;
  }

  _createClass(Validator, [{
    key: "validate",
    value: function validate() {
      var _this = this;

      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var schema = this.schema;
      this.errors = {};
      var fields = Object.keys(schema);
      fields.forEach(function (field) {
        var errorMessages = [];
        var attr = schema[field];
        var value = Utils.sanitize(values[field]);
        if (value && attr.type && typeof attr.type === "string") errorMessages.push(Utils.validateType(value, attr.type));
        if (value && attr.type && _typeof(attr.type) === "object" && Array.isArray(attr.type)) errorMessages.push(Utils.validateTypes(value, attr.type));
        if (value && attr.length) errorMessages.push(Utils.validateLength(value, attr.length));
        if (value && (attr.min || attr.max)) errorMessages.push(Utils.validateMinMax(value, attr.min, attr.max));
        if (value && attr.validate) errorMessages.push(Utils.validateWithCustomMethod(value, values, attr.validate));
        if (attr.required && !value) errorMessages.push("".concat(attr.name, " is required!"));
        errorMessages.drop(null);

        if (errorMessages && errorMessages.length > 0) {
          _this.errors[field] = errorMessages;
        }
      });
      return this.errors;
    }
  }, {
    key: "run",
    value: function run(values) {
      var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var errors = this.validate(values);
      return list ? Object.values(errors) : errors;
    }
  }, {
    key: "isValid",
    value: function isValid(values) {
      var errors = this.validate(values);
      return errors.isEmpty();
    }
  }, {
    key: "getErrors",
    value: function getErrors() {
      return this.errors;
    }
  }]);

  return Validator;
}();

module.exports = Validator;

/***/ })

/******/ });
});
//# sourceMappingURL=js-input-validator.js.map