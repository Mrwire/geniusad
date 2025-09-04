"use client";

import React, { useState } from 'react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Checkbox } from '@/components/atoms/Checkbox';
import { FormGroup } from '@/components/molecules/FormGroup';
import { Typography } from '@/components/atoms/Typography';

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'checkbox' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    errorMessage?: string;
  };
}

export interface FormProps {
  title?: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
  onSubmit: (data: Record<string, any>) => void;
  isLoading?: boolean;
  className?: string;
  successMessage?: string;
  errorMessage?: string;
  subsidiary?: 'default' | 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
}

export const Form: React.FC<FormProps> = ({
  title,
  description,
  fields,
  submitLabel = 'Submit',
  onSubmit,
  isLoading = false,
  className = '',
  successMessage,
  errorMessage,
  subsidiary = 'default',
}) => {
  // State for form data
  const [formData, setFormData] = useState<Record<string, any>>(() => {
    // Initialize form data with empty values
    const initialData: Record<string, any> = {};
    fields.forEach((field) => {
      initialData[field.id] = field.type === 'checkbox' ? false : '';
    });
    return initialData;
  });

  // State for form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  // State for form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const value = formData[field.id];

      // Required field validation
      if (field.required && (value === '' || value === false)) {
        newErrors[field.id] = `${field.label} is required`;
        isValid = false;
      }

      // Pattern validation
      if (field.validation?.pattern && typeof value === 'string' && value) {
        if (!field.validation.pattern.test(value)) {
          newErrors[field.id] = field.validation.errorMessage || `${field.label} is invalid`;
          isValid = false;
        }
      }

      // Length validation
      if (typeof value === 'string' && value) {
        if (field.validation?.minLength && value.length < field.validation.minLength) {
          newErrors[field.id] = `${field.label} must be at least ${field.validation.minLength} characters`;
          isValid = false;
        }
        if (field.validation?.maxLength && value.length > field.validation.maxLength) {
          newErrors[field.id] = `${field.label} must be less than ${field.validation.maxLength} characters`;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (validateForm()) {
      try {
        await onSubmit(formData);
        setIsSubmitted(true);
        setIsSuccess(true);
        
        // Reset form after successful submission
        const initialData: Record<string, any> = {};
        fields.forEach((field) => {
          initialData[field.id] = field.type === 'checkbox' ? false : '';
        });
        setFormData(initialData);
      } catch (error) {
        setIsSubmitted(true);
        setIsSuccess(false);
        setGeneralError(errorMessage || 'Something went wrong. Please try again.');
      }
    }
  };

  // Get color classes based on subsidiary
  const getColorClasses = () => {
    switch (subsidiary) {
      case 'mps':
        return 'border-mps';
      case 'labrigad':
        return 'border-labrigad';
      case 'gamius':
        return 'border-gamius';
      case 'moujeleell':
        return 'border-moujeleell';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <div className={`bg-white rounded-lg p-6 md:p-8 ${getColorClasses()} ${className}`}>
      {title && (
        <Typography 
          variant="h4" 
          className="mb-2" 
          color={subsidiary !== 'default' ? subsidiary : undefined}
        >
          {title}
        </Typography>
      )}

      {description && (
        <Typography variant="body" color="muted" className="mb-6">
          {description}
        </Typography>
      )}

      {isSubmitted && isSuccess && successMessage && (
        <div className="mb-6 p-4 bg-success bg-opacity-10 border border-success rounded text-success">
          {successMessage}
        </div>
      )}

      {isSubmitted && !isSuccess && generalError && (
        <div className="mb-6 p-4 bg-error bg-opacity-10 border border-error rounded text-error">
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field) => (
          <FormGroup 
            key={field.id}
            id={field.id}
            label={field.label}
            error={errors[field.id]}
            required={field.required}
          >
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                name={field.name}
                value={formData[field.id] as string}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-silver-dark"
                placeholder={field.placeholder}
                rows={4}
              />
            ) : field.type === 'checkbox' ? (
              <Checkbox
                id={field.id}
                name={field.name}
                checked={!!formData[field.id]}
                onChange={handleChange}
                label={field.label}
                error={errors[field.id]}
                color={subsidiary !== 'default' ? subsidiary : undefined}
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                name={field.name}
                value={formData[field.id] as string}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-silver-dark"
              >
                <option value="">Select an option</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={field.id}
                name={field.name}
                type={field.type}
                value={formData[field.id] as string}
                onChange={handleChange}
                placeholder={field.placeholder}
                error={errors[field.id]}
                fullWidth
              />
            )}
          </FormGroup>
        ))}

        <div className="pt-4">
          <Button 
            type="submit" 
            variant="primary" 
            isLoading={isLoading}
            disabled={isLoading}
            subsidiary={subsidiary !== 'default' ? subsidiary : undefined}
            className="w-full sm:w-auto"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form; 