'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ShadcnAmbitionSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const lineVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: (i: number) => ({ 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.3 + (i * 0.2)
      }
    })
  };

  // Ambition text lines
  const ambitionLines = [
    "DEVENIR LA RÉFÉRENCE QUALITÉ",
    "« 100 % MADE IN MOROCCO »",
    "POUR LE MAROC ET POUR",
    "L'AFRIQUE"
  ];

  return (
    <section 
      ref={ref}
      className="min-h-[60vh] flex flex-col items-center justify-center bg-black py-24 px-4"
    >
      <motion.div
        className="container mx-auto max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2 
          variants={titleVariants}
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-16 text-center"
        >
          NOTRE GRANDE AMBITION
        </motion.h2>

        {/* Ambition Statement */}
        <div className="flex flex-col items-center justify-center">
          {ambitionLines.map((line, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={lineVariants}
              className={cn(
                "text-2xl md:text-3xl lg:text-5xl font-heading font-bold text-center mb-2",
                index === 1 ? "text-[#D9D9D9]" : "text-white",
                index === 3 ? "text-[#D9D9D9]" : ""
              )}
            >
              {line === "MAROC" || line === "L'AFRIQUE" ? (
                <span className="font-extrabold">{line}</span>
              ) : (
                line
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
