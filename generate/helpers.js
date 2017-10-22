const { default: traverse } = require('babel-traverse');

// Node constants
const blacklistedNodes = ['OperationTypeNode'];
const blacklistedProps = ['kind', 'loc'];

const isPropBlacklisted = prop => blacklistedProps.includes(prop);
const isNodeBlacklisted = nodeType => blacklistedNodes.includes(nodeType);

const nodeNameRe = /^(\w+)Node$/;
const isNodeName = name => nodeNameRe.test(name);

// Identifies node definitions of the shape `type XNode = { ... }`
const isNodeTypeAlias = node =>
  typeof node.id === 'object' &&
  node.id.type === 'Identifier' &&
  typeof node.right === 'object' &&
  node.right.type === 'ObjectTypeAnnotation' &&
  isNodeName(node.id.name);

// Identifies node definitions of the shape `type VirtualNode = XNode | YNode ...`
const isUnionTypeAlias = node =>
  typeof node.id === 'object' &&
  node.id.type === 'Identifier' &&
  typeof node.right === 'object' &&
  node.right.type === 'UnionTypeAnnotation' &&
  !blacklistedNodes.includes(node.id.name) &&
  isNodeName(node.id.name);

// Collects all *node* types and *unions* of node types
function collectNodes(ast) {
  const unions = {};
  const nodes = {};

  const addUnion = (unionName, unionNode) => {
    const nodeNames = unionNode.types.map(type => type.id.name);

    for (const nodeName of nodeNames) {
      if (unions[nodeName] === undefined) {
        unions[nodeName] = new Set();
      }

      const union = unions[nodeName];
      union.add(unionName);
    }
  };

  const addNode = (nodeName, objectType) => {
    nodes[nodeName] = objectType;
  };

  traverse(ast, {
    TypeAlias({ node }) {
      if (isNodeTypeAlias(node)) {
        addNode(node.id.name, node.right);
      } else if (isUnionTypeAlias(node)) {
        addUnion(node.id.name, node.right);
      }
    }
  });

  return { unions, nodes };
}

// Remove "Node" suffix from node
const getNodeNameWithoutSuffix = nodeName => nodeName.match(nodeNameRe)[1];

module.exports = {
  collectNodes,
  isNodeName,
  isNodeTypeAlias,
  isUnionTypeAlias,
  getNodeNameWithoutSuffix,
  isPropBlacklisted,
  isNodeBlacklisted,
  blacklistedNodes
};
