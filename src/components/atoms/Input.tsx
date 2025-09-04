import React, { forwardRef } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
  fullWidth?: boolean;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    label,
    hint,
    error,
    startIcon,
    endIcon,
    variant = 'default',
    fullWidth = false,
    className = '',
    containerClassName = '',
    disabled = false,
    ...props
  },
  ref
) => {
  // Determine classes based on variant and state
  const getContainerClasses = () => {
    const baseClasses = 'relative rounded transition-all';
    const widthClasses = fullWidth ? 'w-full' : '';
    
    return `${baseClasses} ${widthClasses} ${containerClassName}`;
  };

  const getLabelClasses = () => {
    const baseClasses = 'block text-sm font-medium mb-1';
    
    if (error) return `${baseClasses} text-error`;
    if (disabled) return `${baseClasses} text-gray-400`;
    return `${baseClasses} text-gray-700`;
  };

  const getInputClasses = () => {
    const baseClasses = 'w-full rounded transition-all focus:outline-none';
    
    // Determine padding based on presence of icons
    let paddingClasses = 'py-2';
    if (startIcon && endIcon) {
      paddingClasses += ' pl-10 pr-10';
    } else if (startIcon) {
      paddingClasses += ' pl-10 pr-3';
    } else if (endIcon) {
      paddingClasses += ' pl-3 pr-10';
    } else {
      paddingClasses += ' px-3';
    }
    
    // Styling based on variant
    let variantClasses = '';
    switch (variant) {
      case 'filled':
        variantClasses = error
          ? 'bg-red-50 border border-error text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-error'
          : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-silver-dark';
        break;
      case 'outlined':
        variantClasses = error
          ? 'bg-white border-2 border-error text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-error'
          : 'bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-silver-dark';
        break;
      default: // default variant
        variantClasses = error
          ? 'bg-white border border-error text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-error'
          : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-silver-dark';
    }
    
    // Disabled state
    if (disabled) {
      variantClasses = 'bg-gray-100 border border-gray-200 text-gray-400 placeholder-gray-400 cursor-not-allowed';
    }
    
    return `${baseClasses} ${paddingClasses} ${variantClasses} ${className}`;
  };

  return (
    <div className={getContainerClasses()}>
      {label && (
        <label className={getLabelClasses()}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {startIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {startIcon}
          </div>
        )}
        
        <input
          ref={ref}
          disabled={disabled}
          className={getInputClasses()}
          {...props}
        />
        
        {endIcon && !error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {endIcon}
          </div>
        )}
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationTriangleIcon className="h-5 w-5 text-error" />
          </div>
        )}
      </div>
      
      {(hint || error) && (
        <p className={`mt-1 text-xs ${error ? 'text-error' : 'text-gray-500'}`}>
          {error || hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 