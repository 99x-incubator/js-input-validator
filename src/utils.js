
// Utils.

export function sanitize(value=null) {
  if (!value) return null;
  if (typeof value !== "string") return value;

  return value.trim();
}

export function validateEmail(email) {
  const patt = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!patt.test(email)) return "Invalid email address";

  return null;
}

export function validateLatitude(latitude) {
  if (!(isFinite(latitude) && Math.abs(latitude) <= 90))
      return "Invalid latitude!";

  return null;
}

export function validateLongitude(longitude) {
   if (!(isFinite(longitude) && Math.abs(longitude) <= 180))
      return "Invalid longitude!";

  return null;
}

export function validateUrl(url) {
  const patt = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  if (!patt.test(url)) return "Invalid URL!";

  return null;
}

export function validateArray(arr) {
  if (!Array.isArray(arr)) return "Invalid data type!"

  return null;
}

export function validateType(value, type) {
  if (!value || !type) return null;

  if (type === "email") return validateEmail(value);
  if (type === "latitude") return validateLatitude(value);
  if (type === "longitude") return validateLongitude(value);
  if (type === "url") return validateUrl(value);
  if (type === "array") return validateArray(value);

  if (typeof value !== type) return "Invalid data type!";

  return null;
}

export function validateTypes(value, types=[]) {
  if (!value) return null;
  if (!types.includes(value)) return "Invalid data type!";

  return null;
}

export function validateLength(value, length) {
  const charLength = String(value).length;

  if (typeof length === "number" && charLength !== length) return `Invalid character size!`;

  if (typeof length === "object") {
    if (length.min && charLength < length.min) return "Invalid character size! (min)";
    if (length.max && charLength < length.max) return "Invalid character size! (max)";
  }

  return null;
}

export function validateMinMax(value, min, max) {
  if (typeof value !== "number") return null;
  if (min && !max && value < min) return `Should be greater than ${min}!`;
  if (!min && max && value > max) return `Should be less than ${max}!`;
  if (min && max && (value > max || value < min) ) return `Should be between ${min} and ${max}!`;

  return null;
}

export function validateWithCustomMethod(value, values, validate) {
  if (!validate || typeof validate !== "function") return null;

  if (!validate(value, values)) return "Invalid";

  return null;
}
