module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: ['formidable/configurations/es6-node'],
  plugins: ['prettier'],
  env: {
    node: true
  },
  rules: {
    'max-statements': 0,
    'max-params': 0,
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_'
      }
    ],
    'no-magic-numbers': 'off',
    'no-invalid-this': 'off',
    'no-unused-expressions': 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1
      }
    ],
    'new-cap': 'off',
    'func-style': 'off',
    'generator-star-spacing': 'off',
    'max-len': 'off',
    'comma-dangle': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    eqeqeq: ['error', 'smart'],

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 100
      }
    ]
  }
};
