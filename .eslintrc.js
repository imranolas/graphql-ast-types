module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  extends: ["formidable/configurations/es6-node"],
  plugins: ["prettier"],
  // globals: {
  //   Promise: true
  // },
  env: {
    node: true
    //   jest: true
  },
  rules: {
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        argsIgnorePattern: "^_"
      }
    ],
    "no-magic-numbers": "off",
    "no-invalid-this": "off",
    "no-unused-expressions": "off",
    quotes: ["error", "single", { avoidEscape: true }],
    indent: [
      "error",
      2,
      {
        SwitchCase: 1
      }
    ],
    "new-cap": "off",
    "func-style": "off",
    "generator-star-spacing": "off",
    "max-len": "off",
    "comma-dangle": ["error", "never"],
    "arrow-parens": ["error", "as-needed"],
    eqeqeq: ["error", "smart"],

    //   'filenames/match-regex': 'off',
    //   'filenames/match-exported': 'off',
    //   'filenames/no-index': 'off',
    //   'flowtype/require-valid-file-annotation': [2, 'always'],

    "prettier/prettier": [
      "error",
      {
        singleQuote: true,
        printWidth: 100
      }
    ]
  }
};
