import React from 'react';

export interface DividerProps {
  /**
   * The variant of the divider
   */
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient';
  /**
   * The orientation of the divider
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The thickness of the divider
   */
  thickness?: 'thin' | 'medium' | 'thick';
  /**
   * Color of the divider
   */
  color?: string;
  /**
   * Optional subsidiary color theme
   */
  subsidiary?: 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Divider component for separating content sections
 */
export const Divider = ({
  variant = 'solid',
  orientation = 'horizontal',
  thickness = 'thin',
  color,
  subsidiary,
  className = '',
}: DividerProps) => {
  // Get color based on subsidiary or provided color
  const getColor = () => {
    if (color) {
      return `border-${color}`;
    }
    
    if (subsidiary) {
      return `border-${subsidiary}`;
    }
    
    // Default color
    return 'border-gray-200';
  };
  
  // Variant classes
  const getVariantClasses = () => {
    const variants = {
      solid: '',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
      gradient: variant === 'gradient' && orientation === 'horizontal' 
        ? 'bg-gradient-to-r from-transparent via-gray-200 to-transparent border-0' 
        : '',
    };
    
    return variants[variant] || '';
  };
  
  // Thickness classes
  const thicknessClasses = {
    thin: orientation === 'horizontal' ? 'border-t' : 'border-l',
    medium: orientation === 'horizontal' ? 'border-t-2' : 'border-l-2',
    thick: orientation === 'horizontal' ? 'border-t-4' : 'border-l-4',
  };
  
  // Orientation specific styles
  const orientationClasses = orientation === 'horizontal'
    ? 'w-full'
    : 'h-full inline-block';
  
  // Combine all classes
  const dividerClasses = [
    thicknessClasses[thickness],
    getVariantClasses(),
    getColor(),
    orientationClasses,
    className,
  ].filter(Boolean).join(' ');
  
  return <div className={dividerClasses} role="separator" aria-orientation={orientation} />;
};

export default Divider; 