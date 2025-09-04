"use client";

import React, { useRef, useEffect } from 'react';
import { Container } from '@/components/atoms/Container';
import { Typography } from '@/components/atoms/Typography';
import { Divider } from '@/components/atoms/Divider';

export type SectionVariant = 
  | 'default'
  | 'alternate'
  | 'centered'
  | 'grid'
  | 'split'
  | 'hero';

export interface SectionLayoutProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: SectionVariant;
  backgroundColor?: string;
  backgroundImage?: string;
  textColor?: 'light' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
  containerClassName?: string;
  subsidiary?: 'default' | 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
  titleClassName?: string;
  subtitleClassName?: string;
  contentClassName?: string;
  withDivider?: boolean;
}

export const SectionLayout: React.FC<SectionLayoutProps> = ({
  id,
  title,
  subtitle,
  children,
  variant = 'default',
  backgroundColor,
  backgroundImage,
  textColor = 'dark',
  padding = 'lg',
  className = '',
  animate = true,
  containerClassName = '',
  subsidiary = 'default',
  titleClassName = '',
  subtitleClassName = '',
  contentClassName = '',
  withDivider = false,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  
  // Handle animations on scroll
  useEffect(() => {
    if (!animate) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('translate-y-0', 'opacity-100');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) {
      headingRef.current.classList.add('transition-all', 'duration-1000', 'ease-apple-spring');
      headingRef.current.classList.add('translate-y-8', 'opacity-0');
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, [animate]);

  // Handle padding classes
  const getPaddingClasses = () => {
    switch (padding) {
      case 'none': return '';
      case 'sm': return 'py-8 md:py-12';
      case 'md': return 'py-12 md:py-16';
      case 'lg': return 'py-16 md:py-24';
      case 'xl': return 'py-24 md:py-32';
      default: return 'py-16 md:py-24';
    }
  };

  // Handle text color
  const textColorClasses = textColor === 'light' ? 'text-white' : 'text-gray-900';

  // Handle variant layout
  const getLayoutClasses = () => {
    switch (variant) {
      case 'alternate':
        return 'flex flex-col md:flex-row md:items-center';
      case 'centered':
        return 'flex flex-col items-center text-center';
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
      case 'split':
        return 'flex flex-col md:flex-row md:items-center';
      case 'hero':
        return 'flex flex-col items-center justify-center min-h-[70vh]';
      default:
        return '';
    }
  };

  // Handle subsidiary color
  const getSubsidiaryColor = () => {
    switch (subsidiary) {
      case 'mps':
        return 'text-mps';
      case 'labrigad':
        return 'text-labrigad';
      case 'gamius':
        return 'text-gamius';
      case 'moujeleell':
        return 'text-moujeleell';
      default:
        return '';
    }
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative ${getPaddingClasses()} ${textColorClasses} ${className}`}
      style={{
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
      }}
    >
      <Container className={containerClassName}>
        {(title || subtitle) && (
          <div 
            ref={headingRef} 
            className={`mb-12 ${variant === 'centered' ? 'text-center mx-auto max-w-2xl' : ''}`}
          >
            {title && (
              <Typography 
                variant="h2" 
                className={`mb-4 ${getSubsidiaryColor()} ${titleClassName}`}
              >
                {title}
              </Typography>
            )}
            
            {subtitle && (
              <Typography 
                variant="body" 
                color="muted" 
                className={`text-lg ${subtitleClassName}`}
              >
                {subtitle}
              </Typography>
            )}
            
            {withDivider && (
              <Divider 
                className="mt-6" 
                color={subsidiary !== 'default' ? subsidiary : undefined} 
              />
            )}
          </div>
        )}
        
        <div className={`${getLayoutClasses()} ${contentClassName}`}>
          {children}
        </div>
      </Container>
    </section>
  );
};

export default SectionLayout; 