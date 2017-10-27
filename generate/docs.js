const t = require('babel-types');

const astSource = 'https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js';

const { collectNodes, getNodeNameWithoutSuffix, isPropBlacklisted } = require('./helpers');

const getValueType = node => {
  if (t.isGenericTypeAnnotation(node)) {
    return node.id.name;
  }

  return node.type;
};

const makeDocstrings = (nodeName, node) => {
  const nodeNameShort = getNodeNameWithoutSuffix(nodeName);
  const fnName = nodeNameShort.charAt(0).toLowerCase() + nodeNameShort.slice(1);

  const args = node.properties.filter(({ key }) => !isPropBlacklisted(key.name)).sort((a, b) => {
    if (a.optional === b.optional) {
      return 0;
    }
    if (a.optional) {
      return 1;
    }
    return -1;
  });

  const argString = args
    .map(({ key, value, optional }) => {
      const opt = optional ? '?' : '';
      return `${key.name}: ${opt}${getValueType(value)}`;
    })
    .join(', ');

  return [
    `### ${nodeNameShort}`,
    `t.${fnName}(${argString}): [${nodeName}](${astSource}#L${node.loc.start.line})`,
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
