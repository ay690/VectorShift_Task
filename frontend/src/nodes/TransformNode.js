// TransformNode.js - Enhanced transform node with improved UI/UX

import { Handle, Position } from 'reactflow';
import { useState } from 'react';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');
  const [customFunction, setCustomFunction] = useState(data?.customFunction || '');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const transformOptions = [
    { value: 'uppercase', label: 'UPPERCASE', icon: 'A → A' },
    { value: 'lowercase', label: 'lowercase', icon: 'A → a' },
    { value: 'capitalize', label: 'Capitalize Words', icon: 'Aa' },
    { value: 'reverse', label: 'Reverse Text', icon: '⇄' },
    { value: 'trim', label: 'Trim Whitespace', icon: '␣' },
    { value: 'custom', label: 'Custom Function', icon: 'ƒ' }
  ];

  const handleTransformChange = (e) => {
    const value = e.target.value;
    setTransformType(value);
    setShowCustomInput(value === 'custom');
  };

  const handleCustomFunctionChange = (e) => {
    setCustomFunction(e.target.value);
  };

  const getPreviewText = () => {
    const input = "Example text";
    switch(transformType) {
      case 'uppercase':
        return input.toUpperCase();
      case 'lowercase':
        return input.toLowerCase();
      case 'capitalize':
        return input.split(' ').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ).join(' ');
      case 'reverse':
        return input.split('').reverse().join('');
      case 'trim':
        return input.trim();
      case 'custom':
        return customFunction 
          ? `Custom: ${customFunction}(input)` 
          : 'Define your function';
      default:
        return input;
    }
  };

  return (
    <div className="w-56 overflow-hidden bg-white border border-blue-100 rounded-lg shadow-sm">
      {/* Node Header */}
      <div className="px-3 py-2 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-5 h-5 mr-2 bg-blue-100 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-700">Transform</h3>
        </div>
      </div>

      {/* Left Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        className="w-2.5 h-2.5 bg-blue-500 border-2 border-white"
      />

      {/* Node Content */}
      <div className="p-3 space-y-3">
        {/* Transform Type Selector */}
        <div className="space-y-2">
          <label className="block mb-1 text-xs font-medium text-gray-600">Transform</label>
          <select
            value={transformType}
            onChange={handleTransformChange}
            className="w-full p-2 text-xs bg-white border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {transformOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Function Input (Conditional) */}
        {showCustomInput && (
          <div className="space-y-1">
            <label className="block mb-1 text-xs font-medium text-gray-600">Custom Function</label>
            <input
              type="text"
              value={customFunction}
              onChange={handleCustomFunctionChange}
              placeholder="e.g., (text) => text.toUpperCase()"
              className="w-full p-2 text-xs border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Preview Section */}
        <div className="pt-2 space-y-1 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Preview:</span>
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">
              {transformOptions.find(opt => opt.value === transformType)?.icon || '↻'}
            </span>
          </div>
          <div className="p-2 overflow-x-auto font-mono text-xs text-gray-600 border border-gray-100 rounded bg-gray-50">
            {getPreviewText()}
          </div>
        </div>
      </div>

      {/* Right Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-2.5 h-2.5 bg-green-500 border-2 border-white"
      />
    </div>
  );
};