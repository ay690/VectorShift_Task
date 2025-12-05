// ConditionNode.js - Example node using BaseNode abstraction

import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: 'left', name: 'input' },
    { type: 'source', position: 'right', name: 'true', style: { top: '25%' } },
    { type: 'source', position: 'right', name: 'false', style: { top: '75%' } }
  ];

  const fields = [
    {
      name: 'operator',
      type: 'select',
      label: 'Operator',
      defaultValue: '>',
      options: [
        { value: '>', label: '>' },
        { value: '<', label: '<' },
        { value: '==', label: '==' },
        { value: '!=', label: '!=' },
        { value: '>=', label: '>=' },
        { value: '<=', label: '<=' }
      ]
    },
    {
      name: 'value',
      type: 'text',
      label: 'Value',
      defaultValue: '0',
      placeholder: 'Enter comparison value'
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      type="condition"
      title="Condition"
      handles={handles}
      fields={fields}
      style={{ height: 100 }}
    />
  );
};
