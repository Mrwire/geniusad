import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export interface PageTransitionProps {
  /**
   * Transition type
   */
  type?: 'fade' | 'slide' | 'zoom' | 'flip' | 'blur';
  /**
   * Transition duration in milliseconds
   */
  duration?: number;
  /**
   * Transition timing function
   */
  timingFunction?: 'ease-apple' | 'ease-apple-spring' | 'linear' | 'ease-in' | 'ease-out';
  /**
   * Children to wrap with transition
   */
  children: React.ReactNode;
}

/**
 * PageTransition component for smooth Apple-style transitions between pages
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  type = 'fade',
  duration = 300,
  timingFunction = 'ease-apple-spring',
  children,
}) => {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showComponent, setShowComponent] = useState(true);
  const [transitionClasses, setTransitionClasses] = useState('');
  
  useEffect(() => {
    // Don't animate on initial load
    if (prevPathname === null) {
      setPrevPathname(pathname);
      return;
    }
    
    if (pathname !== prevPathname) {
      // Start exit animation
      setIsTransitioning(true);
      
      // Set exit animation classes based on transition type
      switch (type) {
        case 'fade':
          setTransitionClasses('opacity-0');
          break;
        case 'slide':
          setTransitionClasses('translate-y-10 opacity-0');
          break;
        case 'zoom':
          setTransitionClasses('scale-95 opacity-0');
          break;
        case 'flip':
          setTransitionClasses('rotateX(10deg) translate-y-10 opacity-0');
          break;
        case 'blur':
          setTransitionClasses('blur-sm opacity-0');
          break;
        default:
          setTransitionClasses('opacity-0');
      }
      
      // Hide component, then show it again after a delay
      const timer = setTimeout(() => {
        setShowComponent(false);
        
        // Wait a frame to ensure the component is removed
        requestAnimationFrame(() => {
          setPrevPathname(pathname);
          
          // Wait a frame to ensure the component is re-added
          requestAnimationFrame(() => {
            setShowComponent(true);
            
            // Reset transition state once animation completes
            setTimeout(() => {
              setIsTransitioning(false);
              setTransitionClasses('');
            }, duration);
          });
        });
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [pathname, prevPathname, type, duration]);
  
  // Base transition style
  const transitionStyle = {
    transition: `all ${duration}ms ${timingFunction}`,
  };
  
  // Entry animation classes based on transition type
  const getEntryClasses = () => {
    if (!showComponent) return 'opacity-0';
    
    switch (type) {
      case 'fade':
        return isTransitioning ? 'opacity-0' : 'opacity-100';
      case 'slide':
        return isTransitioning ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100';
      case 'zoom':
        return isTransitioning ? 'scale-105 opacity-0' : 'scale-100 opacity-100';
      case 'flip':
        return isTransitioning ? 'rotateX(-10deg) translate-y-10 opacity-0' : 'rotateX(0) translate-y-0 opacity-100';
      case 'blur':
        return isTransitioning ? 'blur-sm opacity-0' : 'blur-0 opacity-100';
      default:
        return isTransitioning ? 'opacity-0' : 'opacity-100';
    }
  };
  
  return (
    <div 
      className={`transition-all transform will-change-transform ${getEntryClasses()}`}
      style={transitionStyle}
    >
      {showComponent && children}
    </div>
  );
}; 