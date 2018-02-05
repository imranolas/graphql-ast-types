const tea = require("babel-types"); // The only right way to name this
const { default: generate } = require("babel-generator");

const {
  collectNodes,
  getNodeNameWithoutSuffix,
  isPropBlacklisted,
  isNodeName
} = require("./helpers");

const nodeTypeAssertTemplate = argAST =>
  tea.callExpression(tea.identifier("assertNodeType"), [argAST]);

const typeAssertTemplate = argAST =>
  tea.callExpression(tea.identifier("assertValueType"), [argAST]);

const valueOfNodeType = valueNode => {
  if (
    valueNode.type !== "GenericTypeAnnotation" ||
    valueNode.id.type !== "Identifier" ||
    (!isNodeName(valueNode.id.name) &&
      valueNode.id.name !== "OperationTypeNode")
  ) {
    return undefined;
  }

  if (valueNode.id.name === "OperationTypeNode") {
    return typeAssertTemplate(tea.stringLiteral("string"));
  }

  const name = getNodeNameWithoutSuffix(valueNode.id.name);
  return nodeTypeAssertTemplate(tea.stringLiteral(name));
};

const valueOfType = valueNode => {
  if (valueNode.type === "StringTypeAnnotation") {
    return typeAssertTemplate(tea.stringLiteral("string"));
  } else if (valueNode.type === "BooleanTypeAnnotation") {
    return typeAssertTemplate(tea.stringLiteral("boolean"));
  }

  return undefined;
};

const arrayTypeAssertTemplate = argAST =>
  tea.callExpression(tea.identifier("assertArrayOf"), [argAST]);

const valueOfArray = valueNode => {
  if (
    valueNode.type !== "GenericTypeAnnotation" ||
    valueNode.id.type !== "Identifier" ||
    valueNode.id.name !== "Array"
  ) {
    return undefined;
  }

  const arrayValueNode = valueNode.typeParameters.params[0];
  const valueAssertion = determineValueAssertion(arrayValueNode);

  return arrayTypeAssertTemplate(valueAssertion);
};

const unionNodeTypeAssertTemplate = names =>
  tea.callExpression(
    tea.identifier("assertOneOf"),
    names.map(name => tea.stringLiteral(getNodeNameWithoutSuffix(name)))
  );

const valueOfUnionNodeType = valueNode => {
  if (
    valueNode.type !== "UnionTypeAnnotation" ||
    !valueNode.types.every(
      n => n.type === "GenericTypeAnnotation" && n.id.type === "Identifier"
    )
  ) {
    return undefined;
  }

  const names = valueNode.types.map(t => t.id.name);
  return unionNodeTypeAssertTemplate(names);
};

const determineValueAssertion = valueNode => {
  let node = valueNode;
  if (node.type === "NullableTypeAnnotation") {
    node = node.typeAnnotation;
  }

  const template =
    valueOfUnionNodeType(node) ||
    valueOfArray(node) ||
    valueOfType(node) ||
    valueOfNodeType(node);

  if (template === undefined) {
    throw new TypeError(`Unrecognised value node of type ${node.type}!`);
  }

  return template;
};

const fieldDefinitionTemplate = (isOptional, assertionAST) =>
  tea.objectExpression([
    tea.objectProperty(
      tea.identifier("optional"),
      tea.booleanLiteral(isOptional)
    ),
    tea.objectProperty(tea.identifier("validate"), assertionAST)
  ]);

const getNodeBabelFields = node => {
  const fields = node.properties
    .map(prop => {
      const fieldName = prop.key.name;
      if (isPropBlacklisted(fieldName)) {
        return undefined;
      }

      const optional = !!prop.optional;
      const valueNode = prop.value;
      const valueAssertionAST = determineValueAssertion(valueNode);

      const ast = tea.objectProperty(
        tea.identifier(fieldName),
        fieldDefinitionTemplate(optional, valueAssertionAST)
      );

      return [optional, ast];
    })
    .filter(x => x !== undefined);

  // Preserve order, but put non-optional fields first
  const nonOptionalFields = fields.filter(([opt]) => !opt).map(arr => arr[1]);
  const optionalFields = fields.filter(([opt]) => opt).map(arr => arr[1]);
  return nonOptionalFields.concat(optionalFields);
};

const getNodeAliases = (nodeName, unions) => {
  const union = unions[nodeName] || new Set();
  return Array.from(union).map(getNodeNameWithoutSuffix);
};

const defineTypeCallTemplate = (nameAST, argAST, fieldAST, aliasAST) => {
  return tea.arrayExpression([
    nameAST,
    tea.objectExpression([
      tea.objectProperty(tea.identifier("builder"), argAST),
      tea.objectProperty(tea.identifier("fields"), fieldAST),
      tea.objectProperty(tea.identifier("aliases"), aliasAST)
    ])
  ]);
};

const getArgsFromFields = fields => fields.map(field => field.key.name);

const buildDefineTypeCall = (nodeName, unions, node) => {
  const name = getNodeNameWithoutSuffix(nodeName);
  const fields = getNodeBabelFields(node);
  const args = getArgsFromFields(fields);
  const aliases = getNodeAliases(nodeName, unions);

  return defineTypeCallTemplate(
    tea.stringLiteral(name),
    tea.arrayExpression(args.map(arg => tea.stringLiteral(arg))),
    tea.objectExpression(fields),
    tea.arrayExpression(aliases.map(alias => tea.stringLiteral(alias)))
  );
};

const buildBabelTemplates = ast => {
  const { unions, nodes } = collectNodes(ast);

  return generate(
    tea.arrayExpression(
      Object.keys(nodes).map(nodeName => {
        const node = nodes[nodeName];
        return buildDefineTypeCall(nodeName, unions, node);
      })
    )
  ).code;
};

const definitionTemplate = body =>
  `
/* These are auto-generated definitions: Please do not edit this file directly */

import {
  assertNodeType,
  assertValueType,
  assertEach,
  assertOneOf,
  assertArrayOf
} from './index';

export default () => ${body};
`.trim();

const generateDefinitionContent = ast => {
  const definitionCalls = buildBabelTemplates(ast);
  return definitionTemplate(definitionCalls);
};

module.exports = function generateDefinitionFile(ast) {
  return generateDefinitionContent(ast);
};
