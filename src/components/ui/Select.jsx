import React, { forwardRef } from 'react';

/**
 * Select component for dropdown selections with accessibility features
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing inclusive options for gender identity selection
 * - SDG 10 (Reduced Inequalities): By implementing accessible form controls
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Select ID (required for associating with label)
 * @param {string} [props.label] - Select label
 * @param {Array} props.options - Array of option objects with value and label properties
 * @param {string} [props.placeholder] - Placeholder text when nothing is selected
 * @param {string} [props.helperText] - Helper text displayed below select
 * @param {string} [props.errorText] - Error text displayed when select has error
 * @param {boolean} [props.hasError=false] - Whether select has error
 * @param {boolean} [props.isDisabled=false] - Whether select is disabled
 * @param {boolean} [props.isRequired=false] - Whether select is required
 * @param {boolean} [props.isFullWidth=true] - Whether select should take full width
 * @param {boolean} [props.multiple=false] - Whether select allows multiple selections
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.onBlur] - Blur handler
 * @param {string|Array} [props.value] - Select value(s)
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.containerProps] - Props for the container div
 * @returns {React.Component} Select component
 */
const Select = forwardRef(({ 
  id,
  label,
  options = [],
  placeholder = 'Select an option',
  helperText,
  errorText,
  hasError = false,
  isDisabled = false,
  isRequired = false,
  isFullWidth = true,
  multiple = false,
  onChange,
  onBlur,
  value,
  className = '',
  containerProps = {},
  ...props 
}, ref) => {
  // Base styles
  const baseClasses = 'block rounded-md shadow-sm border-gray-300 focus:ring-primary-500 focus:border-primary-500';
  
  // Error styles
  const errorClasses = hasError 
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
    : '';
  
  // Disabled styles
  const disabledClasses = isDisabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : '';
  
  // Width styles
  const widthClasses = isFullWidth ? 'w-full' : '';
  
  return (
    <div className={containerProps.className} {...containerProps}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        ref={ref}
        id={id}
        disabled={isDisabled}
        required={isRequired}
        onChange={onChange}
        onBlur={onBlur}
        value={value ?? (multiple ? [] : '')}
        multiple={multiple}
        aria-invalid={hasError}
        aria-describedby={
          helperText ? `${id}-helper-text` : errorText ? `${id}-error-text` : undefined
        }
        className={`
          ${baseClasses}
          ${errorClasses}
          ${disabledClasses}
          ${widthClasses}
          ${className}
        `}
        {...props}
      >
        {!multiple && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {helperText && !hasError && (
        <p className="mt-1 text-sm text-gray-500" id={`${id}-helper-text`}>
          {helperText}
        </p>
      )}
      
      {errorText && hasError && (
        <p className="mt-1 text-sm text-red-600" id={`${id}-error-text`}>
          {errorText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select; 