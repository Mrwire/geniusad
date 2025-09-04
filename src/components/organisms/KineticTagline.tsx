'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const KineticTagline: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation variants
  const strokeToFill = {
    initial: { 
      fillOpacity: 0,
      stroke: "#D9D9D9",
      strokeWidth: 2
    },
    hover: { 
      fillOpacity: 1, 
      fill: "url(#silver-gradient)",
      strokeWidth: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 px-4 md:py-28 relative overflow-hidden bg-black">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <h2 className={cn(
            "text-3xl md:text-5xl font-bold text-white text-center",
            "tracking-tight leading-tight max-w-4xl"
          )}>
            <span>Genius, it's not just a </span>
            <motion.span
              initial="initial"
              whileHover="hover"
              onHoverStart={() => setIsAnimating(true)}
              onHoverEnd={() => setIsAnimating(false)}
              className="inline-block relative"
            >
              <svg 
                viewBox="0 0 120 40" 
                width="120" 
                height="40" 
                className="inline-block"
              >
                <defs>
                  <linearGradient id="silver-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D9D9D9" />
                    <stop offset="50%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#D9D9D9" />
                  </linearGradient>
                </defs>
                <motion.text 
                  x="10" 
                  y="30" 
                  variants={strokeToFill}
                  className="text-3xl md:text-5xl font-bold"
                >
                  word
                </motion.text>
              </svg>
            </motion.span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}; 