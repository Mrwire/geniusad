import React from 'react';

export interface TypographyProps {
  /**
   * The variant of the typography element
   */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body-lg' | 'body' | 'body-sm' | 'caption' | 'label';
  /**
   * The HTML element to render
   */
  as?: React.ElementType;
  /**
   * The font weight
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  /**
   * Optional color override
   */
  color?: string;
  /**
   * Optional alignment
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Optional subsidiary color theme
   */
  subsidiary?: 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * The content to render
   */
  children: React.ReactNode;
}

/**
 * Typography component for consistent text styling
 */
export const Typography = ({
  variant = 'body',
  as,
  weight,
  color,
  align = 'left',
  subsidiary,
  className = '',
  children,
  ...props
}: TypographyProps & React.HTMLAttributes<HTMLElement>) => {
  // Determine the HTML element based on variant or as prop
  const getElement = () => {
    if (as) return as;
    
    // Default mapping of variant to HTML element
    const elementMap: Record<string, React.ElementType> = {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      'body-lg': 'p',
      body: 'p',
      'body-sm': 'p',
      caption: 'span',
      label: 'label',
    };
    
    return elementMap[variant] || 'p';
  };
  
  // Base classes for each variant
  const variantClasses: Record<string, string> = {
    h1: 'font-heading text-5xl md:text-6xl leading-tight',
    h2: 'font-heading text-4xl md:text-5xl leading-tight',
    h3: 'font-heading text-3xl md:text-4xl leading-tight',
    h4: 'font-heading text-2xl md:text-3xl leading-tight',
    h5: 'font-heading text-xl md:text-2xl leading-tight',
    h6: 'font-heading text-lg md:text-xl leading-tight',
    'body-lg': 'font-body text-lg leading-relaxed',
    body: 'font-body text-base leading-relaxed',
    'body-sm': 'font-body text-sm leading-relaxed',
    caption: 'font-body text-xs leading-normal',
    label: 'font-heading text-sm uppercase tracking-wider',
  };
  
  // Weight classes (only apply if explicitly provided to override variant defaults)
  const weightClasses: Record<string, string> = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
  };
  
  // Default weights for heading variants
  const headingVariants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'];
  const defaultWeight = headingVariants.includes(variant) ? 'extrabold' : 'normal';
  
  // Alignment classes
  const alignClasses: Record<string, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  // Get color class
  const getColorClass = () => {
    // If a subsidiary is specified, use its color
    if (subsidiary) {
      return `text-${subsidiary}`;
    }
    
    // If an explicit color is provided, use it
    if (color) {
      return `text-${color}`;
    }
    
    // No color specified
    return '';
  };
  
  // Combine all classes
  const classes = [
    variantClasses[variant],
    weight ? weightClasses[weight] : weightClasses[defaultWeight],
    alignClasses[align],
    getColorClass(),
    className,
  ].filter(Boolean).join(' ');
  
  const Element = getElement();
  
  return (
    <Element className={classes} {...props}>
      {children}
    </Element>
  );
};

export default Typography; 