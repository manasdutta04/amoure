import React, { forwardRef } from 'react';

/**
 * TextArea component for multi-line text input with accessibility features
 * 
 * Supports:
 * - SDG 5 (Gender Equality): By providing inclusive text areas for all users to express themselves
 * - SDG 10 (Reduced Inequalities): By implementing accessible text areas with proper ARIA labels
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - TextArea ID (required for associating with label)
 * @param {string} [props.label] - TextArea label
 * @param {string} [props.placeholder] - TextArea placeholder
 * @param {string} [props.helperText] - Helper text displayed below textarea
 * @param {string} [props.errorText] - Error text displayed when textarea has error
 * @param {boolean} [props.hasError=false] - Whether textarea has error
 * @param {boolean} [props.isDisabled=false] - Whether textarea is disabled
 * @param {boolean} [props.isRequired=false] - Whether textarea is required
 * @param {boolean} [props.isFullWidth=true] - Whether textarea should take full width
 * @param {number} [props.rows=4] - Number of rows to display
 * @param {Function} [props.onChange] - Change handler
 * @param {Function} [props.onBlur] - Blur handler
 * @param {string} [props.value] - TextArea value
 * @param {string} [props.className] - Additional CSS classes
 * @param {Object} [props.containerProps] - Props for the container div
 * @returns {React.Component} TextArea component
 */
const TextArea = forwardRef(({ 
  id,
  label,
  placeholder,
  helperText,
  errorText,
  hasError = false,
  isDisabled = false,
  isRequired = false,
  isFullWidth = true,
  rows = 4,
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
      
      <textarea
        ref={ref}
        id={id}
        placeholder={placeholder}
        disabled={isDisabled}
        required={isRequired}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        rows={rows}
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

TextArea.displayName = 'TextArea';

export default TextArea; 