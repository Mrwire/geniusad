'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ShadcnKineticTagline() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
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

  const wordVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const geniusVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      WebkitTextStroke: '1px #D9D9D9',
      color: 'transparent'
    },
    visible: {
      opacity: 1,
      scale: 1,
      WebkitTextStroke: '1px #D9D9D9',
      color: 'transparent',
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    hover: {
      WebkitTextStroke: '0px #D9D9D9',
      color: '#D9D9D9',
      backgroundImage: 'linear-gradient(45deg, #D9D9D9, #F5F5F5)',
      backgroundClip: 'text',
      transition: {
        duration: 0.3
      }
    }
  };

  const wordGlowVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: [0.8, 1.05, 1],
      transition: {
        duration: 1.2,
        times: [0, 0.7, 1],
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="min-h-[50vh] flex items-center justify-center bg-black py-20"
    >
      <motion.div
        className="text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2 
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-heading font-bold",
            "flex flex-wrap justify-center items-center gap-x-4 gap-y-2"
          )}
        >
          <motion.span
            variants={geniusVariants}
            whileHover="hover"
            className="relative inline-block cursor-pointer"
          >
            Genius
          </motion.span>
          <motion.span variants={wordVariants}>
            it's not just a
          </motion.span>
          <motion.span 
            variants={wordGlowVariants}
            className="relative inline-block"
          >
            <span className="relative z-10">word</span>
            <span className="absolute inset-0 bg-[#D9D9D9]/20 blur-md rounded-full z-0 animate-pulse"></span>
          </motion.span>
        </motion.h2>
      </motion.div>
    </section>
  );
}
