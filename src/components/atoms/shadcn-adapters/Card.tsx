'use client';

import React from 'react';
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Typography } from './Typography';

/**
 * Card component that wraps the Shadcn UI Card components
 * but maintains compatibility with the existing card component API
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The variant of the card
   * @default "default"
   */
  variant?: 'default' | 'elevated' | 'outlined' | 'secondary' | 'primary';
  
  /**
   * The title of the card
   */
  title?: React.ReactNode;
  
  /**
   * The description of the card
   */
  description?: React.ReactNode;
  
  /**
   * If true, the card will remove padding from the content
   * @default false
   */
  noPadding?: boolean;
  
  /**
   * Additional content to be placed in the footer
   */
  footer?: React.ReactNode;
  
  /**
   * The content of the card
   */
  children?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      title,
      description,
      noPadding = false,
      footer,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Determine the appropriate classes based on the variant
    const variantClassMap: Record<string, string> = {
      default: '',
      elevated: 'shadow-lg border-0',
      outlined: 'border-2',
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground'
    };
    
    const variantClass = variantClassMap[variant] || '';
    
    // If there's no title, description, or footer, and we want no padding,
    // we can just render the children without extra wrappers
    if (!title && !description && !footer && noPadding) {
      return (
        <ShadcnCard
          className={cn(variantClass, className)}
          ref={ref}
          {...props}
        >
          {children}
        </ShadcnCard>
      );
    }
    
    return (
      <ShadcnCard 
        className={cn(variantClass, className)} 
        ref={ref}
        {...props}
      >
        {(title || description) && (
          <CardHeader>
            {title && (
              <CardTitle>
                {typeof title === 'string' ? (
                  <Typography variant="h3">{title}</Typography>
                ) : (
                  title
                )}
              </CardTitle>
            )}
            {description && (
              <CardDescription>
                {typeof description === 'string' ? (
                  <Typography variant="muted">{description}</Typography>
                ) : (
                  description
                )}
              </CardDescription>
            )}
          </CardHeader>
        )}
        {children && (
          <CardContent className={noPadding ? 'p-0' : ''}>
            {children}
          </CardContent>
        )}
        {footer && (
          <CardFooter>
            {footer}
          </CardFooter>
        )}
      </ShadcnCard>
    );
  }
);

Card.displayName = 'Card';

export default Card; 