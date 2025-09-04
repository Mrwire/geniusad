'use client';

import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button component adapter for Shadcn UI
 * 
 * This adapter provides compatibility with the original Button API
 * while using the Shadcn UI Button component underneath.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button
   * @default "primary"
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'link' | 'danger' | 'success';
  
  /**
   * The size of the button
   * @default "default"
   */
  size?: 'small' | 'default' | 'large';
  
  /**
   * If true, the button will take the full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * If true, the button will be in a loading state
   * @default false
   */
  loading?: boolean;
  
  /**
   * Icon to be placed at the start of the button
   */
  startIcon?: React.ReactNode;
  
  /**
   * Icon to be placed at the end of the button
   */
  endIcon?: React.ReactNode;
  
  /**
   * The button content
   */
  children: React.ReactNode;
}

// Map the variant to the appropriate Shadcn variant
const variantMap = {
  primary: "default",
  secondary: "secondary",
  tertiary: "outline",
  outline: "outline",
  ghost: "ghost",
  link: "link",
  danger: "destructive",
  success: "success"
};

// Map the size to the appropriate Shadcn size
const sizeMap = {
  small: "sm",
  default: "default",
  large: "lg"
};

// Define classes for the loading spinner
const spinnerClasses = cva("animate-spin", {
  variants: {
    size: {
      small: "h-3 w-3",
      default: "h-4 w-4",
      large: "h-5 w-5"
    }
  },
  defaultVariants: {
    size: "default"
  }
});

/**
 * Button component that wraps the Shadcn UI Button component
 * but maintains compatibility with the existing button component API
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'default',
      fullWidth = false,
      loading = false,
      startIcon,
      endIcon,
      children,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    // Map our API to Shadcn API
    const shadcnVariant = variantMap[variant] || "default";
    const shadcnSize = sizeMap[size] || "default";
    
    // Create the spinner element
    const Spinner = () => (
      <svg 
        className={spinnerClasses({ size })} 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );
    
    return (
      <ShadcnButton
        ref={ref}
        variant={shadcnVariant}
        size={shadcnSize}
        className={cn(fullWidth && 'w-full', className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="mr-2">
            <Spinner />
          </span>
        )}
        {!loading && startIcon && <span className="mr-2">{startIcon}</span>}
        {children}
        {!loading && endIcon && <span className="ml-2">{endIcon}</span>}
      </ShadcnButton>
    );
  }
);

Button.displayName = 'Button';

export default Button; 