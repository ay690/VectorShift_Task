// llmNode.js

import { Handle, Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  return (
    <div className="w-48 min-h-24 p-3 bg-white rounded-md border border-purple-200 shadow-sm flex flex-col">
      {/* Left Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-system`}
        className="w-2.5 h-2.5 bg-blue-500 border-2 border-white"
        style={{ top: '30%' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-prompt`}
        className="w-2.5 h-2.5 bg-blue-500 border-2 border-white"
        style={{ top: '70%' }}
      />
      
      {/* Node Header */}
      <div className="flex items-center mb-2">
        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
          <span className="text-purple-600 text-xs font-bold">AI</span>
        </div>
        <h3 className="font-medium text-sm text-gray-800">LLM Node</h3>
      </div>
      
      {/* Node Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-xs text-gray-600 bg-purple-50 p-2 rounded">
          Configure your LLM settings
        </div>
      </div>
      
      {/* Right Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-response`}
        className="w-2.5 h-2.5 bg-green-500 border-2 border-white"
      />
    </div>
  );
}
