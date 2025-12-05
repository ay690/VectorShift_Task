// inputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <div className="w-48 min-h-20 p-2 bg-white rounded-md border border-gray-300 shadow-sm flex flex-col">
      <div className="font-medium text-sm text-gray-700 mb-2 border-b border-gray-100 pb-1">
        Input Node
      </div>
      <div className="space-y-2">
        <div className="flex flex-col space-y-1">
          <label className="text-xs text-gray-600">Name</label>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="w-full text-xs p-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-xs text-gray-600">Type</label>
          <select 
            value={inputType} 
            onChange={handleTypeChange}
            className="w-full text-xs p-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        className="w-2.5 h-2.5 bg-blue-500 border-2 border-white rounded-full"
      />
    </div>
  );
}
