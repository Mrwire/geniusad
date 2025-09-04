'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Building, Zap, Rocket, Gamepad2, Paintbrush } from 'lucide-react';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] as Easing }
  }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const cardAnimation: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] as Easing }
  }
};

// Subsidiaries data with black & white theme
const subsidiariesData = [
  {
    id: 'genius',
    name: 'GENIUS AD DISTRICT',
    shortName: 'GENIUS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_genius_black.png',
    description: {
      fr: 'Au cœur de l\'écosystème, GENIUS AD DISTRICT orchestre l\'ensemble des expertises.',
      en: 'At the heart of the ecosystem, GENIUS AD DISTRICT orchestrates all expertise.'
    },
    expertise: {
      fr: ['Stratégie', 'Innovation', 'Direction Créative', 'Conception Globale'],
      en: ['Strategy', 'Innovation', 'Creative Direction', 'Global Design']
    },
    role: {
      fr: 'CONCEPTEUR',
      en: 'DESIGNER'
    },
    icon: Building
  },
  {
    id: 'mps',
    name: 'MPS',
    shortName: 'MPS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_mps_black.png',
    description: {
      fr: 'Experte en production événementielle, MPS transforme les concepts en réalités tangibles.',
      en: 'Expert in event production, MPS transforms concepts into tangible realities.'
    },
    expertise: {
      fr: ['Production Technique', 'Logistique', 'Gestion de Projet'],
      en: ['Technical Production', 'Logistics', 'Project Management']
    },
    role: {
      fr: 'PRODUCTEUR',
      en: 'PRODUCER'
    },
    icon: Zap
  },
  {
    id: 'labrigad',
    name: 'LABRIG\'AD',
    shortName: 'LABRIG\'AD',
    logo: '/item_images/logo_filiale_rectangulaire/logo_labrigad_black.png',
    description: {
      fr: 'Spécialiste du déploiement terrain, LABRIG\'Ad maximise l\'impact de votre marque.',
      en: 'Field deployment specialist, LABRIG\'Ad maximizes your brand\'s impact.'
    },
    expertise: {
      fr: ['Street Marketing', 'Activation Terrain', 'Déploiement'],
      en: ['Street Marketing', 'Field Activation', 'Deployment']
    },
    role: {
      fr: 'ACTIVATEUR',
      en: 'ACTIVATOR'
    },
    icon: Rocket
  },
  {
    id: 'gamius',
    name: 'GAMIUS',
    shortName: 'GAMIUS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_gamius_black.png',
    description: {
      fr: 'Gamius transforme vos objectifs en expériences ludiques et engageantes.',
      en: 'Gamius transforms your objectives into playful and engaging experiences.'
    },
    expertise: {
      fr: ['Gamification', 'Expériences Interactives', 'Technologies Immersives'],
      en: ['Gamification', 'Interactive Experiences', 'Immersive Technologies']
    },
    role: {
      fr: 'IMMERSEUR',
      en: 'IMMERSIVE'
    },
    icon: Gamepad2
  },
  {
    id: 'moujeleell',
    name: 'MOOJ&LEEL',
    shortName: 'MOOJ&LEEL',
    logo: '/item_images/logo_filiale_rectangulaire/logo_mooj&leel_black.png',
    description: {
      fr: 'Atelier de mobilier sur mesure, Mooj & Leel façonne des pièces uniques.',
      en: 'Custom furniture workshop, Mooj & Leel shapes unique pieces.'
    },
    expertise: {
      fr: ['Design d\'Espace', 'Mobilier Sur Mesure', 'Aménagement'],
      en: ['Space Design', 'Custom Furniture', 'Interior Design']
    },
    role: {
      fr: 'DESIGNER',
      en: 'DESIGNER'
    },
    icon: Paintbrush
  }
];

export default function GroupSynergySection() {
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  const [activeSubsidiary, setActiveSubsidiary] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  // Type-safe locale access
  const currentLocale = (locale === 'en' ? 'en' : 'fr') as 'fr' | 'en';
  
  const content = {
    title: currentLocale === 'fr' ? 'Synergie du Groupe' : 'Group Synergy',
    subtitle: currentLocale === 'fr' ? 'Écosystème Intégré d\'Excellence' : 'Integrated Ecosystem of Excellence',
    description: currentLocale === 'fr' ?
      'Notre force réside dans la synergie parfaite entre nos filiales, créant un écosystème complet qui transforme les idées en succès tangibles.' :
      'Our strength lies in the perfect synergy between our subsidiaries, creating a complete ecosystem that transforms ideas into tangible success.',
    cta: currentLocale === 'fr' ? 'Une expertise, une excellence' : 'One expertise, one excellence'
  };

  // Auto-highlight cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSubsidiary((prev) => {
        const currentIndex = subsidiariesData.findIndex(sub => sub.id === prev);
        const nextIndex = (currentIndex + 1) % subsidiariesData.length;
        return subsidiariesData[nextIndex].id;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="relative py-20 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-20" variants={fadeInUp}>
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black tracking-tight"
            variants={fadeInUp}
          >
            {content.title}
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8 font-light"
            variants={fadeInUp}
          >
            {content.subtitle}
          </motion.p>
          <motion.div 
            className="w-24 h-1 bg-black mx-auto rounded-full"
            variants={fadeInUp}
          />
        </motion.div>

        {/* Subsidiaries Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16"
          variants={staggerContainer}
        >
          {subsidiariesData.map((subsidiary, index) => {
            const IconComponent = subsidiary.icon;
            const isActive = activeSubsidiary === subsidiary.id;
            const isHovered = hoveredCard === subsidiary.id;
            
            return (
              <motion.div 
                key={subsidiary.id}
                className={`group relative bg-white border-2 transition-all duration-500 rounded-2xl overflow-hidden
                  ${isActive ? 'border-black shadow-2xl scale-105' : 'border-gray-200 hover:border-gray-400'}
                  ${isHovered ? 'shadow-xl' : 'shadow-lg'}`}
                variants={cardAnimation}
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
                onMouseEnter={() => {
                  setHoveredCard(subsidiary.id);
                  setActiveSubsidiary(subsidiary.id);
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                }}
              >
                {/* Card Content */}
                <div className="p-8 text-center h-full flex flex-col justify-between">
                  {/* Logo */}
                  <div className="relative w-full h-16 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={subsidiary.logo}
                      alt={subsidiary.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-black tracking-wide">
                        {subsidiary.shortName}
                      </h3>
                      <p className="text-xs font-semibold mb-4 text-gray-800 tracking-widest">
                        {subsidiary.role[currentLocale]}
                      </p>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {subsidiary.description[currentLocale]}
                      </p>
                      
                      {/* Expertise Tags */}
                      <div className="mb-6">
                        {subsidiary.expertise[currentLocale].map((skill: string, idx: number) => (
                          <span 
                            key={idx}
                            className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full mr-1 mb-1 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Icon */}
                    <motion.div 
                      className="flex justify-center"
                      animate={{ 
                        scale: isActive ? [1, 1.2, 1] : 1,
                        rotate: isHovered ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <IconComponent 
                        size={32} 
                        className={`transition-all duration-300 ${
                          isActive ? 'text-black' : 'text-gray-400 group-hover:text-black'
                        }`}
                      />
                    </motion.div>
                  </div>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Description */}
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={fadeInUp}
        >
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            {content.description}
          </p>
          
          {/* Bottom accent */}
          <motion.div 
            className="flex justify-center items-center space-x-4"
            variants={fadeInUp}
          >
            <div className="w-8 h-0.5 bg-black rounded-full"></div>
            <span className="text-sm font-semibold text-black tracking-wider uppercase">
              {content.cta}
            </span>
            <div className="w-8 h-0.5 bg-black rounded-full"></div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
