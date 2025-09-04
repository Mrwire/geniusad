'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ShadcnValuesSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Values to display in the word cloud
  const values = [
    "SAVOIR-FAIRE",
    "TECHNOLOGIE",
    "INNOVATION",
    "CRÉATIVITÉ",
    "PASSION"
  ];

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

  const wordCloudVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const paragraphVariants = {
    hidden: { 
      opacity: 0,
      x: -30
    },
    visible: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: 1
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="min-h-[70vh] flex flex-col items-center justify-center bg-black py-24 px-4"
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
          NOS VALEURS
        </motion.h2>

        {/* Word Cloud */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-8 md:gap-x-10 md:gap-y-12 mb-16"
          variants={wordCloudVariants}
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={wordVariants}
              className={cn(
                "text-2xl md:text-3xl lg:text-5xl font-heading font-bold text-[#D9D9D9]",
                index % 2 === 0 ? "text-[#D9D9D9]" : "text-white/80"
              )}
              whileHover={{ 
                scale: 1.05, 
                color: "#FFFFFF",
                transition: { duration: 0.3 }
              }}
            >
              {value}
            </motion.div>
          ))}
        </motion.div>

        {/* Intro Paragraph */}
        <motion.div
          variants={paragraphVariants}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-lg text-[#D9D9D9] leading-relaxed">
            Chez Genius Ad District, nos valeurs sont le fondement de notre approche. 
            Nous combinons savoir-faire et innovation pour créer des expériences uniques, 
            portées par notre passion et notre créativité. Notre expertise technologique 
            nous permet de repousser constamment les limites de ce qui est possible.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
