const t = require('babel-types');
const { default: generate } = require('babel-generator');

const {
  collectNodes,
  getNodeNameWithoutSuffix,
  isPropBlacklisted,
  blacklistedNodes
} = require('./helpers');

const makeTypedIdentifier = (nodeName, params, returnAnnotation) => {
  const name = getNodeNameWithoutSuffix(nodeName);
  const paramNodes = params.map(({ key, value }) =>
    t.functionTypeParam(t.identifier(key.name), value)
  );
  return Object.assign(t.identifier(name), {
    typeAnnotation: t.typeAnnotation(
      t.functionTypeAnnotation(null, paramNodes, null, returnAnnotation)
    )
  });
};

const makeDeclaration = (nodeName, node) => {
  const args = node.properties.filter(({ key }) => !isPropBlacklisted(key.name)).sort((a, b) => {
    if (a.optional === b.optional) {
      return 0;
    }
    if (a.optional) {
      return 1;
    }
    return -1;
  });

  const anyNode = [{ key: t.identifier('node'), value: t.anyTypeAnnotation() }];
  const fnNodeName = nodeName[0].toLowerCase() + nodeName.slice(1);

  return [
    t.declareExportDeclaration(
      t.declareFunction(
        makeTypedIdentifier(fnNodeName, args, t.genericTypeAnnotation(t.identifier(nodeName)))
      )
    ),
    t.declareExportDeclaration(
      t.declareFunction(makeTypedIdentifier(`is${nodeName}`, anyNode, t.booleanTypeAnnotation()))
    ),
    t.declareExportDeclaration(
      t.declareFunction(
        makeTypedIdentifier(`assert${nodeName}`, anyNode, t.booleanTypeAnnotation())
      )
    )
  ];
};

const makeImportStatement = nodeKeys => {
  return Object.assign(
    t.importDeclaration(
      nodeKeys.map(nodeKey => t.importSpecifier(t.identifier(nodeKey), t.identifier(nodeKey))),
      t.stringLiteral('graphql/language/ast')
    ),
    { importKind: 'type' }
  );
};

const buildBabelTemplates = ast => {
  const { nodes, unions } = collectNodes(ast);
  const nodeStatements = Object.keys(nodes)
    .map(nodeName => makeDeclaration(nodeName, nodes[nodeName]))
    .reduce((a = [], ts) => a.concat(ts));

  const importNodeNames = Object.keys(nodes).concat(blacklistedNodes);
  const importAliasNames = Object.keys(unions).reduce(
    (s, k) => new Set([...s, ...unions[k]]),
    new Set()
  );

  return t.program([
    makeImportStatement([...importNodeNames, ...Array.from(importAliasNames)]),
    ...nodeStatements
  ]);
};

const generateDefinitionContent = ast => {
  const definitionCalls = buildBabelTemplates(ast);
  return generate(definitionCalls).code;
};

module.exports = function generateDefinitionFile(ast) {
  return `
// @flow
// AUTO-GENERATED
${generateDefinitionContent(ast)}

declare export function is(nodeName: string, node: any): boolean;
  `;
};
