// @flow

import './definitions/init';

import { ALIAS_KEYS, NODE_FIELDS, BUILDER_KEYS } from './definitions';

const t = exports; // Maps all exports to t

/**
 * Registers `is[Type]` and `assert[Type]` generated functions for a given `type`.
 * Pass `skipAliasCheck` to force it to directly compare `node.type` with `type`.
 */

function registerType(type: string) {
  const key = `is${type}`;

  const _isType = t[key] !== undefined
    ? t[key]
    : t[key] = (node, opts) => t.is(type, node, opts);

  t[`assert${type}`] = (node, opts = {}) => {
    if (!_isType(node, opts)) {
      throw new Error(`Expected type "${type}" with option ${JSON.stringify(opts)}`);
    }
  };
}

export { ALIAS_KEYS, NODE_FIELDS, BUILDER_KEYS };

/**
 * Registers `is[Type]` and `assert[Type]` for all types.
 */

for (const type in t.NODE_FIELDS) {
  registerType(type);
}

/**
 * Flip `ALIAS_KEYS` for faster access in the reverse direction.
 */

export const TYPES = [];

t.FLIPPED_ALIAS_KEYS = Object.keys(t.ALIAS_KEYS).reduce((acc, type) => {
  const aliasKeys = t.ALIAS_KEYS[type];

  aliasKeys.forEach(alias => {
    if (acc[alias] === undefined) {
      TYPES.push(alias); // Populate `TYPES` with FLIPPED_ALIAS_KEY(S)

      // Registers `is[Alias]` and `assert[Alias]` functions for all aliases.
      t[`${alias.toUpperCase()}_TYPES`] = acc[alias];
      registerType(alias);

      acc[alias] = [];
    }

    acc[alias].push(type);
  });

  return acc;
}, {});

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

for (const type in t.BUILDER_KEYS) {
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
        const arg = args[i] || t.NODE_FIELDS[type][key].default;
        return Object.assign({ [key]: arg }, node);
      },
      { kind: type }
    );

    for (const key in node) {
      validate(node, key, node[key]);
    }

    return node;
  }

  t[type[0].toLowerCase() + type.slice(1)] = builder;
}

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
