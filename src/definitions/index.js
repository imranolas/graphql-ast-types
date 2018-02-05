// @flow
const t = require("../index");

type Validator = {
  validate: Function,
  optional?: boolean
};

export const BUILDER_KEYS: { [type: string]: Array<string> } = {};
export const NODE_FIELDS: {
  [type: string]: { [fieldKey: string]: Validator }
} = {};
export const ALIAS_KEYS: { [type: string]: Array<string> } = {};

type Option = {
  fields?: { [fieldKey: string]: Validator },
  aliases?: Array<string>,
  builder?: Array<string> // Node properties to be transformed into params
};

/**
 * Used to define an AST node.
 * @param {String} type The AST node name
 * @param {Object} opts Type definition object
 * @returns {void}
 */
export default function defineType(
  type: string,
  { fields = {}, aliases = [], builder = [] }: Option = {}
) {
  for (const key in fields) {
    const field = fields[key];

    // Sets field as optional if builder exist but validator does not.
    if (builder.indexOf(key) === -1) {
      field.optional = true;
    }
  }

  BUILDER_KEYS[type] = builder;
  NODE_FIELDS[type] = fields;
  ALIAS_KEYS[type] = aliases;
}

function getType(val) {
  if (Array.isArray(val)) {
    return "array";
  } else if (val === null) {
    return "null";
  } else if (val === undefined) {
    return "undefined";
  } else {
    return typeof val;
  }
}

// Validation helpers

export function chain(...fns: Array<Function>): Function {
  return function validate(...args) {
    fns.forEach(fn => fn(...args));
  };
}

export function assertEach(callback: Function): Function {
  function validator(node, key, val) {
    if (!Array.isArray(val)) {
      return;
    }

    val.forEach((it, i) => callback(node, `${key}[${i}]`, it));
  }
  return validator;
}

export function assertOneOf(...vals: Array<string>): Function {
  function validate(node, key, val) {
    if (vals.indexOf(val.kind) < 0) {
      throw new TypeError(
        `Property ${key} expected value to be one of ${JSON.stringify(
          vals
        )} but got ${JSON.stringify(val)}`
      );
    }
  }

  return validate;
}

export function assertNodeType(...types: Array<string>): Function {
  function validate(node, key, val) {
    const valid = types.every(type => t.is(type, val));

    if (!valid) {
      throw new TypeError(
        `Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(
          types
        )} ` + `but instead got ${JSON.stringify(val && val.type)}`
      );
    }
  }

  return validate;
}

export function assertNodeOrValueType(...types: Array<string>): Function {
  function validate(node, key, val) {
    const valid = types.every(type => getType(val) === type || t.is(type, val));

    if (!valid) {
      throw new TypeError(
        `Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(
          types
        )} ` + `but instead got ${JSON.stringify(val && val.type)}`
      );
    }
  }

  return validate;
}

export function assertValueType(type: string): Function {
  function validate(node, key, val) {
    const valid = getType(val) === type;

    if (!valid) {
      throw new TypeError(
        `Property ${key} expected type of ${type} but got ${getType(val)}`
      );
    }
  }

  return validate;
}

export function assertArrayOf(cb: Function): Function {
  return chain(assertValueType("array"), assertEach(cb));
}
