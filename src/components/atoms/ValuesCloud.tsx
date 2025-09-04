'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Typography } from './Typography';

interface ValueItem {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  delay?: number;
}

interface ValuesCloudProps {
  centerValue?: string;
  values: ValueItem[];
  className?: string;
}

export const ValuesCloud = ({ 
  centerValue = 'ESPRIT',
  values,
  className = ''
}: ValuesCloudProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const valueElements = containerRef.current.querySelectorAll('.value-item');
    
    gsap.set(valueElements, { 
      opacity: 0,
      scale: 0.5,
      y: 20
    });
    
    gsap.to(valueElements, {
      opacity: 1,
      scale: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'back.out(1.7)',
      delay: 0.3
    });
    
    // Create subtle floating animation
    valueElements.forEach((el) => {
      const randomX = Math.random() * 10 - 5;
      const randomY = Math.random() * 10 - 5;
      const randomDuration = 3 + Math.random() * 2;
      
      gsap.to(el, {
        x: randomX,
        y: randomY,
        duration: randomDuration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, []);

  const sizeClasses = {
    sm: 'text-base md:text-lg opacity-60',
    md: 'text-lg md:text-xl opacity-75',
    lg: 'text-xl md:text-2xl opacity-85',
    xl: 'text-2xl md:text-3xl opacity-95',
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[400px] md:h-[500px] ${className}`}
    >
      {/* Center value */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Typography 
          variant="h2" 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white value-item"
          style={{ transitionDelay: '0ms' }}
        >
          {centerValue}
        </Typography>
      </div>

      {/* Surrounding values */}
      {values.map((value, index) => (
        <div
          key={index}
          className={`absolute value-item ${sizeClasses[value.size || 'md']}`}
          style={{
            top: value.position?.top,
            left: value.position?.left,
            right: value.position?.right,
            bottom: value.position?.bottom,
            transitionDelay: `${(value.delay || 0) * 100}ms`,
          }}
        >
          <Typography 
            variant="body" 
            className="text-silver font-medium"
          >
            {value.text}
          </Typography>
        </div>
      ))}
    </div>
  );
}; 