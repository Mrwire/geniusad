'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LampEffect } from '@/components/ui/lamp-effect';

interface GeniusMantraSectionProps {
  className?: string;
}

export function GeniusMantraSection({ className = '' }: GeniusMantraSectionProps) {
  // Points forts qui définissent "Genius"
  const geniusPoints = [
    {
      title: 'Créativité audacieuse',
      description: 'Nous repoussons les limites de la créativité pour créer des campagnes qui captent l\'attention et inspirent l\'action.'
    },
    {
      title: 'Stratégie perspicace',
      description: 'Chaque décision est guidée par une compréhension profonde des objectifs commerciaux et du comportement des consommateurs.'
    },
    {
      title: 'Impact mesurable',
      description: 'Nous générons des résultats concrets et mesurables qui transforment les objectifs en succès tangibles.'
    }
  ];

  // Animation variants pour les cartes
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className={`py-24 bg-black ${className}`}>
      <LampEffect
        title={<>Genius, <span className="text-cyan-400">it's not just a word</span></>}
        subtitle="NOTRE PHILOSOPHIE"
        description="Genius n'est pas seulement un nom, c'est notre engagement à insuffler de l'excellence et de l'innovation dans chaque projet que nous entreprenons."
        highlightColor="cyan"
        glowSize="large"
        textHighlight={false}
        className="mb-16"
      >
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 container mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {geniusPoints.map((point, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 hover:border-cyan-900 transition-colors duration-300"
              variants={itemVariants}
            >
              <div className="text-cyan-400 mb-2 text-3xl font-semibold">{(index + 1).toString().padStart(2, '0')}</div>
              <h3 className="text-xl font-bold text-white mb-3">{point.title}</h3>
              <p className="text-gray-400">{point.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </LampEffect>
    </section>
  );
}

export default GeniusMantraSection;
