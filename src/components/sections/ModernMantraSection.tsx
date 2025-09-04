'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

interface ModernMantraSectionProps {
  className?: string;
}

export function ModernMantraSection({ className = '' }: ModernMantraSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  // Core philosophy points
  const philosophyPoints = [
    {
      number: '01',
      title: 'Créativité Audacieuse',
      description: 'Nous repoussons les limites de la créativité pour concevoir des expériences qui captent l\'attention et inspirent l\'action.'
    },
    {
      number: '02',
      title: 'Stratégie Perspicace',
      description: 'Chaque décision est guidée par une compréhension profonde des objectifs commerciaux et du comportement des consommateurs.'
    },
    {
      number: '03',
      title: 'Impact Mesurable',
      description: 'Nous générons des résultats concrets et mesurables qui transforment vos objectifs en succès tangibles et durables.'
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className={`relative py-24 bg-black overflow-hidden ${className}`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
      
      {/* Floating decorative circles */}
      <motion.div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full border border-white/10"
        animate={{ 
          x: [0, 10, 0],
          y: [0, -10, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-white/5"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 20, 0],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-16 text-center"
          style={{ opacity, scale }}
        >
          <h2 className="inline-block text-sm uppercase tracking-widest mb-4 border-b border-white/30 pb-2">Notre Philosophie</h2>
          <h3 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Genius, <span className="font-light italic">it's not just a word</span>
          </h3>
          <p className="max-w-2xl mx-auto text-white/70 text-lg">
            Genius n'est pas seulement un nom, c'est notre engagement à insuffler de l'excellence et de 
            l'innovation dans chaque projet que nous entreprenons.
          </p>
        </motion.div>
        
        {/* Three column layout with philosophy points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {philosophyPoints.map((point, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="group"
            >
              <div className="relative bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-xl p-8 h-full transition-all duration-500 
                group-hover:bg-white/[0.06] group-hover:border-white/20 group-hover:shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-bold">{point.number}</div>
                  <div className="w-12 h-px bg-gradient-to-r from-white/50 to-white/0"></div>
                </div>
                <h4 className="text-xl font-semibold mb-4 group-hover:text-white transition-colors">{point.title}</h4>
                <p className="text-white/60 group-hover:text-white/80 transition-colors">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Vertical line dividers between cards (visible only on desktop) */}
        <div className="hidden md:block absolute top-1/2 left-1/3 h-64 w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0 -translate-y-1/2"></div>
        <div className="hidden md:block absolute top-1/2 left-2/3 h-64 w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0 -translate-y-1/2"></div>
      </div>
      
      {/* Abstract geometric shape */}
      <div className="absolute bottom-0 right-0 w-full h-48 opacity-10 pointer-events-none">
        <Image 
          src="/item_images/abstract-geometric.png" 
          alt="Abstract pattern"
          fill
          className="object-contain object-right-bottom"
        />
      </div>
    </section>
  );
}

export default ModernMantraSection;
