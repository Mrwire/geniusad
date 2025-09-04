'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ShadcnHeroSectionProps {
  backgroundImage?: string;
  overlay?: boolean;
}

export default function ShadcnHeroSection({
  backgroundImage = '/item_images/hero-bg.jpg',
  overlay = true
}: ShadcnHeroSectionProps) {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 1.5, 
        duration: 1 
      }
    }
  };

  const bounceAnimation = {
    y: [0, 10, 0],
    transition: {
      delay: 1.5,
      duration: 1.5,
      repeat: Infinity,
      repeatType: "loop" as const
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          priority
          className="object-cover"
        />
        {overlay && <div className="absolute inset-0 bg-black/70 z-10"></div>}
      </div>

      {/* Decorative Arcs */}
      <motion.div 
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <motion.div 
          className="absolute -left-20 -bottom-40 w-96 h-96 border border-neutral-600/30 rounded-full"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute -right-20 -top-40 w-80 h-80 border border-neutral-600/20 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-20 text-center px-6 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className={cn(
            "uppercase font-heading font-extrabold text-4xl md:text-6xl lg:text-7xl text-white",
            "leading-tight tracking-tight mb-6"
          )}
        >
          AGENCE DE<br />
          COMMUNICATION ET<br />
          PRODUCTION
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xl text-neutral-300 max-w-2xl mx-auto mb-8"
        >
          ÉVÉNEMENTIEL CORPORATE ET GRAND PUBLIC · MARKETING ALTERNATIF · ROADSHOW ET ACTIVATIONS
        </motion.p>
        
        <motion.div variants={itemVariants} className="pt-4">
          <Button 
            variant="primary" 
            size="lg"
            className="bg-[#D9D9D9] text-black hover:bg-white transition-colors"
          >
            Découvrir notre univers
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
        {...bounceAnimation}
      >
        <ChevronDown className="w-10 h-10 text-white/70" />
      </motion.div>
    </section>
  );
}
