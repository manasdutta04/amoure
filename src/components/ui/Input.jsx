import React, { forwardRef } from 'react';

/**
 * Input component with support for different input types and accessibility features
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing inclusive form inputs for all users
 * - SDG 10 (Reduced Inequalities): By implementing accessible form controls with ARIA labels
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Input ID (required for associating with label)
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.label] - Input label
 * @param {string} [props.placeholder] - Input placeholder
 * @param {string} [props.helperText] - Helper text displayed below input
 * @param {string} [props.errorText] - Error text displayed when input has error
 * @param {boolean} [props.hasError=false] - Whether input has error
 * @param {boolean} [props.isDisabled=false] - Whether input is disabled
 * @param {boolean} [props.isRequired=false] - Whether input is required
 * @param {boolean} [props.isFullWidth=true] - Whether input should take full width
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.onBlur] - Blur handler
 * @param {string} [props.value] - Input value
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.containerProps] - Props for the container div
 * @returns {React.Component} Input component
 */
const Input = forwardRef(({ 
  id,
  type = 'text', 
  label,
  placeholder,
  helperText,
  errorText,
  hasError = false,
  isDisabled = false,
  isRequired = false,
  isFullWidth = true,
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
      
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={isDisabled}
        required={isRequired}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
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
      />
      
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

Input.displayName = 'Input';

export default Input; 