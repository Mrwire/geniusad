import React from 'react';
import { Button, ButtonProps } from '../atoms/Button';

// Custom type that removes the 'children' requirement from ButtonProps
type ButtonPropsWithoutChildren = Omit<ButtonProps, 'children'>;

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Buttons to display
   */
  buttons: Array<ButtonPropsWithoutChildren & { label: React.ReactNode }>;
  /**
   * Layout orientation
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Spacing between buttons
   */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  /**
   * Whether buttons should have equal width
   */
  equalWidth?: boolean;
  /**
   * Group variant for special visual styles
   */
  groupVariant?: 'default' | 'segmented' | 'pill' | 'toolbar';
  /**
   * Optional subsidiary color theme
   */
  subsidiary?: 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ButtonGroup component for displaying related buttons together
 * Implements Apple-inspired button grouping styles
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  orientation = 'horizontal',
  spacing = 'md',
  equalWidth = false,
  groupVariant = 'default',
  subsidiary,
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'flex';
  
  // Orientation classes
  const orientationClasses = orientation === 'horizontal' ? 'flex-row' : 'flex-col';
  
  // Spacing classes
  const spacingClasses = {
    none: 'gap-0',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };
  
  // Special styles for group variants
  const getGroupVariantClasses = () => {
    switch (groupVariant) {
      case 'segmented':
        return 'p-1 bg-gray-100 rounded-lg';
      case 'pill':
        return 'inline-flex rounded-full bg-gray-100 p-1';
      case 'toolbar':
        return 'bg-white shadow-sm rounded-lg p-1 border border-gray-200';
      default:
        return '';
    }
  };
  
  // Render buttons with special handling for variants
  const renderButtons = () => {
    return buttons.map((button, index) => {
      const { label, ...buttonProps } = button;
      
      // Special button styling based on group variant
      let additionalProps: Partial<ButtonPropsWithoutChildren> = {};
      let additionalClasses = '';
      
      if (groupVariant === 'segmented') {
        additionalClasses = 'rounded-lg m-0';
        // If button is primary, make others tertiary
        if (button.variant !== 'primary') {
          additionalProps.variant = 'tertiary';
        }
      } else if (groupVariant === 'pill') {
        additionalClasses = 'rounded-full';
      } else if (groupVariant === 'toolbar') {
        additionalProps.variant = 'tertiary';
        additionalClasses = 'rounded-md';
      }
      
      // Equal width for all buttons if requested
      if (equalWidth) {
        additionalClasses += ' flex-1';
      }
      
      return (
        <Button
          key={index}
          {...buttonProps}
          {...additionalProps}
          subsidiary={buttonProps.subsidiary || subsidiary}
          className={`${buttonProps.className || ''} ${additionalClasses}`}
        >
          {label}
        </Button>
      );
    });
  };
  
  // Combine all classes
  const groupClasses = [
    baseClasses,
    orientationClasses,
    spacingClasses[spacing],
    getGroupVariantClasses(),
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div className={groupClasses} {...props}>
      {renderButtons()}
    </div>
  );
}; 