'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      lead: 'text-xl text-muted-foreground',
      body: 'leading-7',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      caption: 'text-xs text-muted-foreground',
      overline: 'text-xs font-medium uppercase tracking-widest',
      label: 'text-sm font-medium',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    truncate: {
      true: 'truncate',
    },
  },
  defaultVariants: {
    variant: 'body',
    weight: 'normal',
    align: 'left',
    truncate: false,
  },
});

// Map of variant to HTML element
const variantElementMap: Record<string, keyof JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  lead: 'p',
  body: 'p',
  large: 'p',
  small: 'p',
  muted: 'p',
  blockquote: 'blockquote',
  caption: 'span',
  overline: 'span',
  label: 'label',
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: keyof JSX.IntrinsicElements;
  /**
   * If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   * @default false
   */
  noWrap?: boolean;
  /**
   * If true, the text will be in a paragraph element.
   * @default false
   */
  paragraph?: boolean;
  /**
   * If true, the text will have a bottom margin.
   * @default false
   */
  gutterBottom?: boolean;
  /**
   * The content to display
   */
  children: React.ReactNode;
}

/**
 * Typography component that provides consistent text styling across the application
 * using Shadcn UI's typographic conventions
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant,
      weight,
      align,
      truncate,
      component,
      noWrap,
      paragraph,
      gutterBottom,
      children,
      ...props
    },
    ref
  ) => {
    // Determine component based on variant or explicit component prop
    const Component = component || 
      (paragraph ? 'p' : variantElementMap[variant as string] || 'p');

    return (
      <Component
        className={cn(
          typographyVariants({ variant, weight, align, truncate }),
          noWrap && 'whitespace-nowrap overflow-hidden text-ellipsis',
          gutterBottom && 'mb-4',
          className
        )}
        ref={ref as any}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';

export default Typography; 