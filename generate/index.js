const { resolve } = require('path');
const { writeFileSync, readFileSync } = require('fs');

const { parse } = require('flow-parser');
const { default: traverse } = require('babel-traverse');
const { default: generate } = require('babel-generator');
const template = require('babel-template');
const tea = require('babel-types'); // The only right way to name this

// Generate Flow AST
const loadAST = () => {
  const astFilePath = resolve(__dirname, '../node_modules/graphql/language/ast.js.flow');
  const astFile = readFileSync(astFilePath).toString();
  const ast = parse(astFile);

  return ast;
};

// Node constants
const blacklistedNodes = ['OperationTypeNode'];
const blacklistedProps = ['kind', 'loc'];
const nodeNameRe = /^(\w+)Node$/;

const isNodeName = name => nodeNameRe.test(name);

// Identifies node definitions of the shape `type XNode = { ... }`
const isNodeTypeAlias = node => (
  typeof node.id === 'object' &&
  node.id.type === 'Identifier' &&
  typeof node.right === 'object' &&
  node.right.type === 'ObjectTypeAnnotation' &&
  isNodeName(node.id.name)
);

// Identifies node definitions of the shape `type VirtualNode = XNode | YNode ...`
const isUnionTypeAlias = node => (
  typeof node.id === 'object' &&
  node.id.type === 'Identifier' &&
  typeof node.right === 'object' &&
  node.right.type === 'UnionTypeAnnotation' &&
  !blacklistedNodes.includes(node.id.name) &&
  isNodeName(node.id.name)
);

// Remove "Node" suffix from node
const getNodeNameWithoutSuffix = nodeName => nodeName.match(nodeNameRe)[1];

// Collects all *node* types and *unions* of node types
const collectNodes = ast => {
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
};

const nodeTypeAssertTemplate = argAST => tea.callExpression(
  tea.identifier('assertNodeType'),
  [argAST]
);

const typeAssertTemplate = argAST => tea.callExpression(
  tea.identifier('assertValueType'),
  [argAST]
);

const valueOfNodeType = valueNode => {
  if (
    valueNode.type !== 'GenericTypeAnnotation' ||
    valueNode.id.type !== 'Identifier' ||
    (!isNodeName(valueNode.id.name) && valueNode.id.name !== 'OperationTypeNode')
  ) {
    return undefined;
  }

  if (valueNode.id.name === 'OperationTypeNode') {
    return typeAssertTemplate(tea.stringLiteral('string'));
  }

  const name = getNodeNameWithoutSuffix(valueNode.id.name);
  return nodeTypeAssertTemplate(tea.stringLiteral(name));
};

const valueOfType = valueNode => {
  if (valueNode.type === 'StringTypeAnnotation') {
    return typeAssertTemplate(tea.stringLiteral('string'));
  } else if (valueNode.type === 'BooleanTypeAnnotation') {
    return typeAssertTemplate(tea.stringLiteral('boolean'));
  }

  return undefined;
}

const arrayTypeAssertTemplate = argAST => tea.callExpression(
  tea.identifier('assertArrayOf'),
  [argAST]
);

const valueOfArray = valueNode => {
  if (
    valueNode.type !== 'GenericTypeAnnotation' ||
    valueNode.id.type !== 'Identifier' ||
    valueNode.id.name !== 'Array'
  ) {
    return undefined;
  }

  const arrayValueNode = valueNode.typeParameters.params[0];
  const valueAssertion = determineValueAssertion(arrayValueNode);

  return arrayTypeAssertTemplate(valueAssertion);
};

const unionNodeTypeAssertTemplate = names => tea.callExpression(
  tea.identifier('assertOneOf'),
  [
    tea.arrayExpression(names.map(name => tea.stringLiteral(name)))
  ]
);

const valueOfUnionNodeType = valueNode => {
  if (
    valueNode.type !== 'UnionTypeAnnotation' ||
    !valueNode.types.every(n => n.type === 'GenericTypeAnnotation' && n.id.type === 'Identifier')
  ) {
    return undefined;
  }

  const names = valueNode.types.map(t => t.id.name);
  return unionNodeTypeAssertTemplate(names);
};

const determineValueAssertion = valueNode => {
  let node = valueNode;
  if (node.type === 'NullableTypeAnnotation') {
    node = node.typeAnnotation;
  }

  const template =
    valueOfUnionNodeType(node) ||
    valueOfArray(node) ||
    valueOfType(node) ||
    valueOfNodeType(node);

  if (template === undefined) {
    throw new TypeError(`Unrecognised value node of type ${node.type}!`)
  }

  return template;
}

const fieldDefinitionTemplate = (isOptional, assertionAST) => tea.objectExpression([
  tea.objectProperty(tea.identifier('optional'), tea.booleanLiteral(isOptional)),
  tea.objectProperty(tea.identifier('validate'), assertionAST)
]);

const getNodeBabelFields = node => node.properties
  .map(prop => {
    const fieldName = prop.key.name;
    if (blacklistedProps.includes(fieldName)) {
      return undefined;
    }

    const optional = !!prop.optional;
    const valueNode = prop.value;
    const valueAssertionAST = determineValueAssertion(valueNode);

    return tea.objectProperty(
      tea.identifier(fieldName),
      fieldDefinitionTemplate(optional, valueAssertionAST)
    );
  })
  .filter(x => x !== undefined);

const getNodeAliases = (nodeName, unions) => {
  const union = unions[nodeName] || new Set();
  return Array.from(union).map(getNodeNameWithoutSuffix);
};

const getNodeProperties = node => node.properties
  .map(prop => prop.key.name)
  .filter(propName => !blacklistedProps.includes(propName));

const defineTypeCallTemplate = (nameAST, argAST, fieldAST, aliasAST) => {
  return tea.callExpression(
    tea.identifier('defineType'),
    [
      nameAST,
      tea.objectExpression([
        tea.objectProperty(tea.identifier('builder'), argAST),
        tea.objectProperty(tea.identifier('fields'), fieldAST),
        tea.objectProperty(tea.identifier('aliases'), aliasAST)
      ])
    ]
  );
};

const buildDefineTypeCall = (nodeName, unions, node) => {
  const name = getNodeNameWithoutSuffix(nodeName);
  const fields = getNodeBabelFields(node);
  const args = getNodeProperties(node);
  const aliases = getNodeAliases(nodeName, unions);

  return defineTypeCallTemplate(
    tea.stringLiteral(name),
    tea.arrayExpression(args.map(arg => tea.stringLiteral(arg))),
    tea.objectExpression(fields),
    tea.arrayExpression(aliases.map(alias => tea.stringLiteral(alias))),
  );
};

const buildBabelTemplates = ast => {
  const { unions, nodes } = collectNodes(ast);

  return Object.keys(nodes).map(nodeName => {
    console.log(`Generating ${nodeName}...`);
    const node = nodes[nodeName];
    const { code } = generate(buildDefineTypeCall(nodeName, unions, node));
    return `/* Auto-generated Definition: ${nodeName} */\n${code}\n`;
  });
};

const definitionTemplate = body => `
import {
  assertNodeType,
  assertValueType,
  assertEach,
  assertOneOf,
  assertArrayOf
} from './index';

export default defineType => {
  ${body}
};
`;

const generateDefinitionFile = ast => {
  const definitionCalls = buildBabelTemplates(ast);
  return definitionTemplate(definitionCalls.join('\n'));
};

const definitionFileContents = generateDefinitionFile(loadAST());
const outputPath = resolve(__dirname, '../src/definitions/graphql.js');

console.log('Save & Done.');
writeFileSync(outputPath, definitionFileContents);
