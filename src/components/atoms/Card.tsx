import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant
   */
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive' | 'frosted' | 'feature';
  /**
   * Padding size
   */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Whether to add a hover effect (for interactive cards)
   */
  hover?: boolean;
  /**
   * Animation entrance delay in milliseconds
   */
  animationDelay?: number;
  /**
   * Optional subsidiary color theme
   */
  subsidiary?: 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Card content
   */
  children: React.ReactNode;
}

/**
 * Card component for displaying content in a contained box
 * Enhanced with Apple-inspired animations and design aesthetic
 */
export const Card = ({
  variant = 'default',
  padding = 'md',
  hover = false,
  animationDelay = 0,
  subsidiary,
  className = '',
  children,
  ...props
}: CardProps) => {
  // Base classes with enhanced transitions
  const baseClasses = 'relative rounded-xl backdrop-filter transition-all duration-400 ease-apple-spring transform';
  
  // Padding classes
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  // Variant classes based on subsidiary
  const getVariantClasses = () => {
    // Special handling for subsidiary colors
    const subsidiaryBorder = subsidiary ? `border-${subsidiary}` : 'border-gray-200';
    const subsidiaryHoverBorder = subsidiary ? `hover:border-${subsidiary}-dark` : 'hover:border-gray-300';
    const subsidiaryBg = subsidiary ? `bg-${subsidiary}/5` : '';
    
    const variants = {
      default: 'bg-white shadow-sm border border-gray-100',
      elevated: 'bg-white shadow-md border border-gray-50',
      outlined: subsidiary 
        ? `border ${subsidiaryBorder} bg-white` 
        : 'border border-gray-200 bg-white',
      interactive: subsidiary 
        ? `shadow-sm hover:shadow-md ${subsidiaryHoverBorder} cursor-pointer bg-white border ${subsidiaryBorder}` 
        : 'shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 cursor-pointer bg-white',
      frosted: 'backdrop-blur-lg bg-white/60 border border-white/30 shadow-sm',
      feature: subsidiary 
        ? `${subsidiaryBg} border ${subsidiaryBorder}` 
        : 'bg-gray-50 border border-gray-100',
    };
    
    return variants[variant];
  };
  
  // Hover classes with enhanced transform effects
  const hoverClasses = hover ? 'hover:shadow-lg hover:translate-y-[-4px] hover:scale-[1.01]' : '';
  
  // Animation classes
  const animationClass = 'animate-fade-in-up opacity-0';
  
  // Animation style for delay
  const animationStyle = animationDelay ? { animationDelay: `${animationDelay}ms` } : {};
  
  // Combine all classes
  const cardClasses = [
    baseClasses,
    paddingClasses[padding],
    getVariantClasses(),
    hoverClasses,
    animationClass,
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div 
      className={cardClasses} 
      style={animationStyle}
      {...props}
    >
      {children}
      {(variant === 'feature' || variant === 'frosted') && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      )}
    </div>
  );
};

export default Card; 