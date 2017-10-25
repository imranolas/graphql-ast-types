const t = require('babel-types');

const astSource = 'https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js';

const {
  collectNodes,
  getNodeNameWithoutSuffix,
  isPropBlacklisted,
  blacklistedNodes
} = require('./helpers');

const makeDocstrings = (nodeName, node) => {
  const nodeNameShort = getNodeNameWithoutSuffix(nodeName);
  const fnName = nodeNameShort.charAt(0).toLowerCase() + nodeNameShort.slice(1);
  return [
    `### ${nodeNameShort}`,
    `t.${fnName}(): [${nodeName}](${astSource}#L${node.loc.start.line})`,
    `t.is${nodeNameShort}(node: any): boolean`,
    `t.assert${nodeNameShort}(node: any): void`
  ];
};

const makeAliasString = nodeName => {
  const nodeNameShort = getNodeNameWithoutSuffix(nodeName);

  return [
    `### ${nodeNameShort}`,
    `t.is${nodeNameShort}(node: any): boolean`,
    `t.assert${nodeNameShort}(node: any): boolean`
  ];
};

const buildBabelTemplates = ast => {
  const { nodes, unions } = collectNodes(ast);

  const aliasNames = Object.keys(unions).reduce((s, k) => new Set([...s, ...unions[k]]), new Set());

  const docstrings = Object.keys(nodes).map(nodeName => makeDocstrings(nodeName, nodes[nodeName]));
  const aliasStrings = Array.from(aliasNames).map(aliasName => makeAliasString(aliasName));

  const docString = docstrings.map(docs => docs.join('\n\n'));
  const aliasString = aliasStrings.map(docs => docs.join('\n\n'));

  return ['## Aliases', ...aliasString, '## Builders', ...docString];
};

const generateDefinitionContent = ast => {
  const definitionCalls = buildBabelTemplates(ast);
  return definitionCalls.join('\n\n');
};

module.exports = function generateDefinitionFile(ast) {
  return `
# API

${generateDefinitionContent(ast)}
  `;
};
