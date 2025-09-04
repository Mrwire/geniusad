import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface AnimatedNavLinkProps {
  /**
   * Link destination
   */
  href: string;
  /**
   * Link text
   */
  children: React.ReactNode;
  /**
   * Animation style
   */
  animationStyle?: 'underline' | 'highlight' | 'scale' | 'fade';
  /**
   * Optional subsidiary color theme
   */
  subsidiary?: 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
  /**
   * Mobile mode for responsive design
   */
  isMobile?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * onClick handler
   */
  onClick?: () => void;
}

/**
 * AnimatedNavLink component for navigation links with Apple-inspired animations
 */
export const AnimatedNavLink: React.FC<AnimatedNavLinkProps> = ({
  href,
  children,
  animationStyle = 'underline',
  subsidiary,
  isMobile = false,
  className = '',
  onClick,
}) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const isActive = pathname === href;
  
  // Get color based on subsidiary
  const getSubsidiaryColor = () => {
    if (!subsidiary) return {};
    
    return {
      mps: 'text-mps hover:text-mps-dark',
      labrigad: 'text-labrigad hover:text-labrigad-dark',
      gamius: 'text-gamius hover:text-gamius-dark',
      moujeleell: 'text-moujeleell hover:text-moujeleell-dark',
    }[subsidiary];
  };
  
  // Base styles
  const baseStyle = `relative font-medium transition-all duration-300 ease-apple-spring ${isMobile ? 'text-lg py-3' : 'text-sm py-2'}`;
  
  // Get animation specific styles
  const getAnimationStyles = () => {
    switch (animationStyle) {
      case 'underline':
        return 'group';
      case 'highlight':
        return 'px-4 rounded-full';
      case 'scale':
        return 'transform';
      case 'fade':
        return 'transition-opacity';
      default:
        return '';
    }
  };
  
  // Active styles based on animation type
  const getActiveStyles = () => {
    const baseActiveStyle = 'font-semibold';
    
    // Subsidiary-specific active styles
    const subsidiaryActive = subsidiary 
      ? {
          mps: 'text-mps',
          labrigad: 'text-labrigad',
          gamius: 'text-gamius',
          moujeleell: 'text-moujeleell',
        }[subsidiary]
      : 'text-black';
      
    switch (animationStyle) {
      case 'underline':
        return `${baseActiveStyle} ${subsidiaryActive}`;
      case 'highlight':
        return `${baseActiveStyle} ${subsidiaryActive} bg-gray-100`;
      case 'scale':
        return `${baseActiveStyle} ${subsidiaryActive}`;
      case 'fade':
        return `${baseActiveStyle} ${subsidiaryActive}`;
      default:
        return baseActiveStyle;
    }
  };
  
  // Combine all classes
  const linkClasses = [
    baseStyle,
    getAnimationStyles(),
    isActive ? getActiveStyles() : getSubsidiaryColor() || 'text-gray-600 hover:text-black',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <Link
      href={href}
      className={linkClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
      
      {/* Different animations based on style */}
      {animationStyle === 'underline' && (
        <span 
          className={`absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300 ease-apple-spring ${
            isActive 
              ? subsidiary 
                ? `bg-${subsidiary}`
                : 'bg-black' 
              : 'scale-x-0 group-hover:scale-x-100 bg-current'
          }`}
        />
      )}
      
      {animationStyle === 'highlight' && !isActive && (
        <span 
          className={`absolute inset-0 rounded-full transition-opacity duration-300 ease-apple-spring ${
            isHovered 
              ? 'opacity-10' 
              : 'opacity-0'
          } ${
            subsidiary 
              ? `bg-${subsidiary}` 
              : 'bg-gray-200'
          }`}
        />
      )}
      
      {animationStyle === 'scale' && (
        <span 
          className={`absolute -z-10 inset-0 transform transition-transform duration-300 ease-apple-spring ${
            isHovered || isActive
              ? 'scale-110' 
              : 'scale-0'
          }`}
        />
      )}
    </Link>
  );
}; 