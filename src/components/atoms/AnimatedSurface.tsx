import React, { useState, useRef, useEffect } from 'react';

export interface AnimatedSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Animation type
   */
  animationType?: 'tilt' | 'float' | 'spotlight' | 'parallax' | 'scale' | 'glow';
  /**
   * Animation intensity (1-10)
   */
  intensity?: number;
  /**
   * Whether to enable animation on hover only
   */
  hoverOnly?: boolean;
  /**
   * Whether to enable 3D effect
   */
  enable3D?: boolean;
  /**
   * Background color or gradient
   */
  background?: string;
  /**
   * Optional subsidiary color theme
   */
  subsidiary?: 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Content
   */
  children: React.ReactNode;
}

/**
 * AnimatedSurface component for creating Apple-inspired interactive surfaces with
 * sophisticated animations and effects.
 */
export const AnimatedSurface: React.FC<AnimatedSurfaceProps> = ({
  animationType = 'tilt',
  intensity = 5,
  hoverOnly = true,
  enable3D = true,
  background,
  subsidiary,
  className = '',
  children,
  ...props
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  
  // Normalize intensity to a usable range
  const normalizedIntensity = Math.max(1, Math.min(10, intensity)) / 10;
  
  // Handle mouse movement for tilt and spotlight effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current || (hoverOnly && !isHovering)) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    
    // Calculate relative position (0-1)
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setPosition({ x, y });
  };
  
  // Auto-animation effect for float animation
  useEffect(() => {
    if (animationType === 'float' && !hoverOnly) {
      const interval = setInterval(() => {
        setPosition({
          x: 0.5 + (Math.sin(Date.now() / 2000) * 0.2),
          y: 0.5 + (Math.cos(Date.now() / 2000) * 0.2)
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [animationType, hoverOnly]);
  
  // Get background style based on subsidiary
  const getBackgroundStyle = () => {
    if (background) return background;
    
    // Subsidiary backgrounds
    const subsidiaryBg = {
      mps: 'linear-gradient(135deg, #0066FF11, #5599FF22)',
      labrigad: 'linear-gradient(135deg, #FF330011, #FF664022)',
      gamius: 'linear-gradient(135deg, #9933FF11, #BB66FF22)',
      moujeleell: 'linear-gradient(135deg, #00CC6611, #40DD8E22)',
    };
    
    return subsidiary 
      ? subsidiaryBg[subsidiary] 
      : 'linear-gradient(135deg, #f5f5f5, #ffffff)';
  };
  
  // Calculate styles based on animation type
  const getAnimationStyles = () => {
    const baseStyle: React.CSSProperties = {
      background: getBackgroundStyle(),
      transition: hoverOnly ? 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)' : undefined,
    };
    
    if ((!hoverOnly && animationType !== 'float') || !isHovering) {
      return baseStyle;
    }
    
    switch (animationType) {
      case 'tilt':
        const tiltX = (position.y - 0.5) * 20 * normalizedIntensity;
        const tiltY = (position.x - 0.5) * -20 * normalizedIntensity;
        
        return {
          ...baseStyle,
          transform: enable3D 
            ? `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`
            : `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`,
        };
        
      case 'float':
        const floatY = (Math.sin(Date.now() / 1000) * 5 * normalizedIntensity);
        
        return {
          ...baseStyle,
          transform: `translateY(${floatY}px)`,
        };
        
      case 'spotlight':
        const spotlightX = position.x * 100;
        const spotlightY = position.y * 100;
        
        return {
          ...baseStyle,
          backgroundImage: `radial-gradient(circle at ${spotlightX}% ${spotlightY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 50%)`,
        };
        
      case 'parallax':
        const moveX = (position.x - 0.5) * -20 * normalizedIntensity;
        const moveY = (position.y - 0.5) * -20 * normalizedIntensity;
        
        return {
          ...baseStyle,
          transform: `translate(${moveX}px, ${moveY}px)`,
        };
        
      case 'scale':
        return {
          ...baseStyle,
          transform: `scale(${1 + (normalizedIntensity * 0.05)})`,
        };
        
      case 'glow':
        const glowX = position.x * 100;
        const glowY = position.y * 100;
        const subsidiaryColor = subsidiary 
          ? {
              mps: '90, 153, 255',
              labrigad: '255, 102, 64',
              gamius: '187, 102, 255',
              moujeleell: '64, 221, 142',
            }[subsidiary]
          : '255, 255, 255';
        
        return {
          ...baseStyle,
          boxShadow: `0 0 30px rgba(${subsidiaryColor}, ${normalizedIntensity * 0.4})`,
          backgroundImage: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(${subsidiaryColor}, 0.15) 0%, rgba(${subsidiaryColor}, 0) 60%)`,
        };
        
      default:
        return baseStyle;
    }
  };
  
  // Combine all classes
  const surfaceClasses = [
    'rounded-2xl overflow-hidden',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <div
      ref={elementRef}
      className={surfaceClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={getAnimationStyles()}
      {...props}
    >
      {children}
    </div>
  );
}; 