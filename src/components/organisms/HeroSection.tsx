"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogoCarousel } from '@/components/ui/LogoCarousel';
import { clientLogos } from '@/components/ui/client-logos';

interface HeroSectionProps {
  backgroundImage?: string;
  overlay?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage = '/item_images/hero-bg.jpg',
  overlay = true
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0" style={{ position: 'relative' }}>
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
      <div className="relative z-20 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            L'agence qui transforme vos idées en impact publicitaire
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Genius crée des campagnes publicitaires qui résonnent avec votre audience et amplifient votre message.
          </p>
          <div className="pt-4">
            <Button variant="primary" size="lg">
              Découvrir notre univers
            </Button>
          </div>

          {/* Clients section - refined */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="pt-6 mt-12 border-t border-white/10"
          >
            <div className="text-white/50 text-xs tracking-wider mb-5 font-light">
              ILS NOUS FONT CONFIANCE
            </div>
            <div className="flex justify-center">
              <LogoCarousel logos={clientLogos} columnCount={2} />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 1.5, duration: 1 },
          y: { delay: 1.5, duration: 1.5, repeat: Infinity, repeatType: "loop" }
        }}
      >
        <ChevronDown className="w-10 h-10 text-white/70" />
      </motion.div>
    </section>
  );
};

export default HeroSection; 