'use client';

import React from 'react';
import { Typography, TypographyProps } from './Typography';

interface ResponsiveTypographyProps extends Omit<TypographyProps, 'variant'> {
  /**
   * Typography variant to use by default or on all breakpoints if no breakpoint-specific variants provided
   */
  variant?: TypographyProps['variant'];
  
  /**
   * Typography variant to use on mobile devices (< 768px)
   */
  mobileVariant?: TypographyProps['variant'];
  
  /**
   * Typography variant to use on tablet devices (768px - 1023px)
   */
  tabletVariant?: TypographyProps['variant'];
  
  /**
   * Typography variant to use on desktop devices (≥ 1024px)
   */
  desktopVariant?: TypographyProps['variant'];
  
  /**
   * If true, enables fluid typography scaling that smoothly adjusts based on viewport width
   */
  fluid?: boolean;
  
  /**
   * Minimum font size to use with fluid typography (in rem)
   */
  minSize?: number;
  
  /**
   * Maximum font size to use with fluid typography (in rem)
   */
  maxSize?: number;
  
  /**
   * Minimum viewport width for fluid scaling (in px)
   */
  minViewport?: number;
  
  /**
   * Maximum viewport width for fluid scaling (in px)
   */
  maxViewport?: number;
}

/**
 * ResponsiveTypography extends the base Typography component with responsive features.
 * It can render different typography variants at different breakpoints, or use fluid
 * typography that scales smoothly with the viewport width.
 */
export function ResponsiveTypography({
  variant = 'body',
  mobileVariant,
  tabletVariant,
  desktopVariant,
  fluid = false,
  minSize = 1,
  maxSize = 3,
  minViewport = 320,
  maxViewport = 1280,
  className = '',
  children,
  ...props
}: ResponsiveTypographyProps) {
  // Helper function to get base size in px for a particular variant
  const getVariantBaseSize = (v: TypographyProps['variant']): number => {
    switch (v) {
      case 'h1': return 36;
      case 'h2': return 30;
      case 'h3': return 24;
      case 'h4': return 20;
      case 'h5': return 18;
      case 'h6': return 16;
      case 'body-lg': return 18;
      case 'body': return 16;
      case 'body-sm': return 14;
      case 'caption': return 12;
      case 'label': return 14;
      default: return 16;
    }
  };

  if (fluid) {
    // Calculate fluid typography styles using CSS clamp
    const fluidSize = `clamp(${minSize}rem, ${minSize}rem + ${(maxSize - minSize) * 100 / (maxViewport - minViewport)}vw, ${maxSize}rem)`;
    
    return (
      <Typography
        variant={variant}
        className={`fluid-typography ${className}`}
        style={{ fontSize: fluidSize }}
        {...props}
      >
        {children}
      </Typography>
    );
  }
  
  if (mobileVariant || tabletVariant || desktopVariant) {
    // Use different variants at different breakpoints
    return (
      <>
        {/* Mobile (default) */}
        <Typography
          variant={mobileVariant || variant}
          className={`md:hidden ${className}`}
          {...props}
        >
          {children}
        </Typography>
        
        {/* Tablet */}
        {tabletVariant && (
          <Typography
            variant={tabletVariant}
            className={`hidden md:block lg:hidden ${className}`}
            {...props}
          >
            {children}
          </Typography>
        )}
        
        {/* Desktop */}
        <Typography
          variant={desktopVariant || tabletVariant || variant}
          className={`hidden lg:block ${className}`}
          {...props}
        >
          {children}
        </Typography>
      </>
    );
  }
  
  // Default: just use the variant specified
  return (
    <Typography variant={variant} className={className} {...props}>
      {children}
    </Typography>
  );
} 