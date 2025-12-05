// BaseNode.js - Reusable node abstraction

import { useState } from 'react';
import { Handle } from 'reactflow';

export const BaseNode = ({ 
  id, 
  data, 
  type, 
  title, 
  handles = [], 
  fields = [], 
  children,
  className = "",
  style = {}
}) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    return initialValues;
  });

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const defaultStyle = {
    width: 200,
    height: 80,
    border: '1px solid #1a1a1a',
    borderRadius: '8px',
    background: '#ffffff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    padding: '12px',
    minWidth: '150px',
    minHeight: '60px',
    ...style
  };

  const renderField = (field) => {
    const value = fieldValues[field.name];
    
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
          />
        );
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
          >
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded resize-none"
            rows={field.rows || 2}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={defaultStyle} className={`base-node ${className}`}>
      {/* Render handles */}
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id || `${id}-${handle.name || index}`}
          style={handle.style}
          className={handle.className}
        />
      ))}
      
      {/* Node header */}
      <div className="mb-2 text-sm font-semibold text-gray-800">
        {title}
      </div>
      
      {/* Render fields */}
      {fields.map((field, index) => (
        <div key={index} className="mb-2">
          {field.label && (
            <label className="block mb-1 text-xs text-gray-600">
              {field.label}:
            </label>
          )}
          {renderField(field)}
        </div>
      ))}
      
      {/* Render custom children */}
      {children}
    </div>
  );
};
