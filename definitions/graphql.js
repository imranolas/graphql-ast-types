/* eslint-disable no-use-before-define */

import defineType, {
  assertNodeType,
  assertValueType,
  assertEach,
  assertOneOf,
  chain
} from './index';

type Token = any;
type Source = any;

/**
 * Contains a range of UTF-8 character offsets and token references that
 * identify the region of the source from which the AST derived.
 */
export type Location = {
  /**
   * The character offset at which this Node begins.
   */
  start: number,

  /**
   * The character offset at which this Node ends.
   */
  end: number,

  /**
   * The Token at which this Node begins.
   */
  startToken: Token,

  /**
   * The Token at which this Node ends.
   */
  endToken: Token,

  /**
   * The Source document the AST represents.
   */
  source: Source
};

/**
 * The list of all possible AST node types.
 */
export type ASTNode =
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

export type NameNode = {
  kind: 'Name',
  loc?: Location,
  value: string
};

defineType('Name', {
  builder: ['value']
});

// Document

export type DocumentNode = {
  kind: 'Document',
  loc?: Location,
  definitions: Array<DefinitionNode>
};

defineType('Document', {
  builder: ['definitions'],
  fields: {
    definitions: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Definition')))
    }
  }
});

export type DefinitionNode =
  | OperationDefinitionNode
  | FragmentDefinitionNode
  | TypeSystemDefinitionNode; // experimental non-spec addition.

export type OperationDefinitionNode = {
  kind: 'OperationDefinition',
  loc?: Location,
  operation: OperationTypeNode,
  name?: ?NameNode,
  variableDefinitions?: ?Array<VariableDefinitionNode>,
  directives?: ?Array<DirectiveNode>,
  selectionSet: SelectionSetNode
};

defineType('OperationDefinition', {
  builder: ['operation', 'name', 'variableDefinitions', 'directives', 'selectionSet'],
  fields: {
    operation: {
      validate: assertValueType('string')
    },
    name: {
      validate: assertNodeType('Name'),
      optional: true
    }
  },
  alias: ['DefinitionNode']
});

// Note: subscription is an experimental non-spec addition.
export type OperationTypeNode = 'query' | 'mutation' | 'subscription';

export type VariableDefinitionNode = {
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

export type VariableNode = {
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

export type SelectionSetNode = {
  kind: 'SelectionSet',
  loc?: Location,
  selections: Array<SelectionNode>
};

defineType('SelectionSet', {
  builder: ['selections'],
  fields: {
    selections: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Selection')))
    }
  }
});

export type SelectionNode = FieldNode | FragmentSpreadNode | InlineFragmentNode;

export type FieldNode = {
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
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Argument'))),
      optional: true
    },
    directives: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive'))),
      optional: true
    },
    selectionSet: {
      validate: assertNodeType('SelectionSet'),
      optional: true
    }
  }
});

export type ArgumentNode = {
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

export type FragmentSpreadNode = {
  kind: 'FragmentSpread',
  loc?: Location,
  name: NameNode,
  directives?: ?Array<DirectiveNode>
};

defineType('FragmentSpread', {
  builder: ['name'],
  fields: {
    directives: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive'))),
      optional: true
    }
  }
});

export type InlineFragmentNode = {
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
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive')))
    },
    typeCondition: {
      optional: true,
      validate: assertNodeType('NamedType')
    },
    selectionSet: {
      validate: assertNodeType('SelectionSet')
    }
  }
});

export type FragmentDefinitionNode = {
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
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive')))
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
  }
});

// Values

export type ValueNode =
  | VariableNode
  | IntValueNode
  | FloatValueNode
  | StringValueNode
  | BooleanValueNode
  | NullValueNode
  | EnumValueNode
  | ListValueNode
  | ObjectValueNode;

export type IntValueNode = {
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

export type FloatValueNode = {
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

export type StringValueNode = {
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

export type BooleanValueNode = {
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

export type NullValueNode = {
  kind: 'NullValue',
  loc?: Location
};

defineType('NullValue', {
  aliases: ['Value']
});

export type EnumValueNode = {
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

export type ListValueNode = {
  kind: 'ListValue',
  loc?: Location,
  values: Array<ValueNode>
};

defineType('ListValue', {
  builder: ['value'],
  fields: {
    value: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Value')))
    }
  },
  aliases: ['Value']
});

export type ObjectValueNode = {
  kind: 'ObjectValue',
  loc?: Location,
  fields: Array<ObjectFieldNode>
};

defineType('ObjectValue', {
  builder: ['fields'],
  fields: {
    fields: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('ObjectField')))
    }
  },
  aliases: ['Value']
});

export type ObjectFieldNode = {
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

export type DirectiveNode = {
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
      validate: chain(assertValueType('array'), assertNodeType('Argument'))
    }
  }
});

// Type Reference

export type TypeNode = NamedTypeNode | ListTypeNode | NonNullTypeNode;

export type NamedTypeNode = {
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

export type ListTypeNode = {
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

export type NonNullTypeNode = {
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

export type TypeSystemDefinitionNode =
  | SchemaDefinitionNode
  | TypeDefinitionNode
  | TypeExtensionDefinitionNode
  | DirectiveDefinitionNode;

export type SchemaDefinitionNode = {
  kind: 'SchemaDefinition',
  loc?: Location,
  directives: Array<DirectiveNode>,
  operationTypes: Array<OperationTypeDefinitionNode>
};

defineType('SchemaDefinition', {
  builder: ['directives', 'operationTypes'],
  fields: {
    directives: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive')))
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

export type OperationTypeDefinitionNode = {
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

export type TypeDefinitionNode =
  | ScalarTypeDefinitionNode
  | ObjectTypeDefinitionNode
  | InterfaceTypeDefinitionNode
  | UnionTypeDefinitionNode
  | EnumTypeDefinitionNode
  | InputObjectTypeDefinitionNode;

export type ScalarTypeDefinitionNode = {
  kind: 'ScalarTypeDefinition',
  loc?: Location,
  name: NameNode,
  directives?: ?Array<DirectiveNode>
};

defineType('ScalarTypeDefinition', {
  buider: ['name', 'directives'],
  fields: {
    name: {
      validate: assertNodeType('Name')
    },
    directives: {
      optional: true,
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive')))
    }
  }
});

export type ObjectTypeDefinitionNode = {
  kind: 'ObjectTypeDefinition',
  loc?: Location,
  name: NameNode,
  interfaces?: ?Array<NamedTypeNode>,
  directives?: ?Array<DirectiveNode>,
  fields: Array<FieldDefinitionNode>
};

defineType('ObjectTypeDefinition', {
  buider: ['name', 'fields', 'directives', 'interfaces'],
  fields: {
    name: {
      validate: assertNodeType('Name')
    },
    directives: {
      optional: true,
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive')))
    },
    interfaces: {
      optional: true,
      validate: chain(assertValueType('array'), assertEach(assertNodeType('NamedType')))
    },
    fields: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('FieldDefinition')))
    }
  }
});

export type FieldDefinitionNode = {
  kind: 'FieldDefinition',
  loc?: Location,
  name: NameNode,
  arguments: Array<InputValueDefinitionNode>,
  type: TypeNode,
  directives?: ?Array<DirectiveNode>
};

defineType('FieldDefinition', {
  buider: ['name', 'arguments', 'type', 'directives'],
  fields: {
    name: {
      validate: assertNodeType('Name')
    },
    arguments: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('InputValueDefinition')))
    },
    type: {
      validate: assertNodeType('Type')
    },
    directives: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive')))
    }
  }
});

export type InputValueDefinitionNode = {
  kind: 'InputValueDefinition',
  loc?: Location,
  name: NameNode,
  type: TypeNode,
  defaultValue?: ?ValueNode,
  directives?: ?Array<DirectiveNode>
};

defineType('InputValueDefinition', {
  buider: ['name', 'type', 'defaultValue', 'directives'],
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
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive')))
    }
  }
});

export type InterfaceTypeDefinitionNode = {
  kind: 'InterfaceTypeDefinition',
  loc?: Location,
  name: NameNode,
  directives?: ?Array<DirectiveNode>,
  fields: Array<FieldDefinitionNode>
};

defineType('InterfaceTypeDefinition', {
  buider: ['name', 'fields', 'directives'],
  fields: {
    name: {
      validate: assertNodeType('Name')
    },
    directives: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive')))
    },
    fields: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('FieldDefinition')))
    }
  }
});

export type UnionTypeDefinitionNode = {
  kind: 'UnionTypeDefinition',
  loc?: Location,
  name: NameNode,
  directives?: ?Array<DirectiveNode>,
  types: Array<NamedTypeNode>
};

defineType('InputValueDefinition', {
  buider: ['name', 'type', 'directives'],
  fields: {
    name: {
      validate: assertNodeType('Name')
    },
    types: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('NamedType')))
    },
    directives: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive')))
    }
  }
});

export type EnumTypeDefinitionNode = {
  kind: 'EnumTypeDefinition',
  loc?: Location,
  name: NameNode,
  directives?: ?Array<DirectiveNode>,
  values: Array<EnumValueDefinitionNode>
};

defineType('EnumTypeDefinition', {
  buider: ['name', 'values', 'directives'],
  fields: {
    name: {
      validate: assertNodeType('Name')
    },
    values: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('EnumValueDefinition')))
    },
    directives: {
      optional: true,
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive')))
    }
  }
});

export type EnumValueDefinitionNode = {
  kind: 'EnumValueDefinition',
  loc?: Location,
  name: NameNode,
  directives?: ?Array<DirectiveNode>
};

defineType('EnumValueDefinition', {
  buider: ['name', 'directives'],
  fields: {
    name: {
      validate: assertNodeType('Name')
    },
    directives: {
      optional: true,
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive')))
    }
  }
});

export type InputObjectTypeDefinitionNode = {
  kind: 'InputObjectTypeDefinition',
  loc?: Location,
  name: NameNode,
  directives?: ?Array<DirectiveNode>,
  fields: Array<InputValueDefinitionNode>
};

defineType('InterfaceTypeDefinition', {
  buider: ['name', 'fields', 'directives'],
  fields: {
    name: {
      validate: assertNodeType('Name')
    },
    directives: {
      optional: true,
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Directive')))
    },
    fields: {
      validate: chain(assertValueType('array'), assertEach(assertNodeType('InputValueDefinition')))
    }
  }
});

export type TypeExtensionDefinitionNode = {
  kind: 'TypeExtensionDefinition',
  loc?: Location,
  definition: ObjectTypeDefinitionNode
};

defineType('InterfaceTypeDefinition', {
  buider: ['definition'],
  fields: {
    definition: {
      validate: assertNodeType('ObjectTypeDefinition')
    }
  }
});

export type DirectiveDefinitionNode = {
  kind: 'DirectiveDefinition',
  loc?: Location,
  name: NameNode,
  arguments?: ?Array<InputValueDefinitionNode>,
  locations: Array<NameNode>
};

defineType('DirectiveDefinition', {
  buider: ['name', 'locations', 'arguments'],
  fields: {
    name: {
      validate: assertNodeType('Name')
    },
    locations: {
      optional: true,
      validate: chain(assertValueType('array'), assertEach(assertNodeType('Name')))
    },
    arguments: {
      optional: true,
      validate: chain(assertValueType('array'), assertEach(assertNodeType('InputValueDefinition')))
    }
  }
});
