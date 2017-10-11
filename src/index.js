// @flow

import loClone from 'lodash/clone';
import './definitions/graphql';

import { ALIAS_KEYS, NODE_FIELDS, BUILDER_KEYS } from './definitions';

const t = exports; // Maps all exports to t

/**
 * Registers `is[Type]` and `assert[Type]` generated functions for a given `type`.
 * Pass `skipAliasCheck` to force it to directly compare `node.type` with `type`.
 */

function registerType(type: string) {
  let is = t[`is${type}`];
  if (!is) {
    is = t[`is${type}`] = function is(node, opts) {
      return t.is(type, node, opts);
    };
  }

  t[`assert${type}`] = function assert(node, opts) {
    opts = opts || {};
    if (!is(node, opts)) {
      throw new Error(`Expected type ${JSON.stringify(type)} with option ${JSON.stringify(opts)}`);
    }
  };
}

export { ALIAS_KEYS, NODE_FIELDS, BUILDER_KEYS };

/**
 * Registers `is[Type]` and `assert[Type]` for all types.
 */

for (const type in t.VISITOR_KEYS) {
  registerType(type);
}

/**
 * Flip `ALIAS_KEYS` for faster access in the reverse direction.
 */

t.FLIPPED_ALIAS_KEYS = {};

Object.keys(t.ALIAS_KEYS).forEach(type => {
  t.ALIAS_KEYS[type].forEach(alias => {
    t.FLIPPED_ALIAS_KEYS[alias] = (t.FLIPPED_ALIAS_KEYS[alias] || []).concat([type]);
  });
});

/**
 * Registers `is[Alias]` and `assert[Alias]` functions for all aliases.
 */

Object.keys(t.FLIPPED_ALIAS_KEYS).forEach(type => {
  t[`${type.toUpperCase()}_TYPES`] = t.FLIPPED_ALIAS_KEYS[type];
  registerType(type);
});

export const TYPES = Object.keys(t.FLIPPED_ALIAS_KEYS);

/**
 * Returns whether `node` is of given `type`.
 *
 * For better performance, use this instead of `is[Type]` when `type` is unknown.
 * Optionally, pass `skipAliasCheck` to directly compare `node.type` with `type`.
 */

export function is(type: string, node: Object, opts?: Object): boolean {
  if (!node) {
    return false;
  }

  const matches = isType(node.type, type);
  if (!matches) {
    return false;
  }

  if (typeof opts === 'undefined') {
    return true;
  } else {
    return t.shallowEqual(node, opts);
  }
}

/**
 * Test if a `nodeType` is a `targetType` or if `targetType` is an alias of `nodeType`.
 */

export function isType(nodeType: string, targetType: string): boolean {
  if (nodeType === targetType) {
    return true;
  }

  // This is a fast-path. If the test above failed, but an alias key is found, then the
  // targetType was a primary node type, so there's no need to check the aliases.
  if (t.ALIAS_KEYS[targetType]) {
    return false;
  }

  const aliases: ?Array<string> = t.FLIPPED_ALIAS_KEYS[targetType];
  if (aliases) {
    if (aliases[0] === nodeType) {
      return true;
    }

    for (const alias of aliases) {
      if (nodeType === alias) {
        return true;
      }
    }
  }

  return false;
}

/**
 * For each call of #defineType, the following expression evalutates and generates
 * a builder function that validates incoming arguments and returns a valid AST node.
 */

Object.keys(t.BUILDER_KEYS).forEach(type => {
  const keys = t.BUILDER_KEYS[type];

  function builder(...args) {
    if (args.length > keys.length) {
      throw new Error(
        `t.${type}: Too many arguments passed. Received ${args.length} but can receive ` +
          `no more than ${keys.length}`
      );
    }

    const node = keys.reduce(
      (node, key, i) => {
        let arg = args[i] || t.NODE_FIELDS[type][key].default;
        return Object.assign({ [key]: arg }, node);
      },
      { kind: type }
    );

    for (const key in node) {
      validate(node, key, node[key]);
    }

    return node;
  }

  t[type] = builder;
  t[type[0].toLowerCase() + type.slice(1)] = builder;
});

/**
 * Executes the field validators for a given node
 */

export function validate(node?: Object, key: string, val: any) {
  if (!node) {
    return;
  }

  const fields = t.NODE_FIELDS[node.type];
  if (!fields) {
    return;
  }

  const field = fields[key];
  if (!field || !field.validate) {
    return;
  }
  if (field.optional && val == null) {
    return;
  }

  field.validate(node, key, val);
}

/**
 * Test if an object is shallowly equal.
 */

export function shallowEqual(actual: Object, expected: Object): boolean {
  const keys = Object.keys(expected);

  for (const key of keys) {
    if (actual[key] !== expected[key]) {
      return false;
    }
  }

  return true;
}
