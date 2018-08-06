
# API

## Aliases

### AST

t.isAST(node: any): boolean

t.assertAST(node: any): boolean

### ExecutableDefinition

t.isExecutableDefinition(node: any): boolean

t.assertExecutableDefinition(node: any): boolean

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

### TypeExtension

t.isTypeExtension(node: any): boolean

t.assertTypeExtension(node: any): boolean

### Definition

t.isDefinition(node: any): boolean

t.assertDefinition(node: any): boolean

## Builders

### ASTKindTo

t.aSTKindTo(NamedType: NamedTypeNode, Name: NameNode, OperationDefinition: OperationDefinitionNode, VariableDefinition: VariableDefinitionNode, Variable: VariableNode, SelectionSet: SelectionSetNode, Field: FieldNode, Argument: ArgumentNode, FragmentSpread: FragmentSpreadNode, InlineFragment: InlineFragmentNode, FragmentDefinition: FragmentDefinitionNode, IntValue: IntValueNode, FloatValue: FloatValueNode, StringValue: StringValueNode, BooleanValue: BooleanValueNode, NullValue: NullValueNode, EnumValue: EnumValueNode, ListValue: ListValueNode, ObjectValue: ObjectValueNode, ObjectField: ObjectFieldNode, Directive: DirectiveNode, Document: DocumentNode, ListType: ListTypeNode, NonNullType: NonNullTypeNode, SchemaDefinition: SchemaDefinitionNode, OperationTypeDefinition: OperationTypeDefinitionNode, ScalarTypeDefinition: ScalarTypeDefinitionNode, ObjectTypeDefinition: ObjectTypeDefinitionNode, FieldDefinition: FieldDefinitionNode, InputValueDefinition: InputValueDefinitionNode, InterfaceTypeDefinition: InterfaceTypeDefinitionNode, UnionTypeDefinition: UnionTypeDefinitionNode, EnumTypeDefinition: EnumTypeDefinitionNode, EnumValueDefinition: EnumValueDefinitionNode, InputObjectTypeDefinition: InputObjectTypeDefinitionNode, ScalarTypeExtension: ScalarTypeExtensionNode, ObjectTypeExtension: ObjectTypeExtensionNode, InterfaceTypeExtension: InterfaceTypeExtensionNode, UnionTypeExtension: UnionTypeExtensionNode, EnumTypeExtension: EnumTypeExtensionNode, InputObjectTypeExtension: InputObjectTypeExtensionNode, DirectiveDefinition: DirectiveDefinitionNode): [ASTKindToNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L138)

t.isASTKindTo(node: any): boolean

t.assertASTKindTo(node: any): void

### Name

t.name(value: StringTypeAnnotation): [NameNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L185)

t.isName(node: any): boolean

t.assertName(node: any): void

### Document

t.document(definitions: $ReadOnlyArray): [DocumentNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L193)

t.isDocument(node: any): boolean

t.assertDocument(node: any): void

### OperationDefinition

t.operationDefinition(operation: OperationTypeNode, selectionSet: SelectionSetNode, name: ?NameNode, variableDefinitions: ?$ReadOnlyArray, directives: ?$ReadOnlyArray): [OperationDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L207)

t.isOperationDefinition(node: any): boolean

t.assertOperationDefinition(node: any): void

### VariableDefinition

t.variableDefinition(variable: VariableNode, type: TypeNode, defaultValue: ?ValueNode): [VariableDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L219)

t.isVariableDefinition(node: any): boolean

t.assertVariableDefinition(node: any): void

### Variable

t.variable(name: NameNode): [VariableNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L227)

t.isVariable(node: any): boolean

t.assertVariable(node: any): void

### SelectionSet

t.selectionSet(selections: $ReadOnlyArray): [SelectionSetNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L233)

t.isSelectionSet(node: any): boolean

t.assertSelectionSet(node: any): void

### Field

t.field(name: NameNode, alias: ?NameNode, arguments: ?$ReadOnlyArray, directives: ?$ReadOnlyArray, selectionSet: ?SelectionSetNode): [FieldNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L241)

t.isField(node: any): boolean

t.assertField(node: any): void

### Argument

t.argument(name: NameNode, value: ValueNode): [ArgumentNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L251)

t.isArgument(node: any): boolean

t.assertArgument(node: any): void

### FragmentSpread

t.fragmentSpread(name: NameNode, directives: ?$ReadOnlyArray): [FragmentSpreadNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L260)

t.isFragmentSpread(node: any): boolean

t.assertFragmentSpread(node: any): void

### InlineFragment

t.inlineFragment(selectionSet: SelectionSetNode, typeCondition: ?NamedTypeNode, directives: ?$ReadOnlyArray): [InlineFragmentNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L267)

t.isInlineFragment(node: any): boolean

t.assertInlineFragment(node: any): void

### FragmentDefinition

t.fragmentDefinition(name: NameNode, typeCondition: NamedTypeNode, selectionSet: SelectionSetNode, variableDefinitions: ?$ReadOnlyArray, directives: ?$ReadOnlyArray): [FragmentDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L275)

t.isFragmentDefinition(node: any): boolean

t.assertFragmentDefinition(node: any): void

### IntValue

t.intValue(value: StringTypeAnnotation): [IntValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L300)

t.isIntValue(node: any): boolean

t.assertIntValue(node: any): void

### FloatValue

t.floatValue(value: StringTypeAnnotation): [FloatValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L306)

t.isFloatValue(node: any): boolean

t.assertFloatValue(node: any): void

### StringValue

t.stringValue(value: StringTypeAnnotation, block: ?BooleanTypeAnnotation): [StringValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L312)

t.isStringValue(node: any): boolean

t.assertStringValue(node: any): void

### BooleanValue

t.booleanValue(value: BooleanTypeAnnotation): [BooleanValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L319)

t.isBooleanValue(node: any): boolean

t.assertBooleanValue(node: any): void

### NullValue

t.nullValue(): [NullValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L325)

t.isNullValue(node: any): boolean

t.assertNullValue(node: any): void

### EnumValue

t.enumValue(value: StringTypeAnnotation): [EnumValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L330)

t.isEnumValue(node: any): boolean

t.assertEnumValue(node: any): void

### ListValue

t.listValue(values: $ReadOnlyArray): [ListValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L336)

t.isListValue(node: any): boolean

t.assertListValue(node: any): void

### ObjectValue

t.objectValue(fields: $ReadOnlyArray): [ObjectValueNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L342)

t.isObjectValue(node: any): boolean

t.assertObjectValue(node: any): void

### ObjectField

t.objectField(name: NameNode, value: ValueNode): [ObjectFieldNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L348)

t.isObjectField(node: any): boolean

t.assertObjectField(node: any): void

### Directive

t.directive(name: NameNode, arguments: ?$ReadOnlyArray): [DirectiveNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L357)

t.isDirective(node: any): boolean

t.assertDirective(node: any): void

### NamedType

t.namedType(name: NameNode): [NamedTypeNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L368)

t.isNamedType(node: any): boolean

t.assertNamedType(node: any): void

### ListType

t.listType(type: TypeNode): [ListTypeNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L374)

t.isListType(node: any): boolean

t.assertListType(node: any): void

### NonNullType

t.nonNullType(type: UnionTypeAnnotation): [NonNullTypeNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L380)

t.isNonNullType(node: any): boolean

t.assertNonNullType(node: any): void

### SchemaDefinition

t.schemaDefinition(directives: $ReadOnlyArray, operationTypes: $ReadOnlyArray): [SchemaDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L394)

t.isSchemaDefinition(node: any): boolean

t.assertSchemaDefinition(node: any): void

### OperationTypeDefinition

t.operationTypeDefinition(operation: OperationTypeNode, type: NamedTypeNode): [OperationTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L401)

t.isOperationTypeDefinition(node: any): boolean

t.assertOperationTypeDefinition(node: any): void

### ScalarTypeDefinition

t.scalarTypeDefinition(name: NameNode, description: ?StringValueNode, directives: ?$ReadOnlyArray): [ScalarTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L418)

t.isScalarTypeDefinition(node: any): boolean

t.assertScalarTypeDefinition(node: any): void

### ObjectTypeDefinition

t.objectTypeDefinition(name: NameNode, description: ?StringValueNode, interfaces: ?$ReadOnlyArray, directives: ?$ReadOnlyArray, fields: ?$ReadOnlyArray): [ObjectTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L426)

t.isObjectTypeDefinition(node: any): boolean

t.assertObjectTypeDefinition(node: any): void

### FieldDefinition

t.fieldDefinition(name: NameNode, type: TypeNode, description: ?StringValueNode, arguments: ?$ReadOnlyArray, directives: ?$ReadOnlyArray): [FieldDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L436)

t.isFieldDefinition(node: any): boolean

t.assertFieldDefinition(node: any): void

### InputValueDefinition

t.inputValueDefinition(name: NameNode, type: TypeNode, description: ?StringValueNode, defaultValue: ?ValueNode, directives: ?$ReadOnlyArray): [InputValueDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L446)

t.isInputValueDefinition(node: any): boolean

t.assertInputValueDefinition(node: any): void

### InterfaceTypeDefinition

t.interfaceTypeDefinition(name: NameNode, description: ?StringValueNode, directives: ?$ReadOnlyArray, fields: ?$ReadOnlyArray): [InterfaceTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L456)

t.isInterfaceTypeDefinition(node: any): boolean

t.assertInterfaceTypeDefinition(node: any): void

### UnionTypeDefinition

t.unionTypeDefinition(name: NameNode, description: ?StringValueNode, directives: ?$ReadOnlyArray, types: ?$ReadOnlyArray): [UnionTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L465)

t.isUnionTypeDefinition(node: any): boolean

t.assertUnionTypeDefinition(node: any): void

### EnumTypeDefinition

t.enumTypeDefinition(name: NameNode, description: ?StringValueNode, directives: ?$ReadOnlyArray, values: ?$ReadOnlyArray): [EnumTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L474)

t.isEnumTypeDefinition(node: any): boolean

t.assertEnumTypeDefinition(node: any): void

### EnumValueDefinition

t.enumValueDefinition(name: NameNode, description: ?StringValueNode, directives: ?$ReadOnlyArray): [EnumValueDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L483)

t.isEnumValueDefinition(node: any): boolean

t.assertEnumValueDefinition(node: any): void

### InputObjectTypeDefinition

t.inputObjectTypeDefinition(name: NameNode, description: ?StringValueNode, directives: ?$ReadOnlyArray, fields: ?$ReadOnlyArray): [InputObjectTypeDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L491)

t.isInputObjectTypeDefinition(node: any): boolean

t.assertInputObjectTypeDefinition(node: any): void

### ScalarTypeExtension

t.scalarTypeExtension(name: NameNode, directives: ?$ReadOnlyArray): [ScalarTypeExtensionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L510)

t.isScalarTypeExtension(node: any): boolean

t.assertScalarTypeExtension(node: any): void

### ObjectTypeExtension

t.objectTypeExtension(name: NameNode, interfaces: ?$ReadOnlyArray, directives: ?$ReadOnlyArray, fields: ?$ReadOnlyArray): [ObjectTypeExtensionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L517)

t.isObjectTypeExtension(node: any): boolean

t.assertObjectTypeExtension(node: any): void

### InterfaceTypeExtension

t.interfaceTypeExtension(name: NameNode, directives: ?$ReadOnlyArray, fields: ?$ReadOnlyArray): [InterfaceTypeExtensionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L526)

t.isInterfaceTypeExtension(node: any): boolean

t.assertInterfaceTypeExtension(node: any): void

### UnionTypeExtension

t.unionTypeExtension(name: NameNode, directives: ?$ReadOnlyArray, types: ?$ReadOnlyArray): [UnionTypeExtensionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L534)

t.isUnionTypeExtension(node: any): boolean

t.assertUnionTypeExtension(node: any): void

### EnumTypeExtension

t.enumTypeExtension(name: NameNode, directives: ?$ReadOnlyArray, values: ?$ReadOnlyArray): [EnumTypeExtensionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L542)

t.isEnumTypeExtension(node: any): boolean

t.assertEnumTypeExtension(node: any): void

### InputObjectTypeExtension

t.inputObjectTypeExtension(name: NameNode, directives: ?$ReadOnlyArray, fields: ?$ReadOnlyArray): [InputObjectTypeExtensionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L550)

t.isInputObjectTypeExtension(node: any): boolean

t.assertInputObjectTypeExtension(node: any): void

### DirectiveDefinition

t.directiveDefinition(name: NameNode, locations: $ReadOnlyArray, description: ?StringValueNode, arguments: ?$ReadOnlyArray): [DirectiveDefinitionNode](https://github.com/graphql/graphql-js/blob/v0.11.7/src/language/ast.js#L560)

t.isDirectiveDefinition(node: any): boolean

t.assertDirectiveDefinition(node: any): void
  