/* eslint-disable no-use-before-define */

import {
  assertNodeType,
  assertValueType,
  assertEach,
  assertOneOf,
  assertArrayOf,
  chain
} from './index';

export default defineType => {
  type Token = any;
  type Source = any;

  type Location = {
    start: number,
    end: number,
    startToken: Token,
    endToken: Token,
    source: Source
  };

  /**
 * The list of all possible AST node types.
 */
  type ASTNode =
    | NameNode
    | DocumentNode
    | OperationDefinitionNode
    | VariableDefinitionNode
    | VariableNode
    | SelectionSetNode
    | FieldNode
    | ArgumentNode
    | FragmentSpreadNode
    | InlineFragmentNode
    | FragmentDefinitionNode
    | IntValueNode
    | FloatValueNode
    | StringValueNode
    | BooleanValueNode
    | NullValueNode
    | EnumValueNode
    | ListValueNode
    | ObjectValueNode
    | ObjectFieldNode
    | DirectiveNode
    | NamedTypeNode
    | ListTypeNode
    | NonNullTypeNode
    | SchemaDefinitionNode
    | OperationTypeDefinitionNode
    | ScalarTypeDefinitionNode
    | ObjectTypeDefinitionNode
    | FieldDefinitionNode
    | InputValueDefinitionNode
    | InterfaceTypeDefinitionNode
    | UnionTypeDefinitionNode
    | EnumTypeDefinitionNode
    | EnumValueDefinitionNode
    | InputObjectTypeDefinitionNode
    | TypeExtensionDefinitionNode
    | DirectiveDefinitionNode;

  // Name

  type NameNode = {
    kind: 'Name',
    loc?: Location,
    value: string
  };

  defineType('Name', {
    builder: ['value']
  });

  // Document

  type DocumentNode = {
    kind: 'Document',
    loc?: Location,
    definitions: Array<DefinitionNode>
  };

  defineType('Document', {
    builder: ['definitions'],
    fields: {
      definitions: {
        validate: assertArrayOf(assertNodeType('Definition'))
      }
    }
  });

  type DefinitionNode = OperationDefinitionNode | FragmentDefinitionNode | TypeSystemDefinitionNode; // experimental non-spec addition.

  type OperationDefinitionNode = {
    kind: 'OperationDefinition',
    loc?: Location,
    operation: OperationTypeNode,
    name?: ?NameNode,
    variableDefinitions?: ?Array<VariableDefinitionNode>,
    directives?: ?Array<DirectiveNode>,
    selectionSet: SelectionSetNode
  };

  defineType('OperationDefinition', {
    builder: ['operation', 'selectionSet', 'name', 'variableDefinitions', 'directives'],
    fields: {
      operation: {
        validate: assertValueType('string')
      },
      name: {
        validate: assertNodeType('Name'),
        optional: true
      },
      variableDefinitions: {
        validate: assertArrayOf(assertNodeType('VariableDefinition')),
        optional: true
      },
      directives: {
        validate: assertArrayOf(assertNodeType('Directive')),
        optional: true
      },
      selectionSet: {
        validate: assertNodeType('SelectionSet')
      }
    },
    aliases: ['Definition']
  });

  // Note: subscription is an experimental non-spec addition.
  type OperationTypeNode = 'query' | 'mutation' | 'subscription';

  type VariableDefinitionNode = {
    kind: 'VariableDefinition',
    loc?: Location,
    variable: VariableNode,
    type: TypeNode,
    defaultValue?: ?ValueNode
  };

  defineType('VariableDefinition', {
    builder: ['variable', 'type', 'defaultValue'],
    fields: {
      variable: {
        validate: assertNodeType('Variable')
      },
      type: {
        validate: assertNodeType('Type')
      },
      defaultValue: {
        validate: assertNodeType('Value'),
        optional: true
      }
    },
    alias: ['DefinitionNode']
  });

  type VariableNode = {
    kind: 'Variable',
    loc?: Location,
    name: NameNode
  };

  defineType('Variable', {
    builder: ['name'],
    fields: {
      name: {
        validate: assertValueType('Name')
      }
    }
  });

  type SelectionSetNode = {
    kind: 'SelectionSet',
    loc?: Location,
    selections: Array<SelectionNode>
  };

  defineType('SelectionSet', {
    builder: ['selections'],
    fields: {
      selections: {
        validate: assertArrayOf(assertNodeType('Selection'))
      }
    }
  });

  type SelectionNode = FieldNode | FragmentSpreadNode | InlineFragmentNode;

  type FieldNode = {
    kind: 'Field',
    loc?: Location,
    alias?: ?NameNode,
    name: NameNode,
    arguments?: ?Array<ArgumentNode>,
    directives?: ?Array<DirectiveNode>,
    selectionSet?: ?SelectionSetNode
  };

  defineType('Field', {
    builder: ['name', 'alias', 'arguments', 'directives', 'selectionSet'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      alias: {
        validate: assertNodeType('Name'),
        optional: true
      },
      arguments: {
        validate: assertArrayOf(assertNodeType('Argument')),
        optional: true
      },
      directives: {
        validate: assertArrayOf(assertNodeType('Directive')),
        optional: true
      },
      selectionSet: {
        validate: assertNodeType('SelectionSet'),
        optional: true
      }
    },
    aliases: ['Selection']
  });

  type ArgumentNode = {
    kind: 'Argument',
    loc?: Location,
    name: NameNode,
    value: ValueNode
  };

  defineType('Argument', {
    builder: ['name', 'value'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      value: {
        validate: assertNodeType('Value')
      }
    }
  });

  // Fragments

  type FragmentSpreadNode = {
    kind: 'FragmentSpread',
    loc?: Location,
    name: NameNode,
    directives?: ?Array<DirectiveNode>
  };

  defineType('FragmentSpread', {
    builder: ['name'],
    fields: {
      directives: {
        validate: assertArrayOf(assertNodeType('Directive')),
        optional: true
      }
    },
    aliases: ['Selection']
  });

  type InlineFragmentNode = {
    kind: 'InlineFragment',
    loc?: Location,
    typeCondition?: ?NamedTypeNode,
    directives?: ?Array<DirectiveNode>,
    selectionSet: SelectionSetNode
  };

  defineType('InlineFragment', {
    builder: ['selectionSet', 'typeCondition', 'directives'],
    fields: {
      directives: {
        optional: true,
        validate: assertArrayOf(assertNodeType('Directive'))
      },
      typeCondition: {
        optional: true,
        validate: assertNodeType('NamedType')
      },
      selectionSet: {
        validate: assertNodeType('SelectionSet')
      }
    },
    aliases: ['Selection']
  });

  type FragmentDefinitionNode = {
    kind: 'FragmentDefinition',
    loc?: Location,
    name: NameNode,
    typeCondition: NamedTypeNode,
    directives?: ?Array<DirectiveNode>,
    selectionSet: SelectionSetNode
  };

  defineType('FragmentDefinition', {
    builder: ['name', 'typeCondition', 'selectionSet', 'directives'],
    fields: {
      directives: {
        optional: true,
        validate: assertArrayOf(assertNodeType('Directive'))
      },
      name: {
        validate: assertNodeType('Name')
      },
      typeCondition: {
        validate: assertNodeType('NamedType')
      },
      selectionSet: {
        validate: assertNodeType('SelectionSet')
      }
    },
    aliases: ['Definition']
  });

  // Values

  type ValueNode =
    | VariableNode
    | IntValueNode
    | FloatValueNode
    | StringValueNode
    | BooleanValueNode
    | NullValueNode
    | EnumValueNode
    | ListValueNode
    | ObjectValueNode;

  type IntValueNode = {
    kind: 'IntValue',
    loc?: Location,
    value: string
  };

  defineType('IntValue', {
    builder: ['value'],
    fields: {
      value: {
        validate: assertValueType('string')
      }
    },
    aliases: ['Value']
  });

  type FloatValueNode = {
    kind: 'FloatValue',
    loc?: Location,
    value: string
  };

  defineType('FloatValue', {
    builder: ['value'],
    fields: {
      value: {
        validate: assertValueType('string')
      }
    },
    aliases: ['Value']
  });

  type StringValueNode = {
    kind: 'StringValue',
    loc?: Location,
    value: string
  };

  defineType('StringValue', {
    builder: ['value'],
    fields: {
      value: {
        validate: assertValueType('string')
      }
    },
    aliases: ['Value']
  });

  type BooleanValueNode = {
    kind: 'BooleanValue',
    loc?: Location,
    value: boolean
  };

  defineType('BooleanValue', {
    builder: ['value'],
    fields: {
      value: {
        validate: assertValueType('boolean')
      }
    },
    aliases: ['Value']
  });

  type NullValueNode = {
    kind: 'NullValue',
    loc?: Location
  };

  defineType('NullValue', {
    aliases: ['Value']
  });

  type EnumValueNode = {
    kind: 'EnumValue',
    loc?: Location,
    value: string
  };

  defineType('EnumValue', {
    builder: ['value'],
    fields: {
      value: {
        validate: assertValueType('string')
      }
    },
    aliases: ['Value']
  });

  type ListValueNode = {
    kind: 'ListValue',
    loc?: Location,
    values: Array<ValueNode>
  };

  defineType('ListValue', {
    builder: ['value'],
    fields: {
      value: {
        validate: assertArrayOf(assertNodeType('Value'))
      }
    },
    aliases: ['Value']
  });

  type ObjectValueNode = {
    kind: 'ObjectValue',
    loc?: Location,
    fields: Array<ObjectFieldNode>
  };

  defineType('ObjectValue', {
    builder: ['fields'],
    fields: {
      fields: {
        validate: assertArrayOf(assertNodeType('ObjectField'))
      }
    },
    aliases: ['Value']
  });

  type ObjectFieldNode = {
    kind: 'ObjectField',
    loc?: Location,
    name: NameNode,
    value: ValueNode
  };

  defineType('ObjectField', {
    builder: ['name', 'value'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      value: {
        validate: assertValueType('boolean')
      }
    },
    aliases: ['Value']
  });
  // Directives

  type DirectiveNode = {
    kind: 'Directive',
    loc?: Location,
    name: NameNode,
    arguments?: ?Array<ArgumentNode>
  };

  defineType('Directive', {
    builder: ['name', 'arguments'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      arguments: {
        optional: true,
        validate: assertArrayOf(assertNodeType('Argument'))
      }
    }
  });

  // Type Reference

  type TypeNode = NamedTypeNode | ListTypeNode | NonNullTypeNode;

  type NamedTypeNode = {
    kind: 'NamedType',
    loc?: Location,
    name: NameNode
  };

  defineType('NamedType', {
    builder: ['name'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      }
    },
    aliases: ['Type']
  });

  type ListTypeNode = {
    kind: 'ListType',
    loc?: Location,
    type: TypeNode
  };

  defineType('ListType', {
    builder: ['type'],
    fields: {
      type: {
        validate: assertNodeType('Type')
      }
    },
    aliases: ['Type']
  });

  type NonNullTypeNode = {
    kind: 'NonNullType',
    loc?: Location,
    type: NamedTypeNode | ListTypeNode
  };

  defineType('NonNullType', {
    builder: ['type'],
    fields: {
      type: {
        validate: assertOneOf(['NamedType', 'ListType'])
      }
    },
    aliases: ['Type']
  });

  // Type System Definition

  type TypeSystemDefinitionNode =
    | SchemaDefinitionNode
    | TypeDefinitionNode
    | TypeExtensionDefinitionNode
    | DirectiveDefinitionNode;

  type SchemaDefinitionNode = {
    kind: 'SchemaDefinition',
    loc?: Location,
    directives: Array<DirectiveNode>,
    operationTypes: Array<OperationTypeDefinitionNode>
  };

  defineType('SchemaDefinition', {
    builder: ['directives', 'operationTypes'],
    fields: {
      directives: {
        validate: assertArrayOf(assertNodeType('Directive'))
      },
      operationTypes: {
        validate: chain(
          assertValueType('array'),
          assertEach(assertNodeType('OperationTypeDefinition'))
        )
      }
    },
    aliases: ['TypeSystemDefinition']
  });

  type OperationTypeDefinitionNode = {
    kind: 'OperationTypeDefinition',
    loc?: Location,
    operation: OperationTypeNode,
    type: NamedTypeNode
  };

  defineType('OperationType', {
    builder: ['operation', 'type'],
    fields: {
      operation: {
        validate: assertNodeType('OperationType')
      },
      type: {
        validate: assertNodeType('NameType')
      }
    }
  });

  type TypeDefinitionNode =
    | ScalarTypeDefinitionNode
    | ObjectTypeDefinitionNode
    | InterfaceTypeDefinitionNode
    | UnionTypeDefinitionNode
    | EnumTypeDefinitionNode
    | InputObjectTypeDefinitionNode;

  type ScalarTypeDefinitionNode = {
    kind: 'ScalarTypeDefinition',
    loc?: Location,
    name: NameNode,
    directives?: ?Array<DirectiveNode>
  };

  defineType('ScalarTypeDefinition', {
    builder: ['name', 'directives'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      directives: {
        optional: true,
        validate: assertArrayOf(assertNodeType('Directive'))
      }
    }
  });

  type ObjectTypeDefinitionNode = {
    kind: 'ObjectTypeDefinition',
    loc?: Location,
    name: NameNode,
    interfaces?: ?Array<NamedTypeNode>,
    directives?: ?Array<DirectiveNode>,
    fields: Array<FieldDefinitionNode>
  };

  defineType('ObjectTypeDefinition', {
    builder: ['name', 'fields', 'directives', 'interfaces'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      directives: {
        optional: true,
        validate: assertArrayOf(assertNodeType('Directive'))
      },
      interfaces: {
        optional: true,
        validate: assertArrayOf(assertNodeType('NamedType'))
      },
      fields: {
        validate: assertArrayOf(assertNodeType('FieldDefinition'))
      }
    }
  });

  type FieldDefinitionNode = {
    kind: 'FieldDefinition',
    loc?: Location,
    name: NameNode,
    arguments: Array<InputValueDefinitionNode>,
    type: TypeNode,
    directives?: ?Array<DirectiveNode>
  };

  defineType('FieldDefinition', {
    builder: ['name', 'arguments', 'type', 'directives'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      arguments: {
        validate: assertArrayOf(assertNodeType('InputValueDefinition'))
      },
      type: {
        validate: assertNodeType('Type')
      },
      directives: {
        validate: assertArrayOf(assertNodeType('Directive'))
      }
    }
  });

  type InputValueDefinitionNode = {
    kind: 'InputValueDefinition',
    loc?: Location,
    name: NameNode,
    type: TypeNode,
    defaultValue?: ?ValueNode,
    directives?: ?Array<DirectiveNode>
  };

  defineType('InputValueDefinition', {
    builder: ['name', 'type', 'defaultValue', 'directives'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      type: {
        validate: assertNodeType('Type')
      },
      defaultValue: {
        validate: assertNodeType('Value')
      },
      directives: {
        validate: assertArrayOf(assertNodeType('Directive'))
      }
    }
  });

  type InterfaceTypeDefinitionNode = {
    kind: 'InterfaceTypeDefinition',
    loc?: Location,
    name: NameNode,
    directives?: ?Array<DirectiveNode>,
    fields: Array<FieldDefinitionNode>
  };

  defineType('InterfaceTypeDefinition', {
    builder: ['name', 'fields', 'directives'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      directives: {
        validate: assertArrayOf(assertNodeType('Directive'))
      },
      fields: {
        validate: assertArrayOf(assertNodeType('FieldDefinition'))
      }
    }
  });

  type UnionTypeDefinitionNode = {
    kind: 'UnionTypeDefinition',
    loc?: Location,
    name: NameNode,
    directives?: ?Array<DirectiveNode>,
    types: Array<NamedTypeNode>
  };

  defineType('InputValueDefinition', {
    builder: ['name', 'type', 'directives'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      types: {
        validate: assertArrayOf(assertNodeType('NamedType'))
      },
      directives: {
        validate: assertArrayOf(assertNodeType('Directive'))
      }
    }
  });

  type EnumTypeDefinitionNode = {
    kind: 'EnumTypeDefinition',
    loc?: Location,
    name: NameNode,
    directives?: ?Array<DirectiveNode>,
    values: Array<EnumValueDefinitionNode>
  };

  defineType('EnumTypeDefinition', {
    builder: ['name', 'values', 'directives'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      values: {
        validate: assertArrayOf(assertNodeType('EnumValueDefinition'))
      },
      directives: {
        optional: true,
        validate: assertArrayOf(assertNodeType('Directive'))
      }
    }
  });

  type EnumValueDefinitionNode = {
    kind: 'EnumValueDefinition',
    loc?: Location,
    name: NameNode,
    directives?: ?Array<DirectiveNode>
  };

  defineType('EnumValueDefinition', {
    builder: ['name', 'directives'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      directives: {
        optional: true,
        validate: assertArrayOf(assertNodeType('Directive'))
      }
    }
  });

  type InputObjectTypeDefinitionNode = {
    kind: 'InputObjectTypeDefinition',
    loc?: Location,
    name: NameNode,
    directives?: ?Array<DirectiveNode>,
    fields: Array<InputValueDefinitionNode>
  };

  defineType('InterfaceTypeDefinition', {
    builder: ['name', 'fields', 'directives'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      directives: {
        optional: true,
        validate: assertArrayOf(assertNodeType('Directive'))
      },
      fields: {
        validate: assertArrayOf(assertNodeType('InputValueDefinition'))
      }
    }
  });

  type TypeExtensionDefinitionNode = {
    kind: 'TypeExtensionDefinition',
    loc?: Location,
    definition: ObjectTypeDefinitionNode
  };

  defineType('InterfaceTypeDefinition', {
    builder: ['definition'],
    fields: {
      definition: {
        validate: assertNodeType('ObjectTypeDefinition')
      }
    }
  });

  type DirectiveDefinitionNode = {
    kind: 'DirectiveDefinition',
    loc?: Location,
    name: NameNode,
    arguments?: ?Array<InputValueDefinitionNode>,
    locations: Array<NameNode>
  };

  defineType('DirectiveDefinition', {
    builder: ['name', 'locations', 'arguments'],
    fields: {
      name: {
        validate: assertNodeType('Name')
      },
      locations: {
        validate: assertArrayOf(assertNodeType('Name'))
      },
      arguments: {
        optional: true,
        validate: assertArrayOf(assertNodeType('InputValueDefinition'))
      }
    }
  });
};
