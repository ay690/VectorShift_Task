// BaseNode.js - Reusable node abstraction

import { useState, useEffect } from 'react';
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
  style = {},
  onDataChange = () => {}
}) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach(field => {
      initialValues[field.name] = data?.[field.name] || field.defaultValue || '';
    });
    return initialValues;
  });

  // Notify parent when field values change
  useEffect(() => {
    onDataChange(fieldValues);
  }, [fieldValues, onDataChange]);

  const handleFieldChange = (fieldName, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const defaultStyle = {
    width: 220,
    minHeight: 60,
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    background: '#ffffff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    padding: '12px',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s ease',
    '&:hover': {
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    ...style
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    paddingBottom: '8px',
    borderBottom: '1px solid #e2e8f0'
  };

  const titleStyle = {
    margin: 0,
    fontSize: '14px',
    fontWeight: 600,
    color: '#1a202c'
  };

  const typeBadgeStyle = {
    fontSize: '10px',
    padding: '2px 6px',
    borderRadius: '10px',
    background: '#e2e8f0',
    color: '#4a5568',
    fontWeight: 500
  };

  const fieldContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginTop: '8px'
  };

  const fieldLabelStyle = {
    fontSize: '12px',
    color: '#4a5568',
    marginBottom: '2px',
    fontWeight: 500
  };

  const renderField = (field) => {
    const value = fieldValues[field.name] || '';
    const fieldId = `${id}-${field.name}`;
    
    const commonProps = {
      id: fieldId,
      value: value,
      onChange: (e) => handleFieldChange(field.name, e.target.value),
      placeholder: field.placeholder,
      className: "w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all",
      style: {
        backgroundColor: field.disabled ? '#f7fafc' : '#fff',
        cursor: field.disabled ? 'not-allowed' : 'auto',
        opacity: field.disabled ? 0.7 : 1
      },
      disabled: field.disabled,
      'aria-label': field.label || field.name,
      'aria-required': field.required || false
    };

    switch (field.type) {
      case 'text':
        return (
          <div key={field.name}>
            {field.label && <label htmlFor={fieldId} style={fieldLabelStyle}>{field.label}</label>}
            <input
              type="text"
              {...commonProps}
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.name}>
            {field.label && <label htmlFor={fieldId} style={fieldLabelStyle}>{field.label}</label>}
            <select
              {...commonProps}
              className={"w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all " + 
                (field.disabled ? 'bg-gray-100' : 'bg-white')}
            >
              {field.placeholder && <option value="">{field.placeholder}</option>}
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      case 'textarea':
        return (
          <div key={field.name}>
            {field.label && <label htmlFor={fieldId} style={fieldLabelStyle}>{field.label}</label>}
            <textarea
              {...commonProps}
              rows={field.rows || 3}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              style={{
                minHeight: `${(field.rows || 3) * 24}px`,
                resize: field.resize ? 'vertical' : 'none',
                ...commonProps.style
              }}
            />
          </div>
        );
      case 'number':
        return (
          <div key={field.name}>
            {field.label && <label htmlFor={fieldId} style={fieldLabelStyle}>{field.label}</label>}
            <input
              type="number"
              min={field.min}
              max={field.max}
              step={field.step || 1}
              {...commonProps}
            />
          </div>
        );
      case 'switch':
        return (
          <div key={field.name} className="flex items-center justify-between">
            <label htmlFor={fieldId} style={{...fieldLabelStyle, marginBottom: 0, flex: 1}}>
              {field.label}
            </label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                id={fieldId}
                checked={!!value}
                onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                style={{
                  right: value ? '0' : '1rem',
                  transition: 'all 0.2s',
                  top: '2px'
                }}
              />
              <label
                htmlFor={fieldId}
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      style={defaultStyle} 
      className={`base-node ${className} group`}
      data-node-type={type}
    >
      {/* Node Header */}
      <div style={headerStyle} className="node-header">
        <h3 style={titleStyle}>{title || type}</h3>
        <span style={typeBadgeStyle}>{type}</span>
      </div>

      {/* Node Content */}
      <div className="node-content">
        {children || (
          <div style={fieldContainerStyle}>
            {fields.map((field) => renderField(field))}
          </div>
        )}
      </div>

      {/* Node Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={handle.id || `${id}-${handle.name || index}`}
          type={handle.type || 'source'}
          position={handle.position || 'right'}
          id={handle.id || `${id}-${handle.name || index}`}
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: handle.type === 'target' ? '#ff6b6b' : '#4CAF50',
            border: '2px solid #fff',
            borderRadius: '50%',
            ...handle.style
          }}
          className={`${handle.className || ''} opacity-0 group-hover:opacity-100 transition-opacity`}
          isConnectable={handle.connectable !== false}
        />
      ))}
    </div>
  );
};
