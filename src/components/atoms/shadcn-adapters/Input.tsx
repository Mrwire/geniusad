'use client';

import React from 'react';
import { Input as ShadcnInput } from '@/components/ui/input';
import { cn } from '@/lib/utils';

/**
 * Input component adapter for Shadcn UI
 * 
 * This adapter provides compatibility with the original Input API
 * while using the Shadcn UI Input component underneath.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The variant of the input
   * @default "default"
   */
  variant?: 'default' | 'outlined' | 'filled';
  
  /**
   * The size of the input
   * @default "default"
   */
  size?: 'small' | 'default' | 'large';
  
  /**
   * If true, the input will take the full width
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * If true, the input will be in an error state
   * @default false
   */
  error?: boolean;
  
  /**
   * Start adornment for the input
   */
  startAdornment?: React.ReactNode;
  
  /**
   * End adornment for the input
   */
  endAdornment?: React.ReactNode;
}

/**
 * Input component that wraps the Shadcn UI Input component
 * but maintains compatibility with the existing input component API
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'default',
      fullWidth = false,
      error = false,
      startAdornment,
      endAdornment,
      className,
      ...props
    },
    ref
  ) => {
    // Map size to classes
    const sizeClasses = {
      small: 'h-8 px-3 py-1 text-sm',
      default: 'h-10 px-4 py-2',
      large: 'h-12 px-5 py-3 text-lg'
    };
    
    // Map variant to classes
    const variantClasses = {
      default: '',
      outlined: 'border-2',
      filled: 'bg-muted'
    };
    
    // Create the wrapper for adornments
    if (startAdornment || endAdornment) {
      return (
        <div className={cn(
          'flex items-center relative rounded-md',
          error && 'border-destructive',
          fullWidth && 'w-full',
          className
        )}>
          {startAdornment && (
            <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
              {startAdornment}
            </div>
          )}
          
          <ShadcnInput
            ref={ref}
            className={cn(
              sizeClasses[size],
              variantClasses[variant],
              startAdornment && 'pl-10',
              endAdornment && 'pr-10',
              error && 'border-destructive'
            )}
            {...props}
          />
          
          {endAdornment && (
            <div className="absolute right-3 flex items-center pointer-events-none text-muted-foreground">
              {endAdornment}
            </div>
          )}
        </div>
      );
    }
    
    // Simple case without adornments
    return (
      <ShadcnInput
        ref={ref}
        className={cn(
          sizeClasses[size],
          variantClasses[variant],
          error && 'border-destructive',
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input; 