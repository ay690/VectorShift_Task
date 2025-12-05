// FilterNode.js - Filter node component with improved styling

import { Handle, Position } from 'reactflow';
import { useState } from 'react';

export const FilterNode = ({ id, data }) => {
  const [filterType, setFilterType] = useState(data?.filterType || 'text');
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [value, setValue] = useState(data?.value || '');

  const filterOptions = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' }
  ];

  const conditionOptions = {
    text: [
      { value: 'equals', label: 'Equals' },
      { value: 'contains', label: 'Contains' },
      { value: 'startsWith', label: 'Starts With' },
      { value: 'endsWith', label: 'Ends With' }
    ],
    number: [
      { value: 'equals', label: '=' },
      { value: 'greater', label: '>' },
      { value: 'less', label: '<' },
      { value: 'greaterOrEqual', label: '>=' },
      { value: 'lessOrEqual', label: '<=' },
      { value: 'notEqual', label: '≠' }
    ],
    date: [
      { value: 'before', label: 'Before' },
      { value: 'after', label: 'After' },
      { value: 'on', label: 'On' },
      { value: 'notOn', label: 'Not On' },
      { value: 'between', label: 'Between' }
    ]
  };

  const handleFilterTypeChange = (e) => {
    const newType = e.target.value;
    setFilterType(newType);
    // Reset condition when filter type changes
    setCondition(conditionOptions[newType][0].value);
  };

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  // Get the appropriate input type based on filter type
  const getInputType = () => {
    if (filterType === 'number') return 'number';
    if (filterType === 'date') return 'date';
    return 'text';
  };

  // Get the current condition options based on filter type
  const currentConditionOptions = conditionOptions[filterType] || [];

  return (
    <div className="w-56 bg-white rounded-lg border border-purple-100 shadow-sm overflow-hidden">
      {/* Node Header */}
      <div className="px-3 py-2 bg-gradient-to-r from-purple-50 to-white border-b border-gray-100">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-purple-100 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-700">Filter</h3>
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
        {/* Filter Type */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">Filter Type</label>
          <select
            value={filterType}
            onChange={handleFilterTypeChange}
            className="w-full text-xs p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Condition */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">Condition</label>
          <select
            value={condition}
            onChange={handleConditionChange}
            className="w-full text-xs p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
          >
            {currentConditionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Value Input */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            {filterType === 'date' ? 'Date' : 'Value'}
          </label>
          <input
            type={getInputType()}
            value={value}
            onChange={handleValueChange}
            className="w-full text-xs p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder={`Enter ${filterType}...`}
          />
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
