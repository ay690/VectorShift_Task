// LoopNode.js - Example node using BaseNode abstraction

import { BaseNode } from './BaseNode';

export const LoopNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: 'left', name: 'input' },
    { type: 'source', position: 'right', name: 'output' },
    { type: 'source', position: 'bottom', name: 'loop', style: { left: '50%' } }
  ];

  const fields = [
    {
      name: 'iterations',
      type: 'text',
      label: 'Iterations',
      defaultValue: '3',
      placeholder: 'Number of iterations'
    },
    {
      name: 'loopType',
      type: 'select',
      label: 'Loop Type',
      defaultValue: 'for',
      options: [
        { value: 'for', label: 'For Loop' },
        { value: 'while', label: 'While Loop' },
        { value: 'map', label: 'Map' }
      ]
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      type="loop"
      title="Loop"
      handles={handles}
      fields={fields}
      style={{ height: 100 }}
    />
  );
};
