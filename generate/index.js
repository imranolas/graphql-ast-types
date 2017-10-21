const { resolve } = require('path');
const { writeFileSync, readFileSync } = require('fs');

const { parse } = require('flow-parser');
const generateDefinitionFile = require('./definitions');

// Generate Flow AST
const loadAST = () => {
  const astFilePath = resolve(__dirname, '../node_modules/graphql/language/ast.js.flow');
  const astFile = readFileSync(astFilePath).toString();
  const ast = parse(astFile);

  return ast;
};

const definitionOutputPath = resolve(__dirname, '../src/definitions/graphql.js');
writeFileSync(definitionOutputPath, generateDefinitionFile(loadAST()));

console.log('Save & Done.');
