import React from 'react';

type ResponsiveColumns = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  '2xl'?: number;
};

interface ResponsiveGridProps {
  /**
   * The grid items
   */
  children: React.ReactNode;
  /**
   * Number of columns at different breakpoints
   */
  columns: ResponsiveColumns | number;
  /**
   * Gap between items (applies to both row and column gap)
   */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Additional class names
   */
  className?: string;
  /**
   * If true, grid items will be aligned to have equal heights
   */
  equalHeight?: boolean;
}

/**
 * ResponsiveGrid component provides a grid layout that adapts to different screen sizes
 * It allows specifying different column counts at each breakpoint
 */
export default function ResponsiveGrid({
  children,
  columns,
  gap = 'md',
  className = '',
  equalHeight = false,
}: ResponsiveGridProps) {
  // Process columns configuration
  const cols: ResponsiveColumns = typeof columns === 'number'
    ? { xs: 1, sm: columns > 1 ? 2 : 1, md: columns > 3 ? 3 : columns, lg: columns }
    : { xs: 1, sm: 2, md: 3, lg: 4, ...columns };

  // Convert columns to grid-template-columns classes
  const colClasses = [
    cols.xs && `grid-cols-${cols.xs}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    cols['2xl'] && `2xl:grid-cols-${cols['2xl']}`,
  ].filter(Boolean).join(' ');

  // Process gap configuration
  let gapClass = '';
  switch (gap) {
    case 'none':
      gapClass = 'gap-0';
      break;
    case 'xs':
      gapClass = 'gap-2 sm:gap-3';
      break;
    case 'sm':
      gapClass = 'gap-3 sm:gap-4';
      break;
    case 'lg':
      gapClass = 'gap-6 sm:gap-8';
      break;
    case 'xl':
      gapClass = 'gap-8 sm:gap-10';
      break;
    case 'md':
    default:
      gapClass = 'gap-4 sm:gap-6';
      break;
  }

  return (
    <div className={`grid ${colClasses} ${gapClass} ${equalHeight ? 'grid-flow-row-dense' : ''} ${className}`}>
      {children}
    </div>
  );
} 