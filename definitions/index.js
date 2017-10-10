// @flow

export const BUILDER_KEYS = {};
export const NODE_FIELDS = {};
export const ALIAS_KEYS = {};

type Option = {
  fields?: Object,
  // visitor?: Array<string>,
  aliases?: Array<string>,
  builder?: Array<string>
};

export default function defineType(type: string, opts: Option) {
  opts.fields = opts.fields || {};
  // opts.visitor = opts.visitor || [];
  opts.aliases = opts.aliases || [];
  opts.builder = opts.builder || [];

  // ensure all field keys are represented in `fields`
  // for (const key of opts.visitor.concat(opts.builder)) {
  //   opts.fields[key] = opts.fields[key] || {};
  // }

  for (const key in opts.fields) {
    const field = opts.fields[key];

    if (opts.builder.indexOf(key) === -1) {
      field.optional = true;
    }
    // if (field.default === undefined) {
    //   field.default = null;
    // } else if (!field.validate) {
    //   field.validate = assertValueType(getType(field.default));
    // }
  }

  // VISITOR_KEYS[type] = opts.visitor;
  BUILDER_KEYS[type] = opts.builder;
  NODE_FIELDS[type] = opts.fields;
  ALIAS_KEYS[type] = opts.aliases;
}

// TODO
export const assertValueType = () => {};
export const assertNodeType = () => {};
export const assertEach = () => {};
export const assertOneOf = () => {};
export const chain = () => {};
