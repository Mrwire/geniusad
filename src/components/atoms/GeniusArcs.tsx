'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const GeniusArcs = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Create a small delay to ensure DOM elements are fully rendered
    const timer = setTimeout(() => {
      const paths = svgRef.current?.querySelectorAll('path');
      if (!paths || paths.length === 0) return;
      
      paths.forEach(path => {
        try {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
        } catch (err) {
          console.warn('Failed to get path length', err);
        }
      });
      
      gsap.to([...paths], {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.2,
        ease: 'power3.inOut',
      });
    }, 100); // Small delay of 100ms
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <svg 
        ref={svgRef}
        className="absolute w-full h-full" 
        viewBox="0 0 1440 900" 
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M100,450 A350,350 0 1,1 800,450"
          fill="none"
          stroke="rgba(192, 192, 192, 0.15)"
          strokeWidth="1"
          data-gsap="arc"
        />
        <path
          d="M150,450 A300,300 0 1,1 750,450"
          fill="none"
          stroke="rgba(192, 192, 192, 0.15)"
          strokeWidth="1"
          data-gsap="arc"
        />
        <path
          d="M200,450 A250,250 0 1,0 700,450"
          fill="none"
          stroke="rgba(192, 192, 192, 0.20)"
          strokeWidth="1.5"
          data-gsap="arc"
        />
        <path
          d="M-100,550 A550,550 0 0,1 1000,550"
          fill="none"
          stroke="rgba(192, 192, 192, 0.10)"
          strokeWidth="1"
          data-gsap="arc"
        />
        <path
          d="M200,800 A400,400 0 0,0 1000,800"
          fill="none"
          stroke="rgba(192, 192, 192, 0.12)"
          strokeWidth="1"
          data-gsap="arc"
        />
        <path
          d="M1340,200 A400,400 0 0,0 800,200"
          fill="none"
          stroke="rgba(192, 192, 192, 0.08)"
          strokeWidth="1"
          data-gsap="arc"
        />
        <path
          d="M1440,300 A600,600 0 0,0 400,300"
          fill="none"
          stroke="rgba(192, 192, 192, 0.05)"
          strokeWidth="0.5"
          data-gsap="arc"
        />
        {/* G-shaped arc, subtle hint at Genius logo */}
        <path
          d="M600,450 A150,150 0 1,1 600,451 L600,500 L700,500"
          fill="none"
          stroke="rgba(192, 192, 192, 0.25)"
          strokeWidth="2"
          data-gsap="arc"
        />
      </svg>
    </div>
  );
}; 