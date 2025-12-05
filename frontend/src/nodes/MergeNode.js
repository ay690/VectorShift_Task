// MergeNode.js - Example node using BaseNode abstraction

import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: 'left', name: 'input1', style: { top: '25%' } },
    { type: 'target', position: 'left', name: 'input2', style: { top: '75%' } },
    { type: 'source', position: 'right', name: 'output' }
  ];

  const fields = [
    {
      name: 'mergeType',
      type: 'select',
      label: 'Merge Type',
      defaultValue: 'concat',
      options: [
        { value: 'concat', label: 'Concatenate' },
        { value: 'add', label: 'Add' },
        { value: 'multiply', label: 'Multiply' },
        { value: 'combine', label: 'Combine' }
      ]
    },
    {
      name: 'separator',
      type: 'text',
      label: 'Separator',
      defaultValue: ' ',
      placeholder: 'Separator for concatenation'
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      type="merge"
      title="Merge"
      handles={handles}
      fields={fields}
      style={{ height: 100 }}
    />
  );
};
