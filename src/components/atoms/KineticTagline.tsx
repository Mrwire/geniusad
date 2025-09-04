'use client';

import { useEffect, useRef } from 'react';
import { gsapUtils } from './GsapAnimations';

interface KineticTaglineProps {
  text: string;
  highlight?: string;
  className?: string;
}

export const KineticTagline = ({ 
  text = '100% MADE IN MOROCCO', 
  highlight = 'MADE IN', 
  className = '' 
}: KineticTaglineProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll('path');
      paths.forEach(path => {
        gsapUtils.animateStrokeToFill(path, 2);
      });
    }
  }, []);

  // Split the text to highlight specific words
  const parts = text.split(highlight);
  const before = parts[0];
  const after = parts[1] || '';

  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8">
          {before}
          <span className="relative inline-block">
            <span className="opacity-0">{highlight}</span>
            <svg 
              ref={svgRef}
              className="absolute top-0 left-0 w-full h-full" 
              viewBox={`0 0 ${highlight.length * 30} 50`}
              preserveAspectRatio="xMidYMid meet"
            >
              <path
                d={`M10,40 L${highlight.length * 30 - 10},40`}
                fill="none"
                stroke="#D9D9D9"
                strokeWidth="1"
                data-gsap="stroke-to-fill"
              />
              <text
                x="50%"
                y="35"
                textAnchor="middle"
                fontSize="30"
                fontWeight="bold"
                stroke="#D9D9D9"
                strokeWidth="1"
                fill="transparent"
                data-gsap="stroke-to-fill"
              >
                {highlight}
              </text>
            </svg>
          </span>
          {after}
        </h2>
      </div>
      
      <div className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl text-center">
        <span data-split="chars" data-gsap="fade-in">
          Nous cultivons l'excellence créative marocaine pour offrir des solutions globales à la hauteur des standards internationaux.
        </span>
      </div>
    </div>
  );
}; 