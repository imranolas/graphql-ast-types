
# API

## Aliases

### AST

t.isAST(node: any): boolean

t.assertAST(node: any): boolean

### Definition

t.isDefinition(node: any): boolean

t.assertDefinition(node: any): boolean

### Value

t.isValue(node: any): boolean

t.assertValue(node: any): boolean

### Selection

t.isSelection(node: any): boolean

t.assertSelection(node: any): boolean

### Type

t.isType(node: any): boolean

t.assertType(node: any): boolean

### TypeSystemDefinition

t.isTypeSystemDefinition(node: any): boolean

t.assertTypeSystemDefinition(node: any): boolean

### TypeDefinition

t.isTypeDefinition(node: any): boolean

t.assertTypeDefinition(node: any): boolean

## Builders

### Name

t.name(value: StringTypeAnnotation): [NameNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L160)

t.isName(node: any): boolean

t.assertName(node: any): void

### Document

t.document(definitions: Array): [DocumentNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L168)

t.isDocument(node: any): boolean

t.assertDocument(node: any): void

### OperationDefinition

t.operationDefinition(operation: OperationTypeNode, selectionSet: SelectionSetNode, name: ?NullableTypeAnnotation, variableDefinitions: ?NullableTypeAnnotation, directives: ?NullableTypeAnnotation): [OperationDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L179)

t.isOperationDefinition(node: any): boolean

t.assertOperationDefinition(node: any): void

### VariableDefinition

t.variableDefinition(variable: VariableNode, type: TypeNode, defaultValue: ?NullableTypeAnnotation): [VariableDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L192)

t.isVariableDefinition(node: any): boolean

t.assertVariableDefinition(node: any): void

### Variable

t.variable(name: NameNode): [VariableNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L200)

t.isVariable(node: any): boolean

t.assertVariable(node: any): void

### SelectionSet

t.selectionSet(selections: Array): [SelectionSetNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L206)

t.isSelectionSet(node: any): boolean

t.assertSelectionSet(node: any): void

### Field

t.field(name: NameNode, alias: ?NullableTypeAnnotation, arguments: ?NullableTypeAnnotation, directives: ?NullableTypeAnnotation, selectionSet: ?NullableTypeAnnotation): [FieldNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L217)

t.isField(node: any): boolean

t.assertField(node: any): void

### Argument

t.argument(name: NameNode, value: ValueNode): [ArgumentNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L227)

t.isArgument(node: any): boolean

t.assertArgument(node: any): void

### FragmentSpread

t.fragmentSpread(name: NameNode, directives: ?NullableTypeAnnotation): [FragmentSpreadNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L237)

t.isFragmentSpread(node: any): boolean

t.assertFragmentSpread(node: any): void

### InlineFragment

t.inlineFragment(selectionSet: SelectionSetNode, typeCondition: ?NullableTypeAnnotation, directives: ?NullableTypeAnnotation): [InlineFragmentNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L244)

t.isInlineFragment(node: any): boolean

t.assertInlineFragment(node: any): void

### FragmentDefinition

t.fragmentDefinition(name: NameNode, typeCondition: NamedTypeNode, selectionSet: SelectionSetNode, directives: ?NullableTypeAnnotation): [FragmentDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L252)

t.isFragmentDefinition(node: any): boolean

t.assertFragmentDefinition(node: any): void

### IntValue

t.intValue(value: StringTypeAnnotation): [IntValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L275)

t.isIntValue(node: any): boolean

t.assertIntValue(node: any): void

### FloatValue

t.floatValue(value: StringTypeAnnotation): [FloatValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L281)

t.isFloatValue(node: any): boolean

t.assertFloatValue(node: any): void

### StringValue

t.stringValue(value: StringTypeAnnotation): [StringValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L287)

t.isStringValue(node: any): boolean

t.assertStringValue(node: any): void

### BooleanValue

t.booleanValue(value: BooleanTypeAnnotation): [BooleanValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L293)

t.isBooleanValue(node: any): boolean

t.assertBooleanValue(node: any): void

### NullValue

t.nullValue(): [NullValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L299)

t.isNullValue(node: any): boolean

t.assertNullValue(node: any): void

### EnumValue

t.enumValue(value: StringTypeAnnotation): [EnumValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L304)

t.isEnumValue(node: any): boolean

t.assertEnumValue(node: any): void

### ListValue

t.listValue(values: Array): [ListValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L310)

t.isListValue(node: any): boolean

t.assertListValue(node: any): void

### ObjectValue

t.objectValue(fields: Array): [ObjectValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L316)

t.isObjectValue(node: any): boolean

t.assertObjectValue(node: any): void

### ObjectField

t.objectField(name: NameNode, value: ValueNode): [ObjectFieldNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L322)

t.isObjectField(node: any): boolean

t.assertObjectField(node: any): void

### Directive

t.directive(name: NameNode, arguments: ?NullableTypeAnnotation): [DirectiveNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L332)

t.isDirective(node: any): boolean

t.assertDirective(node: any): void

### NamedType

t.namedType(name: NameNode): [NamedTypeNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L347)

t.isNamedType(node: any): boolean

t.assertNamedType(node: any): void

### ListType

t.listType(type: TypeNode): [ListTypeNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L353)

t.isListType(node: any): boolean

t.assertListType(node: any): void

### NonNullType

t.nonNullType(type: UnionTypeAnnotation): [NonNullTypeNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L359)

t.isNonNullType(node: any): boolean

t.assertNonNullType(node: any): void

### SchemaDefinition

t.schemaDefinition(directives: Array, operationTypes: Array): [SchemaDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L373)

t.isSchemaDefinition(node: any): boolean

t.assertSchemaDefinition(node: any): void

### OperationTypeDefinition

t.operationTypeDefinition(operation: OperationTypeNode, type: NamedTypeNode): [OperationTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L380)

t.isOperationTypeDefinition(node: any): boolean

t.assertOperationTypeDefinition(node: any): void

### ScalarTypeDefinition

t.scalarTypeDefinition(name: NameNode, directives: ?NullableTypeAnnotation): [ScalarTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L395)

t.isScalarTypeDefinition(node: any): boolean

t.assertScalarTypeDefinition(node: any): void

### ObjectTypeDefinition

t.objectTypeDefinition(name: NameNode, fields: Array, interfaces: ?NullableTypeAnnotation, directives: ?NullableTypeAnnotation): [ObjectTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L402)

t.isObjectTypeDefinition(node: any): boolean

t.assertObjectTypeDefinition(node: any): void

### FieldDefinition

t.fieldDefinition(name: NameNode, arguments: Array, type: TypeNode, directives: ?NullableTypeAnnotation): [FieldDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L411)

t.isFieldDefinition(node: any): boolean

t.assertFieldDefinition(node: any): void

### InputValueDefinition

t.inputValueDefinition(name: NameNode, type: TypeNode, defaultValue: ?NullableTypeAnnotation, directives: ?NullableTypeAnnotation): [InputValueDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L420)

t.isInputValueDefinition(node: any): boolean

t.assertInputValueDefinition(node: any): void

### InterfaceTypeDefinition

t.interfaceTypeDefinition(name: NameNode, fields: Array, directives: ?NullableTypeAnnotation): [InterfaceTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L429)

t.isInterfaceTypeDefinition(node: any): boolean

t.assertInterfaceTypeDefinition(node: any): void

### UnionTypeDefinition

t.unionTypeDefinition(name: NameNode, types: Array, directives: ?NullableTypeAnnotation): [UnionTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L437)

t.isUnionTypeDefinition(node: any): boolean

t.assertUnionTypeDefinition(node: any): void

### EnumTypeDefinition

t.enumTypeDefinition(name: NameNode, values: Array, directives: ?NullableTypeAnnotation): [EnumTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L445)

t.isEnumTypeDefinition(node: any): boolean

t.assertEnumTypeDefinition(node: any): void

### EnumValueDefinition

t.enumValueDefinition(name: NameNode, directives: ?NullableTypeAnnotation): [EnumValueDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L453)

t.isEnumValueDefinition(node: any): boolean

t.assertEnumValueDefinition(node: any): void

### InputObjectTypeDefinition

t.inputObjectTypeDefinition(name: NameNode, fields: Array, directives: ?NullableTypeAnnotation): [InputObjectTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L460)

t.isInputObjectTypeDefinition(node: any): boolean

t.assertInputObjectTypeDefinition(node: any): void

### TypeExtensionDefinition

t.typeExtensionDefinition(definition: ObjectTypeDefinitionNode): [TypeExtensionDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L468)

t.isTypeExtensionDefinition(node: any): boolean

t.assertTypeExtensionDefinition(node: any): void

### DirectiveDefinition

t.directiveDefinition(name: NameNode, locations: Array, arguments: ?NullableTypeAnnotation): [DirectiveDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L474)

t.isDirectiveDefinition(node: any): boolean

t.assertDirectiveDefinition(node: any): void
  