<h1 align="center">graphql-ast-types</h1>
<p align="center">Helper functions for generating a GraphQL AST</p>

## Getting Started

`yarn add graphql-ast-types`

```js
import * as t from 'graphql-ast-types';
```

## API

#### `t.is(name, Node)`

## Node helpers

#### `t.Name(value)`
#### `t.Document(definitions)`
#### `t.OperationDefinition(operation, selectionSet, name, variableDefinitions, directives)`
#### `t.VariableDefinition(variable, type, defaultValue)`
#### `t.Variable(name)`
#### `t.SelectionSet(selections)`
#### `t.Field(name, alias, arguments, directives, selectionSet)`
#### `t.Argument(name, value)`
#### `t.FragmentSpread(name)`
#### `t.InlineFragment(selectionSet, typeCondition, directives)`
#### `t.FragmentDefinition(name, typeCondition, selectionSet, directives)`
#### `t.IntValue(value)`
#### `t.FloatValue(value)`
#### `t.StringValue(value)`
#### `t.BooleanValue(value)`
#### `t.NullValue()`
#### `t.EnumValue(value)`
#### `t.ListValue(value)`
#### `t.ObjectValue(fields)`
#### `t.ObjectField(name, value)`
#### `t.Directive(name, arguments)`
#### `t.NamedType(name)`
#### `t.ListType(type)`
#### `t.NonNullType(type)`
#### `t.SchemaDefinition(directives, operationTypes)`
#### `t.OperationType(operation, type)`
#### `t.ScalarTypeDefinition(name, directives)`
#### `t.ObjectTypeDefinition(name, fields, directives, interfaces)`
#### `t.FieldDefinition(name, arguments, type, directives)`
#### `t.InputValueDefinition(name, type, defaultValue, directives)`
#### `t.InterfaceTypeDefinition(name, fields, directives)`
#### `t.InputValueDefinition(name, type, directives)`
#### `t.EnumTypeDefinition(name, values, directives)`
#### `t.EnumValueDefinition(name, directives)`
#### `t.InterfaceTypeDefinition(name, fields, directives)`
#### `t.InterfaceTypeDefinition(definition)`
#### `t.DirectiveDefinition(name, locations, arguments)`
