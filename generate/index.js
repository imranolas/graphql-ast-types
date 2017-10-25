const { resolve } = require('path');
const { writeFileSync, readFileSync } = require('fs');

const { parse } = require('flow-parser');
const generateDefinitionFile = require('./definitions');
const generateFlowTypesFile = require('./flowtypes');
const generateDocFile = require('./docs');

// Generate Flow AST
const loadAST = () => {
  const astFilePath = resolve(__dirname, '../node_modules/graphql/language/ast.js.flow');
  const astFile = readFileSync(astFilePath).toString();
  const ast = parse(astFile);

  return ast;
};

const definitionOutputPath = resolve(__dirname, '../src/definitions/graphql.js');
writeFileSync(definitionOutputPath, generateDefinitionFile(loadAST()));

const flowtypeOutputPath = resolve(__dirname, '../src/index.js.flow');
writeFileSync(flowtypeOutputPath, generateFlowTypesFile(loadAST()));

const docFileOutputPath = resolve(__dirname, '../api.md');
writeFileSync(docFileOutputPath, generateDocFile(loadAST()));

console.log('Save & Done.');
