'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';

// Types
interface SubsidiaryData {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color: string;
  description: string;
  link: string;
  linkText: string;
  expertise: string[];
  role: string;
}

// Données des filiales
const subsidiariesData: SubsidiaryData[] = [
  {
    id: 'genius',
    name: 'GENIUS AD DISTRICT',
    shortName: 'GENIUS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_genius_black.png',
    color: '#000000',
    description: 'Au cœur de l\'écosystème, GENIUS AD DISTRICT orchestre l\'ensemble des expertises. Notre vision stratégique et créative coordonne les forces de chaque filiale pour livrer des solutions complètes et innovantes.',
    link: '/',
    linkText: 'Découvrir notre écosystème',
    expertise: ['Stratégie', 'Innovation', 'Direction Créative', 'Conception Globale'],
    role: 'CONCEPTEUR',
  },
  {
    id: 'mps',
    name: 'MPS',
    shortName: 'MPS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_mps_black.png',
    color: '#E30613',
    description: 'Experte en production événementielle, MPS transforme les concepts en réalités tangibles grâce à son expertise technique et logistique inégalée, garantissant des expériences impeccables.',
    link: '/filiales/mps',
    linkText: 'Explorer MPS',
    expertise: ['Production Technique', 'Logistique', 'Gestion de Projet', 'Exécution'],
    role: 'PRODUCTEUR',
  },
  {
    id: 'labrigad',
    name: 'LABRIG\'AD',
    shortName: 'LABRIG\'AD',
    logo: '/item_images/logo_filiale_rectangulaire/logo_labrigad_black.png',
    color: '#FF0000',
    description: 'Spécialiste du déploiement terrain, LABRIG\'Ad maximise l\'impact de votre marque à travers des activations impactantes et des interactions directes avec votre public cible.',
    link: '/filiales/labrigad',
    linkText: 'Découvrir LABRIG\'Ad',
    expertise: ['Street Marketing', 'Activation Terrain', 'Déploiement', 'Promotion'],
    role: 'ACTIVATEUR',
  },
  {
    id: 'gamius',
    name: 'GAMIUS',
    shortName: 'GAMIUS',
    logo: '/item_images/logo_filiale_rectangulaire/logo_gamius_black.png',
    color: '#FFD700',
    description: 'Gamius transforme vos objectifs en expériences ludiques et engageantes, créant des interactions mémorables avec votre audience grâce à la gamification et aux technologies immersives.',
    link: `/${typeof window !== 'undefined' ? (window.location.pathname.startsWith('/en') ? 'subsidiaries' : 'filiales') : 'filiales'}/gamiusgroup`,
    linkText: 'Jouer avec Gamius',
    expertise: ['Gamification', 'Expériences Interactives', 'Technologies Immersives', 'Engagement'],
    role: 'IMMERSEUR',
  },
  {
    id: 'moujeleell',
    name: 'MOOJ&LEEL',
    shortName: 'MOOJ&LEEL',
    logo: '/item_images/logo_filiale_rectangulaire/logo_mooj&leel_black.png',
    color: '#000000',
    description: 'Atelier de mobilier sur mesure, Mouje & Leell façonne des pièces uniques et des aménagements d\'espace qui allient fonctionnalité et design, pour des expériences sensorielles inoubliables.',
    link: '/filiales/moujeleell',
    linkText: 'Découvrir Mouje & Leell',
    expertise: ['Design d\'Espace', 'Mobilier Sur Mesure', 'Aménagement', 'Expérience Sensorielle'],
    role: 'DESIGNER',
  },
];

// Fonction pour générer des variantes de couleurs basées sur la couleur principale
const getColorVariants = (color: string) => {
  return {
    light: `${color}15`, // 10% d'opacité
    medium: `${color}30`, // 20% d'opacité
    accent: color, // Couleur pleine
  };
};

// Configuration d'animation optimisée
const itemAnimation = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05, // Réduit le délai entre les animations
      duration: 0.4,   // Durée plus courte
      ease: "easeOut"  // Courbe d'animation plus légère
    }
  }),
  hover: {
    y: -5,           // Réduit la distance de l'effet de survol
    transition: {
      duration: 0.2,  // Animation plus rapide au survol
      ease: "easeOut"
    }
  }
};

// Configuration pour l'animation du contenu
const contentAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3
    }
  }
};

export default function HexagonEcosystem() {
  const [activeSubsidiary, setActiveSubsidiary] = useState('genius');
  const [hoveredSubsidiary, setHoveredSubsidiary] = useState<string | null>(null);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  // Animation trigger when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);
  
  // Récupérer les données de la filiale active
  const activeData = subsidiariesData.find(s => s.id === activeSubsidiary);
  
  // Fonction de transition entre filiales
  const handleSubsidiaryChange = (id: string) => {
    setActiveSubsidiary(id);
  };

  return (
    <section 
      ref={sectionRef} 
      id="ecosystem" 
      className="py-32 px-8 relative overflow-hidden bg-white text-center"
    >
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-blue-100 to-purple-100"></div>
        <div className="absolute top-[20%] -right-[5%] w-[15%] h-[15%] rounded-full bg-gradient-to-r from-amber-100 to-orange-100"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[25%] h-[25%] rounded-full bg-gradient-to-r from-green-100 to-teal-100"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="mb-16 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-light text-3xl md:text-4xl tracking-tight leading-tight mb-6 text-gray-900">
            Notre écosystème<br/>
            <span className="font-normal">Un réseau d'expertises complémentaires.</span>
          </h2>
          
          <div className="flex justify-center mb-4">
            <div className="w-12 h-[1px] bg-gray-300"></div>
          </div>
          
          <p className="text-base text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            Chaque entité de Genius Ad District est spécialisée dans son domaine,
            permettant une approche intégrée et innovante de vos projets.
          </p>
        </motion.div>

        {/* Sélecteur de filiales circulaire */}
        <motion.div 
          className="flex justify-center mb-20"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          style={{ willChange: 'transform, opacity' }}
        >
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-4xl">
            {subsidiariesData.map((subsidiary, index) => {
              const colorVariants = getColorVariants(subsidiary.color);
              const isActive = activeSubsidiary === subsidiary.id;
              const isHovered = hoveredSubsidiary === subsidiary.id;
              
              return (
                <motion.div
                  key={subsidiary.id}
                  custom={index}
                  variants={itemAnimation}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover="hover"
                  className="flex flex-col items-center"
                  onMouseEnter={() => setHoveredSubsidiary(subsidiary.id)}
                  onMouseLeave={() => setHoveredSubsidiary(null)}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <motion.button
                    onClick={() => handleSubsidiaryChange(subsidiary.id)}
                    className={`relative flex items-center justify-center rounded-full transition-all duration-300 group`}
                    style={{
                      width: isActive ? '110px' : '80px',
                      height: isActive ? '110px' : '80px',
                      background: isActive 
                        ? `linear-gradient(145deg, white, ${colorVariants.light})` 
                        : 'white',
                      boxShadow: isActive || isHovered
                        ? `0px 15px 25px -5px ${colorVariants.light}, 0 10px 10px -5px ${colorVariants.light}`
                        : '0px 5px 15px rgba(0, 0, 0, 0.05)',
                      border: `1px solid ${isActive ? colorVariants.medium : 'rgba(0,0,0,0.05)'}`
                    }}
                  >
                    <Image
                      src={subsidiary.logo}
                      alt={subsidiary.name}
                      width={isActive ? 70 : 50}
                      height={isActive ? 40 : 30}
                      className="object-contain transition-all duration-300"
                      style={{
                        filter: isActive ? `drop-shadow(0 2px 2px ${colorVariants.light})` : 'none'
                      }}
                      priority={isActive}
                    />
                    
                    {/* Indicateur d'actif */}
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 w-6 h-1 rounded-full"
                        style={{ backgroundColor: colorVariants.accent, marginLeft: '-12px' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                  
                  <div className="mt-3 text-center">
                    <motion.p 
                      className={`text-sm font-medium transition-all duration-300 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}
                      animate={{ 
                        scale: isActive ? 1.05 : 1,
                        y: isActive ? 0 : 0
                      }}
                    >
                      {subsidiary.shortName}
                    </motion.p>
                    
                    <motion.p 
                      className="text-xs text-gray-400 mt-0.5"
                      animate={{ opacity: isActive ? 1 : 0.7 }}
                    >
                      {subsidiary.role}
                    </motion.p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {/* Affichage détaillé de la filiale active */}
        <AnimatePresence mode="wait">
          {activeData && (
            <motion.div
              key={activeData.id}
              className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl"
              variants={contentAnimation}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ 
                boxShadow: `0 10px 30px -5px ${getColorVariants(activeData.color).light}`,
                willChange: 'transform, opacity'
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                <div 
                  className="md:col-span-1 p-8 md:p-10 flex flex-col justify-between"
                  style={{
                    background: `linear-gradient(135deg, ${getColorVariants(activeData.color).light}, white 80%)`
                  }}
                >
                  <div>
                    <div className="flex justify-center md:justify-start mb-6">
                      <Image
                        src={activeData.logo}
                        alt={activeData.name}
                        width={160}
                        height={90}
                        className="object-contain"
                        priority
                      />
                    </div>
                    
                    <div className="text-lg font-medium mb-2 text-gray-900">{activeData.name}</div>
                    <p className="text-sm font-medium text-gray-500 mb-6">{activeData.role}</p>
                  </div>
                  
                  <div className="mt-auto">
                    <Link 
                      href={activeData.link} 
                      className="group inline-flex items-center justify-center relative overflow-hidden rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-gray-800 hover:scale-105"
                      style={{
                        boxShadow: `0 4px 12px ${getColorVariants(activeData.color).light}`
                      }}
                    >
                      <span className="relative z-10">{activeData.linkText}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </div>
                </div>
                
                <div className="md:col-span-2 p-8 md:p-10 flex flex-col">
                  <p className="text-gray-700 mb-8 text-left leading-relaxed">
                    {activeData.description}
                  </p>
                  
                  <div className="mt-auto">
                    <h4 className="text-sm font-semibold text-gray-500 mb-3 text-left">EXPERTISE</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {activeData.expertise.map((skill, index) => (
                        <motion.span 
                          key={index} 
                          className="inline-block px-3 py-1.5 text-sm rounded-lg border"
                          style={{
                            borderColor: getColorVariants(activeData.color).medium,
                            color: 'rgba(0,0,0,0.75)',
                            background: getColorVariants(activeData.color).light
                          }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
