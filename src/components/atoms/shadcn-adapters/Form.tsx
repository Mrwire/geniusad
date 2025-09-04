'use client';

import React from 'react';
import * as ShadcnForm from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

/**
 * FormField component adapter for Shadcn UI
 * 
 * This adapter provides compatibility with the original Form API
 * while using the Shadcn UI Form component underneath.
 */
export interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> extends React.FormHTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<TFieldValues, TContext>;
  children: React.ReactNode;
  className?: string;
}

export interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  control?: UseFormReturn<TFieldValues>['control'];
  children: React.ReactNode;
  className?: string;
}

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  // Whether the label should be moved to the side of the form control
  horizontal?: boolean;
  // Whether the form item should have a bottom margin
  noMargin?: boolean;
}

export interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof ShadcnForm.FormLabel> {
  // Whether the label is required
  required?: boolean;
}

export interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  // Any additional custom props
}

export interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  // Any additional custom props
}

// Create a simple adapter without namespace conflicts
const FormRoot = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>({ 
  form, 
  children, 
  className, 
  ...props 
}: {
  form: UseFormReturn<TFieldValues, TContext>;
  children: React.ReactNode;
  className?: string;
} & React.FormHTMLAttributes<HTMLFormElement>) => {
  return (
    <ShadcnForm.Form {...form}>
      <form className={className} {...props}>
        {children}
      </form>
    </ShadcnForm.Form>
  );
};

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ 
  name, 
  control, 
  children, 
  className 
}: {
  name: TName;
  control?: UseFormReturn<TFieldValues>['control'];
  children: React.ReactNode | ((field: any) => React.ReactNode);
  className?: string;
}) => {
  return (
    <ShadcnForm.FormField
      name={name}
      control={control}
      render={({ field }) => (
        <div className={className}>
          {typeof children === 'function' ? children(field) : children}
        </div>
      )}
    />
  );
};

const FormItem = ({ 
  children, 
  className, 
  horizontal = false, 
  noMargin = false,
  ...props 
}: {
  children: React.ReactNode;
  className?: string;
  horizontal?: boolean;
  noMargin?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <ShadcnForm.FormItem
      className={cn(
        !noMargin && 'mb-4',
        horizontal && 'flex flex-row items-start space-x-3 space-y-0',
        className
      )}
      {...props}
    >
      {children}
    </ShadcnForm.FormItem>
  );
};

const FormLabel = ({ 
  children, 
  className, 
  required = false,
  ...props 
}: {
  children: React.ReactNode;
  className?: string;
  required?: boolean;
} & Omit<React.ComponentPropsWithoutRef<React.ElementRef<typeof ShadcnForm.FormLabel>>, 'children'>) => {
  return (
    <ShadcnForm.FormLabel
      className={cn(className)}
      {...props}
    >
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </ShadcnForm.FormLabel>
  );
};

const FormMessage = ({ 
  children, 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <ShadcnForm.FormMessage
      className={cn('text-xs', className)}
      {...props}
    >
      {children}
    </ShadcnForm.FormMessage>
  );
};

const FormDescription = ({ 
  children, 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <ShadcnForm.FormDescription
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    >
      {children}
    </ShadcnForm.FormDescription>
  );
};

const FormControl = (props: React.ComponentPropsWithRef<typeof ShadcnForm.FormControl>) => {
  return <ShadcnForm.FormControl {...props} />;
};

// Create a composite Form object that contains all components
export const Form = {
  Root: FormRoot,
  Field: FormField,
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Message: FormMessage,
  Description: FormDescription,
}; 