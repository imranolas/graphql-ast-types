const t = require('babel-types');
const { default: generate } = require('babel-generator');
const template = require('babel-template');

const {
  collectNodes,
  getNodeNameWithoutSuffix,
  isPropBlacklisted,
  isNodeBlacklisted,
  isNodeName
} = require('./helpers');

const makeModuleNode = statements =>
  t.declareModule(t.stringLiteral('babel-ast-types'), t.blockStatement(statements));

const makeTypedIdentifier = (nodeName, annotation) => {
  const name = getNodeNameWithoutSuffix(nodeName);
  return Object.assign(t.identifier(name), {
    typeAnnotation: t.typeAnnotation(t.functionTypeAnnotation(null, null, null, annotation))
  });
};

const makeDeclaration = (nodeName, node) => [
  t.declareExportDeclaration(
    t.declareFunction(
      makeTypedIdentifier(nodeName, t.genericTypeAnnotation(t.identifier(nodeName)))
    )
  ),
  t.declareExportDeclaration(
    t.declareFunction(makeTypedIdentifier(`is${nodeName}`, t.booleanTypeAnnotation()))
  )
];

const buildBabelTemplates = ast => {
  const { nodes, unions } = collectNodes(ast);
  const nodeStatements = Object.keys(nodes)
    .map(nodeName => makeDeclaration(nodeName, nodes[nodeName]))
    .reduce((a = [], ts) => a.concat(ts));
  return makeModuleNode(nodeStatements);
};

const generateDefinitionContent = ast => {
  const definitionCalls = buildBabelTemplates(ast);
  return generate(definitionCalls).code;
};

module.exports = function generateDefinitionFile(ast) {
  return generateDefinitionContent(ast);
};
