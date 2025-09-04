import React from 'react';
import { Typography } from '../atoms/Typography';

export interface FormGroupProps {
  children: React.ReactNode;
  id?: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  id,
  label,
  description,
  error,
  required = false,
  className = '',
  labelClassName = '',
  descriptionClassName = '',
  errorClassName = '',
}) => {
  // Generate unique ID for elements if not provided
  const groupId = id || `form-group-${Math.random().toString(36).substring(2, 11)}`;
  
  return (
    <div className={`mb-6 ${className}`}>
      {label && (
        <label 
          htmlFor={groupId} 
          className={`block text-sm font-medium text-gray-800 mb-1 ${labelClassName}`}
        >
          {label}
          {required && <span className="ml-1 text-error">*</span>}
        </label>
      )}
      
      {description && (
        <Typography 
          variant="caption" 
          color="muted" 
          className={`mb-2 ${descriptionClassName}`}
        >
          {description}
        </Typography>
      )}
      
      {children}
      
      {error && (
        <p className={`mt-1 text-xs text-error ${errorClassName}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormGroup; 