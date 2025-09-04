'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/atoms/Typography';
import { useLocale } from 'next-intl';
import FloatingPaths from '@/components/ui/floating-paths';

const EnhancedHero = () => {
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  const headingY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });
  
  // Set loaded state after mounting to trigger animations
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  const titles = {
    fr: {
      tagline: "GÉNIE CRÉATIF, IMPACT STRATÉGIQUE",
      heading: "Genius Ad District",
      subheading: "Nous réinventons les expériences de marque à travers une fusion unique de créativité audacieuse et d'intelligence stratégique.",
      cta1: "DÉCOUVRIR NOTRE UNIVERS",
      cta2: "NOUS CONTACTER",
    },
    en: {
      tagline: "CREATIVE GENIUS, STRATEGIC IMPACT",
      heading: "Genius Ad District",
      subheading: "We reinvent brand experiences through a unique fusion of bold creativity and strategic intelligence.",
      cta1: "DISCOVER OUR UNIVERSE",
      cta2: "CONTACT US",
    }
  };
  
  const content = locale === 'fr' ? titles.fr : titles.en;
  
  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Parallax Background avec FloatingPaths */}
      <motion.div 
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ 
          y: smoothY,
          scale: smoothScale,
          opacity
        }}
      >
        {/* Fond noir avec gradient */}
        <div className="absolute inset-0 bg-black z-0" />
        
        {/* Chemins flottants animés formant un G */}
        <FloatingPaths />
        
        {/* Overlay gradient pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />
      </motion.div>
      
      {/* Animated Content */}
      <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center">
        <AnimatePresence>
          {loaded && (
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ opacity: headingOpacity, y: headingY }}
              >
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Typography variant="h6" className="text-cyan mb-4">
                      {content.tagline}
                    </Typography>
                  </motion.div>
                
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <Typography variant="h1" className="text-6xl md:text-8xl font-bold leading-tight">
                      {content.heading}
                    </Typography>
                  </motion.div>
                
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Typography variant="body" color="muted" className="text-xl md:text-2xl max-w-3xl">
                      {content.subheading}
                    </Typography>
                  </motion.div>
                
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="pt-4 flex flex-wrap gap-4"
                  >
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-gray-200"
                      asChild
                    >
                      <a href="/about">{content.cta1}</a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white text-white hover:bg-white/10"
                      asChild
                    >
                      <a href="/contact">{content.cta2}</a>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ opacity: headingOpacity }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm uppercase tracking-widest mb-2">
              {locale === 'fr' ? 'Découvrir' : 'Discover'}
            </span>
            <motion.div 
              className="w-0.5 h-8 bg-white/50 mt-2"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              style={{ transformOrigin: "top" }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Overlay Lines - Apple Design System style */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="w-full h-full grid grid-cols-2 md:grid-cols-4 opacity-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-r border-white/20 h-full" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
