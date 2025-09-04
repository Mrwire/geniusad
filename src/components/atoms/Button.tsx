import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'glass';
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the button takes full width of its container
   */
  fullWidth?: boolean;
  /**
   * Optional subsidiary color theme
   */
  subsidiary?: 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
  /**
   * Whether the button is in loading state
   */
  isLoading?: boolean;
  /**
   * Button children
   */
  children: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 * Apple-inspired with subtle animations and tactile feedback
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  subsidiary,
  isLoading = false,
  className = '',
  children,
  disabled,
  'aria-label': ariaLabel,
  ...props
}, ref) => {
  // Base classes with enhanced transitions for Apple-like feel
  const baseClasses = 'font-heading font-bold inline-flex items-center justify-center transition-all duration-400 ease-apple relative overflow-hidden select-none';
  
  // Size classes with improved spacing and proportions
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-sm rounded-full',
    md: 'px-6 py-2.5 text-base rounded-full',
    lg: 'px-8 py-3.5 text-lg rounded-full',
  };
  
  // Variant classes based on variant type with Apple-inspired styles
  const getVariantClasses = () => {
    // Special handling for subsidiary colors
    const subsidiaryBg = subsidiary ? `bg-${subsidiary}` : '';
    const subsidiaryHover = subsidiary ? `hover:bg-${subsidiary}-dark` : '';
    const subsidiaryText = subsidiary ? 'text-white' : '';
    const subsidiaryBorder = subsidiary ? `border-${subsidiary}` : '';
    
    switch (variant) {
      case 'primary':
        if (subsidiary) {
          return `${subsidiaryBg} ${subsidiaryText} ${subsidiaryHover} active:scale-[0.98] shadow-sm`;
        }
        return 'bg-black text-white hover:bg-gray-800 active:scale-[0.98] shadow-sm';
      case 'secondary':
        if (subsidiary) {
          return `bg-white text-${subsidiary} border border-${subsidiary} hover:bg-gray-50 active:scale-[0.98]`;
        }
        return 'bg-white text-black border border-black hover:bg-gray-50 active:scale-[0.98]';
      case 'tertiary':
        if (subsidiary) {
          return `bg-transparent text-${subsidiary} hover:bg-gray-50 active:scale-[0.98]`;
        }
        return 'bg-transparent text-black hover:bg-gray-50 active:scale-[0.98]';
      case 'icon':
        return 'bg-transparent p-2 rounded-full hover:bg-gray-100 active:scale-[0.98]';
      case 'glass':
        return 'backdrop-blur-md bg-white/20 text-white border border-white/30 hover:bg-white/30 active:scale-[0.98]';
      default:
        return '';
    }
  };
  
  // Loading and disabled states
  const stateClasses = (disabled || isLoading) 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer hover:shadow-md';
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Construct the final class string
  const buttonClasses = `${baseClasses} ${sizeClasses[size]} ${getVariantClasses()} ${stateClasses} ${widthClasses} ${className}`;
  
  return (
    <button
      ref={ref}
      className={buttonClasses}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      aria-label={ariaLabel}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="opacity-0" aria-hidden="true">{children}</span>
          <span 
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <svg 
              className="animate-spin h-5 w-5" 
              viewBox="0 0 24 24"
              role="img"
              aria-label="Loading indicator"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
                fill="none"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        </>
      ) : (
        <>
          <span className="relative z-10 flex items-center justify-center">
            {children}
          </span>
          <span 
            className="absolute inset-0 bg-white/10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
            aria-hidden="true"
          ></span>
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 