"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, IconName } from '../atoms/Icon';

export interface NavigationLinkProps {
  href: string;
  label: string;
  icon?: IconName;
  isExternal?: boolean;
  variant?: 'default' | 'button' | 'minimal';
  color?: 'default' | 'silver' | 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  activeClassName?: string;
  exactMatch?: boolean;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  href,
  label,
  icon,
  isExternal = false,
  variant = 'default',
  color = 'default',
  size = 'md',
  className = '',
  onClick,
  activeClassName = '',
  exactMatch = true,
}) => {
  const pathname = usePathname();
  
  // Check if the current path matches the link's href
  const isActive = exactMatch 
    ? pathname === href 
    : pathname.startsWith(href) && href !== '/';
  
  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-sm py-1';
      case 'md': return 'text-base py-2';
      case 'lg': return 'text-lg py-3';
      default: return 'text-base py-2';
    }
  };

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case 'button':
        return 'px-4 rounded-md font-medium';
      case 'minimal':
        return 'hover:underline';
      default:
        return 'px-2 hover:opacity-80';
    }
  };

  // Color classes
  const getColorClasses = () => {
    const baseClasses = isActive ? 'font-medium' : '';
    
    switch (color) {
      case 'silver':
        return `${baseClasses} ${isActive ? 'text-silver-dark' : 'text-silver hover:text-silver-dark'}`;
      case 'mps':
        return `${baseClasses} ${isActive ? 'text-mps-dark' : 'text-mps hover:text-mps-dark'}`;
      case 'labrigad':
        return `${baseClasses} ${isActive ? 'text-labrigad-dark' : 'text-labrigad hover:text-labrigad-dark'}`;
      case 'gamius':
        return `${baseClasses} ${isActive ? 'text-gamius-dark' : 'text-gamius hover:text-gamius-dark'}`;
      case 'moujeleell':
        return `${baseClasses} ${isActive ? 'text-moujeleell-dark' : 'text-moujeleell hover:text-moujeleell-dark'}`;
      default:
        return `${baseClasses} ${isActive ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}`;
    }
  };

  // Active-specific classes
  const activeClasses = isActive 
    ? `${activeClassName} ${variant === 'button' ? 'bg-gray-100' : ''}`
    : '';

  // Combine all classes
  const linkClasses = `
    inline-flex items-center transition-colors duration-300 ease-apple-spring
    ${getSizeClasses()}
    ${getVariantClasses()}
    ${getColorClasses()}
    ${activeClasses}
    ${className}
  `;

  // External link attributes
  const externalProps = isExternal ? {
    target: '_blank',
    rel: 'noopener noreferrer',
  } : {};

  return (
    <Link
      href={href}
      className={linkClasses}
      onClick={onClick}
      {...externalProps}
    >
      {icon && (
        <Icon
          name={icon}
          size="sm"
          className={`mr-2 ${isActive ? 'text-current' : 'text-current opacity-80'}`}
        />
      )}
      {label}
      {isExternal && (
        <Icon
          name="chevron-right"
          size="sm"
          className="ml-1"
        />
      )}
    </Link>
  );
};

export default NavigationLink; 