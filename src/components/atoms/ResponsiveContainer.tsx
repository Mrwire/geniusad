import React from 'react';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Set to true to use narrower container on large screens
   */
  narrow?: boolean;
  /**
   * Set to true to use wider container on large screens
   */
  wide?: boolean;
  /**
   * Optional padding size override
   */
  padding?: 'none' | 'small' | 'medium' | 'large';
}

/**
 * ResponsiveContainer provides consistent container behavior across breakpoints
 * It automatically adjusts padding and max-width based on screen size
 */
export default function ResponsiveContainer({
  children,
  className = '',
  narrow = false,
  wide = false,
  padding = 'medium',
}: ResponsiveContainerProps) {
  // Determine padding classes based on the padding prop
  let paddingClasses = '';
  
  switch(padding) {
    case 'none':
      paddingClasses = '';
      break;
    case 'small':
      paddingClasses = 'px-3 sm:px-4 md:px-5';
      break;
    case 'large':
      paddingClasses = 'px-5 sm:px-6 md:px-8 lg:px-10';
      break;
    case 'medium':
    default:
      paddingClasses = 'px-4 sm:px-5 md:px-6 lg:px-8';
      break;
  }

  // Determine width classes based on narrow/wide props
  let widthClasses = 'w-full mx-auto';
  
  if (narrow) {
    widthClasses += ' max-w-full sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[65%]';
  } else if (wide) {
    widthClasses += ' max-w-full sm:max-w-[95%] lg:max-w-[90%] xl:max-w-[1440px]';
  } else {
    // Default width constraints
    widthClasses += ' max-w-full sm:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] 2xl:max-w-[1280px]';
  }

  return (
    <div className={`${widthClasses} ${paddingClasses} ${className}`}>
      {children}
    </div>
  );
} 