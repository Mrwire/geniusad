"use client";

import React, { useState, useRef, useEffect } from 'react';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  tooltipClassName?: string;
  disabled?: boolean;
  maxWidth?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = 'top',
  delay = 300,
  className = '',
  tooltipClassName = '',
  disabled = false,
  maxWidth = '200px',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const targetRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate position when tooltip becomes visible
  useEffect(() => {
    if (isVisible && targetRef.current && tooltipRef.current) {
      calculatePosition();
    }
  }, [isVisible]);

  // Clear timer when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (disabled) {
    return <>{children}</>;
  }

  const calculatePosition = () => {
    if (!targetRef.current || !tooltipRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const newPosition = { top: 0, left: 0 };

    // Calculate position based on the specified position prop
    switch (position) {
      case 'top':
        newPosition.left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        newPosition.top = targetRect.top - tooltipRect.height - 8;
        break;
      case 'right':
        newPosition.left = targetRect.right + 8;
        newPosition.top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        break;
      case 'bottom':
        newPosition.left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        newPosition.top = targetRect.bottom + 8;
        break;
      case 'left':
        newPosition.left = targetRect.left - tooltipRect.width - 8;
        newPosition.top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        break;
    }

    // Adjust position to keep tooltip within viewport
    const padding = 10;
    newPosition.left = Math.max(padding, Math.min(newPosition.left, window.innerWidth - tooltipRect.width - padding));
    newPosition.top = Math.max(padding, Math.min(newPosition.top, window.innerHeight - tooltipRect.height - padding));

    setTooltipPosition(newPosition);
  };

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisible(false);
  };

  // Get arrow position classes
  const getArrowClasses = () => {
    switch (position) {
      case 'top': return 'bottom-[-6px] left-1/2 transform -translate-x-1/2 border-t-gray-800 border-l-transparent border-r-transparent border-b-transparent';
      case 'right': return 'left-[-6px] top-1/2 transform -translate-y-1/2 border-r-gray-800 border-t-transparent border-b-transparent border-l-transparent';
      case 'bottom': return 'top-[-6px] left-1/2 transform -translate-x-1/2 border-b-gray-800 border-l-transparent border-r-transparent border-t-transparent';
      case 'left': return 'right-[-6px] top-1/2 transform -translate-y-1/2 border-l-gray-800 border-t-transparent border-b-transparent border-r-transparent';
    }
  };

  return (
    <div 
      className={`inline-block relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={targetRef}
    >
      {children}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            fixed z-50 px-3 py-2 text-sm font-medium text-white bg-gray-800 rounded shadow-md
            animate-fade-in opacity-95
            ${tooltipClassName}
          `}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            maxWidth
          }}
        >
          {content}
          <div 
            className={`absolute w-0 h-0 border-4 ${getArrowClasses()}`} 
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip; 