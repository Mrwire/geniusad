'use client';

import React, { useState, useEffect } from 'react';

interface BreakpointInfo {
  name: string;
  color: string;
  minWidth: number;
  maxWidth?: number;
}

/**
 * ResponsiveHelper displays the current breakpoint in the corner of the screen
 * This is a development helper and should not be used in production
 */
export default function ResponsiveHelper() {
  const [isVisible, setIsVisible] = useState(true);
  const [breakpoint, setBreakpoint] = useState<string>('');
  const [windowWidth, setWindowWidth] = useState(0);

  const breakpoints: BreakpointInfo[] = [
    { name: 'xs', color: '#ef4444', minWidth: 0, maxWidth: 639 },     // red
    { name: 'sm', color: '#f97316', minWidth: 640, maxWidth: 767 },   // orange
    { name: 'md', color: '#eab308', minWidth: 768, maxWidth: 1023 },  // yellow
    { name: 'lg', color: '#22c55e', minWidth: 1024, maxWidth: 1279 }, // green
    { name: 'xl', color: '#3b82f6', minWidth: 1280, maxWidth: 1535 }, // blue
    { name: '2xl', color: '#8b5cf6', minWidth: 1536 },                // purple
  ];

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      const currentBreakpoint = breakpoints.find(
        bp => width >= bp.minWidth && (!bp.maxWidth || width <= bp.maxWidth)
      );
      
      if (currentBreakpoint) {
        setBreakpoint(currentBreakpoint.name);
      }
    };

    // Initial check
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Only render in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const currentBreakpointInfo = breakpoints.find(bp => bp.name === breakpoint);
  const bgColor = currentBreakpointInfo?.color || '#gray';

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return (
      <button
        onClick={toggle}
        className="fixed bottom-2 right-2 z-50 bg-gray-800 text-white text-xs p-1 rounded-full w-6 h-6 flex items-center justify-center opacity-50 hover:opacity-100"
        aria-label="Show responsive helper"
      >
        +
      </button>
    );
  }

  return (
    <div className="fixed bottom-2 right-2 z-50 flex flex-col items-end">
      <div
        className="bg-gray-800 text-white text-xs rounded-lg p-2 shadow-lg flex flex-col items-center"
        style={{ backgroundColor: bgColor }}
      >
        <button 
          onClick={toggle}
          className="absolute -top-1 -right-1 bg-gray-700 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
          aria-label="Hide responsive helper"
        >
          ×
        </button>
        <div className="font-mono">
          <span className="font-bold">{breakpoint}</span>
          <span className="ml-2">{windowWidth}px</span>
        </div>
        <div className="mt-1 flex gap-1">
          {breakpoints.map((bp) => (
            <div
              key={bp.name}
              className={`w-4 h-4 rounded-sm ${breakpoint === bp.name ? 'ring-2 ring-white' : ''}`}
              style={{ backgroundColor: bp.color }}
              title={`${bp.name}: ${bp.minWidth}px${bp.maxWidth ? ` - ${bp.maxWidth}px` : ' +'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 