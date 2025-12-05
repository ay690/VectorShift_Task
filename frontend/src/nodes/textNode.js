// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const nodeRef = useRef(null);

  // Extract variables from text using {{variable}} pattern
  const extractVariables = (text) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = text.match(regex) || [];
    const uniqueVars = [...new Set(matches.map(match => match.slice(2, -2)))];
    return uniqueVars;
  };

  // Auto-resize textarea and node
  const updateNodeSize = () => {
    if (!textareaRef.current || !nodeRef.current) return;
    
    // Reset height to auto to get the correct scrollHeight
    textareaRef.current.style.height = 'auto';
    
    // Calculate new height (min 80px, or content height + padding)
    const newHeight = Math.max(80, textareaRef.current.scrollHeight + 40);
    
    // Calculate new width (min 200px, or content width + padding)
    textareaRef.current.style.width = 'auto';
    const newWidth = Math.max(200, textareaRef.current.scrollWidth + 40);
    
    // Apply new dimensions
    nodeRef.current.style.width = `${newWidth}px`;
    nodeRef.current.style.height = `${newHeight}px`;
    textareaRef.current.style.height = `${newHeight - 40}px`; // Account for padding
    textareaRef.current.style.width = '100%';
  };

  // Update variables when text changes
  useEffect(() => {
    const newVariables = extractVariables(currText);
    setVariables(newVariables);
  }, [currText]);

  // Update node size when text or variables change
  useEffect(() => {
    updateNodeSize();
    // Add resize observer to handle window resizing
    const resizeObserver = new ResizeObserver(updateNodeSize);
    if (nodeRef.current) {
      resizeObserver.observe(nodeRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [currText, variables]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Calculate handle positions based on number of variables
  const getHandlePosition = (index) => {
    const total = variables.length + 1; // +1 for the output handle
    return `${((index + 1) * 100) / (total + 1)}%`;
  };

  return (
    <div 
      ref={nodeRef}
      className="relative bg-white rounded-lg border border-blue-100 shadow-sm overflow-hidden transition-all duration-200"
      style={{
        minWidth: '200px',
        minHeight: '80px',
        background: variables.length > 0 ? '#f8fafc' : 'white',
      }}
    >
      {/* Node Header */}
      <div className="px-3 pt-2 pb-1 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded bg-blue-100 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-700">Text</h3>
        </div>
      </div>

      {/* Left Handles for Variables */}
      {variables.map((variable, index) => (
        <Handle
          key={`${id}-${variable}-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          className="w-2.5 h-2.5 bg-blue-500 border-2 border-white"
          style={{
            top: getHandlePosition(index),
            zIndex: 10
          }}
        />
      ))}

      {/* Textarea Content */}
      <div className="p-3">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            className="w-full p-2 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden bg-white/80"
            style={{
              minHeight: '40px',
              lineHeight: '1.4',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease-in-out'
            }}
            placeholder="Type here... {{variable}} for variables"
          />
          
          {/* Variable indicators */}
          {variables.length > 0 && (
            <div className="absolute -top-5 left-0 right-0 flex flex-wrap gap-1 mb-1">
              {variables.map((variable, index) => (
                <span 
                  key={`var-${index}`}
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100"
                >
                  <svg className="w-3 h-3 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  {variable}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-2.5 h-2.5 bg-green-500 border-2 border-white"
        style={{
          top: variables.length > 0 ? getHandlePosition(variables.length) : '50%',
          zIndex: 10
        }}
      />
    </div>
  );
};
