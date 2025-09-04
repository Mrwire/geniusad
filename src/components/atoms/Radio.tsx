import React from 'react';

export interface RadioProps {
  label?: string;
  hint?: string;
  error?: string;
  color?: 'default' | 'silver' | 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  value?: string;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  hint,
  error,
  color = 'default',
  className = '',
  disabled = false,
  checked = false,
  onChange,
  name,
  id,
  value,
  ...props
}) => {
  // Get color classes based on the color prop
  const getColorClasses = () => {
    if (disabled) return 'text-gray-300 border-gray-300';
    if (error) return 'text-error border-error';
    
    switch (color) {
      case 'silver':
        return 'text-silver-dark focus:ring-silver-dark';
      case 'mps':
        return 'text-mps focus:ring-mps';
      case 'labrigad':
        return 'text-labrigad focus:ring-labrigad';
      case 'gamius':
        return 'text-gamius focus:ring-gamius';
      case 'moujeleell':
        return 'text-moujeleell focus:ring-moujeleell';
      default:
        return 'text-gray-800 focus:ring-gray-800';
    }
  };
  
  const getLabelClasses = () => {
    const baseClasses = 'ml-2 text-sm font-medium';
    
    if (error) return `${baseClasses} text-error`;
    if (disabled) return `${baseClasses} text-gray-400`;
    return `${baseClasses} text-gray-700`;
  };
  
  return (
    <div className={`flex ${className}`}>
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            type="radio"
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            name={name}
            id={id}
            value={value}
            className={`h-5 w-5 rounded-full border-2 focus:ring-2 focus:ring-offset-2 ${getColorClasses()}`}
            {...props}
          />
        </div>
        <div className="ml-2">
          {label && (
            <label htmlFor={id} className={getLabelClasses()}>
              {label}
            </label>
          )}
          {(hint || error) && (
            <p className={`mt-1 text-xs ${error ? 'text-error' : 'text-gray-500'}`}>
              {error || hint}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Radio; 