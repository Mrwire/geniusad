'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Palette, 
  Globe, 
  Calendar, 
  Printer, 
  BarChart3, 
  Megaphone, 
  Truck, 
  Gamepad2, 
  Building,
  Sparkles,
  Lightbulb,
  Radio,
  Music,
  Camera,
  Users,
  Workflow,
  Flag,
  Layers,
  HeartHandshake,
  X
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Interface pour les détails complets d'une expertise
interface ExpertiseDetails {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  subsidiary: string;
  color: string;
  delay: number;
  keyBenefits?: string[];
  useCases?: string[];
}

// Subsidiary interface
interface Subsidiary {
  id: string;
  name: string;
  logo: string;
  description: string;
  color: string;
}

// Expertise interface with expanded properties
interface ExpertiseCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  subsidiary: string;
  color: string;
  delay: number;
}

// Composant Modal pour afficher les détails complets
const ExpertiseModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  expertise: ExpertiseDetails 
}> = ({ isOpen, onClose, expertise }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden touch-pan-y">
          <div className="flex min-h-[100dvh] items-center justify-center py-12 px-2 sm:p-4 text-center overflow-y-auto max-h-screen overscroll-contain">
            {/* Overlay avec effet de flou */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
              onClick={onClose}
              aria-hidden="true"
            />
            
            {/* Container principal du modal avec animation Apple */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="inline-block w-full max-w-lg sm:max-w-3xl transform overflow-y-auto max-h-[85vh] rounded-2xl bg-neutral-900/95 backdrop-blur-md text-left align-middle shadow-2xl border border-neutral-800/50 mx-auto my-auto sm:m-4 md:m-8 relative"
              style={{ overscrollBehavior: 'contain' }}
            >
              <div className="relative p-4 sm:p-6 md:p-8 flex flex-col space-y-5">
                {/* Barre d'espacement pour éviter que le header ne cache le contenu sur mobile */}
                <div className="h-8 sm:h-0"></div>
                {/* Bouton de fermeture style Apple */}
                <button
                  onClick={onClose}
                  className="fixed top-3 right-3 z-[110] rounded-full w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white bg-neutral-800/70 hover:bg-neutral-700 backdrop-blur-md shadow-md border border-neutral-700/30 transition-all duration-200 hover:scale-105"
                  aria-label="Fermer"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* En-tête avec icône et titre */}
                <div className="flex items-start space-x-4 sm:space-x-6 pb-4 border-b border-neutral-800/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl" 
                      style={{ backgroundColor: `${expertise.color}15`, backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <motion.div 
                      initial={{ scale: 0.9, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className="h-6 w-6" 
                      style={{ color: expertise.color }}
                    >
                      {expertise.icon}
                    </motion.div>
                  </div>
                  <div>
                    <motion.h3 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="text-xl sm:text-2xl font-semibold text-white tracking-tight"
                    >
                      {expertise.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="mt-1 text-sm font-medium tracking-wide" 
                      style={{ color: expertise.color }}
                    >
                      {expertise.subsidiary}
                    </motion.p>
                  </div>
                </div>

                {/* Section de contenu avec description et avantages */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-4 space-y-6"
                >
                  <div>
                    <h4 className="text-base sm:text-lg font-medium text-white mb-2 tracking-tight">Description</h4>
                    <p className="text-[15px] leading-relaxed text-gray-300">{expertise.longDescription || expertise.description}</p>
                  </div>

                  {expertise.keyBenefits && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <h4 className="text-base sm:text-lg font-medium text-white mb-2 tracking-tight">Avantages clés</h4>
                      <ul className="space-y-2 mt-3">
                        {expertise.keyBenefits.map((benefit, index) => (
                          <motion.li 
                            key={index} 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (index * 0.1), duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="flex items-start"
                          >
                            <div className="h-5 w-5 text-[#2DD4BF] mr-2 mt-0.5 flex-shrink-0">
                              <svg viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span className="text-gray-300">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Formulaire de contact style Apple */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="pt-4 mt-4 border-t border-neutral-800/30"
                  >
                    <h4 className="text-base sm:text-lg font-medium text-white mb-4 tracking-tight">Envie d'en savoir plus ?</h4>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-400">Votre nom</label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2.5 bg-neutral-800/60 border border-neutral-700/50 rounded-xl text-white focus:ring-2 focus:border-transparent focus:outline-none transition-all duration-200"
                            placeholder="Votre nom"
                            style={{ boxShadow: `0 0 0 0 ${expertise.color}00`, '--tw-ring-color': `${expertise.color}50` } as React.CSSProperties}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-400">Votre email</label>
                          <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2.5 bg-neutral-800/60 border border-neutral-700/50 rounded-xl text-white focus:ring-2 focus:border-transparent focus:outline-none transition-all duration-200"
                            placeholder="votre@email.com"
                            style={{ boxShadow: `0 0 0 0 ${expertise.color}00`, '--tw-ring-color': `${expertise.color}50` } as React.CSSProperties}
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-400">Votre message</label>
                        <textarea
                          id="message"
                          rows={3}
                          className="w-full px-4 py-2.5 bg-neutral-800/60 border border-neutral-700/50 rounded-xl text-white focus:ring-2 focus:border-transparent focus:outline-none transition-all duration-200"
                          placeholder={`Je souhaite en savoir plus sur ${expertise.title}...`}
                          defaultValue={`Bonjour, je souhaite en savoir plus sur votre service "${expertise.title}".`}
                          style={{ boxShadow: `0 0 0 0 ${expertise.color}00`, '--tw-ring-color': `${expertise.color}50` } as React.CSSProperties}
                        />
                      </div>
                      <div className="pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-200"
                          style={{ 
                            backgroundColor: expertise.color,
                            boxShadow: `0 4px 14px ${expertise.color}25`
                          }}
                        >
                          Envoyer ma demande
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({ id, title, description, icon, subsidiary, color, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay
      }
    },
    hover: {
      y: -8,
      scale: 1.03,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  };

  const textVariants = {
    initial: { opacity: 0, height: 0 },
    hover: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3, delay: 0.1 }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 }
    }
  };

  const subsidiaryBadgeVariants = {
    initial: { opacity: 0, scale: 0.8, x: 10 },
    hover: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      transition: { duration: 0.3, delay: 0.15 }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: 10,
      transition: { duration: 0.2 }
    }
  };

  const borderGradientStyle = {
    background: `linear-gradient(to bottom right, ${color}80, transparent, ${color}40)`,
    opacity: isHovered ? 1 : 0
  };

  // Données complètes pour la modale
  const expertiseDetails: ExpertiseDetails = {
    id,
    title,
    description,
    longDescription: `Découvrez comment notre expertise en ${title.toLowerCase()} peut transformer votre entreprise. Notre équipe dédiée met à votre disposition des solutions sur mesure pour répondre à vos besoins spécifiques.`,
    icon,
    subsidiary,
    color,
    delay,
    keyBenefits: [
      `Solution personnalisée pour ${title.toLowerCase()}`,
      'Équipe d\'experts dédiée',
      'Résultats mesurables et concrets',
      'Approche innovante et créative',
      'Suivi personnalisé et rapports détaillés'
    ]
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className={cn(
          "group relative bg-neutral-900/80 backdrop-blur-sm",
          "border border-neutral-800 rounded-xl p-6", 
          "flex flex-col items-center text-center",
          "transition-all duration-300 overflow-hidden",
          "hover:shadow-lg cursor-pointer"
        )}
        style={{ minHeight: '280px' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
      {/* Animated border gradient on hover */}
      <motion.div 
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 z-0"
        style={borderGradientStyle}
        transition={{ duration: 0.3 }}
      />

      {/* Subsidiary badge that appears on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium z-10"
            style={{ backgroundColor: `${color}30`, color: color, borderLeft: `2px solid ${color}` }}
            variants={subsidiaryBadgeVariants}
            initial="initial"
            animate="hover"
            exit="exit"
          >
            {subsidiary}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon with hover animation */}
      <motion.div 
        className="w-14 h-14 mb-4 relative z-10 flex items-center justify-center"
        variants={iconVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-full opacity-50" />
        <div className="relative z-10 text-white" style={{ color: isHovered ? color : '#D9D9D9' }}>
          {icon}
        </div>
      </motion.div>

      {/* Title */}
      <h3 
        className="text-xl font-heading font-semibold mb-2 relative z-10 transition-colors duration-300"
        style={{ color: isHovered ? color : 'white' }}
      >
        {title}
      </h3>

      {/* Description that appears on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.p
            className="text-sm text-neutral-300 relative z-10 mt-2"
            variants={textVariants}
            initial="initial"
            animate="hover"
            exit="exit"
          >
            {description}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Learn more text that appears on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="mt-4 text-sm font-medium relative z-10"
            style={{ color }}
            variants={textVariants}
            initial="initial"
            animate="hover"
            exit="exit"
          >
            En savoir plus →
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>

      <ExpertiseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        expertise={expertiseDetails} 
      />
    </>
  );
};

export default function ShadcnExpertiseGrid() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // Subsidiaries data
  const subsidiaries: Subsidiary[] = [
    { 
      id: 'genius', 
      name: 'Genius', 
      logo: '/logos/genius-logo.svg', 
      description: 'Agence principale', 
      color: '#38BDF8' 
    },
    { 
      id: 'mps', 
      name: 'MPS', 
      logo: '/logos/mps-logo.svg', 
      description: 'Atelier de fabrication & production', 
      color: '#F43F5E' 
    },
    { 
      id: 'labrigad', 
      name: 'LABRIG\'Ad', 
      logo: '/logos/labrigad-logo.svg', 
      description: 'Activation & street marketing', 
      color: '#22C55E' 
    },
    { 
      id: 'gamius', 
      name: 'Gamius', 
      logo: '/logos/gamius-logo.svg', 
      description: 'Gaming & eSport', 
      color: '#A855F7' 
    },
    { 
      id: 'moojandleel', 
      name: 'Mooj & Leel', 
      logo: '/logos/mooje-logo.svg', 
      description: 'Création de meubles sur mesure', 
      color: '#F59E0B' 
    }
  ];
  
  // Gamius sous-divisions
  const gamiusDivisions = [
    { id: 'event', name: 'Gamius Event', description: 'Événementiel gaming' },
    { id: 'code', name: 'Gamius Code', description: 'Innovateur en développement tech gaming' },
    { id: 'studio', name: 'Gamius Studio', description: 'Studio de streaming à louer' },
    { id: 'production', name: 'Gamius Production', description: 'Production esport & streaming' },
    { id: 'esport', name: 'Gamius eSport', description: 'Gestion compétitions esport' }
  ];

  // Expertise data with detailed information
  const expertises = [
    { 
      id: 'furniture-design', 
      title: "Meubles de luxe", 
      description: "Création de meubles sur mesure et d'aménagements intérieurs haut de gamme pour particuliers et professionnels.",
      icon: <Layers className="w-full h-full" />, 
      subsidiary: "Mooj & Leel",
      color: "#F59E0B"
    },
    { 
      id: 'custom-furniture', 
      title: "Mobilier sur mesure", 
      description: "Conception et fabrication de mobilier personnalisé selon vos spécifications et besoins uniques.",
      icon: <Sparkles className="w-full h-full" />, 
      subsidiary: "Mooj & Leel",
      color: "#F59E0B"
    },
    { 
      id: 'cnc-fabrication', 
      title: "Fabrication CNC", 
      description: "Production industrielle avec machines CNC, chromage et techniques avancées pour réaliser vos projets.",
      icon: <Printer className="w-full h-full" />, 
      subsidiary: "MPS",
      color: "#F43F5E"
    },
    { 
      id: 'stands', 
      title: "Stands & Expositions", 
      description: "Conception et réalisation de stands premium pour salons et expositions commerciales.",
      icon: <Building className="w-full h-full" />, 
      subsidiary: "MPS",
      color: "#F43F5E"
    },
    { 
      id: 'prototype', 
      title: "Prototypage", 
      description: "Transformation de concepts en prototypes tangibles grâce à notre atelier de production avancé.",
      icon: <Lightbulb className="w-full h-full" />, 
      subsidiary: "MPS",
      color: "#F43F5E"
    },
    { 
      id: 'esport-events', 
      title: "Gamius Event", 
      description: "Organisation d'événements gaming et esport pour entreprises et grand public.",
      icon: <Calendar className="w-full h-full" />, 
      subsidiary: "Gamius",
      color: "#A855F7"
    },
    { 
      id: 'game-development', 
      title: "Gamius Code", 
      description: "Développement de plateformes de gestion esport en marque blanche, outils de streaming et jeux sur mesure.",
      icon: <Globe className="w-full h-full" />, 
      subsidiary: "Gamius",
      color: "#A855F7"
    },
    { 
      id: 'studio-rental', 
      title: "Gamius Studio", 
      description: "Location de notre studio professionnel de streaming pour vos émissions, podcasts et compétitions.",
      icon: <Radio className="w-full h-full" />, 
      subsidiary: "Gamius",
      color: "#A855F7"
    },
    { 
      id: 'esport-production', 
      title: "Gamius Production", 
      description: "Production complète de compétitions esport, streaming live et contenus gaming de qualité.",
      icon: <Camera className="w-full h-full" />, 
      subsidiary: "Gamius",
      color: "#A855F7"
    },
    { 
      id: 'esport-management', 
      title: "Gamius eSport", 
      description: "Gestion professionnelle d'événements esport avec notre équipe de modérateurs expérimentés.",
      icon: <Gamepad2 className="w-full h-full" />, 
      subsidiary: "Gamius",
      color: "#A855F7"
    },
    { 
      id: 'street-marketing', 
      title: "Street Marketing", 
      description: "Activation de marque et opérations de street marketing impactantes pour toucher votre audience.",
      icon: <Megaphone className="w-full h-full" />, 
      subsidiary: "LABRIG'Ad",
      color: "#22C55E"
    },
    { 
      id: 'logistics', 
      title: "Déploiement Logistique", 
      description: "Solutions logistiques complètes pour vos événements et activations de marque à travers le pays.",
      icon: <Truck className="w-full h-full" />, 
      subsidiary: "LABRIG'Ad",
      color: "#22C55E"
    },
    { 
      id: 'brand-activation', 
      title: "Activation", 
      description: "Stratégies d'activation de marque créatives et personnalisées pour maximiser votre impact.",
      icon: <Flag className="w-full h-full" />, 
      subsidiary: "LABRIG'Ad",
      color: "#22C55E"
    },
    { 
      id: 'digital', 
      title: "Digital & Web", 
      description: "Développement de sites web premium et stratégies digitales performantes et innovantes.",
      icon: <Globe className="w-full h-full" />, 
      subsidiary: "Genius",
      color: "#38BDF8"
    },
    { 
      id: 'events', 
      title: "Événementiel Corporate", 
      description: "Organisation d'événements corporate et grand public mémorables et impactants.",
      icon: <Calendar className="w-full h-full" />, 
      subsidiary: "Genius",
      color: "#38BDF8"
    },
    { 
      id: 'advertising', 
      title: "Publicité", 
      description: "Campagnes publicitaires créatives et stratégiques pour maximiser votre visibilité.",
      icon: <Megaphone className="w-full h-full" />, 
      subsidiary: "Genius",
      color: "#38BDF8"
    },
    { 
      id: 'strategy', 
      title: "Stratégie 360", 
      description: "Conseil stratégique global pour aligner votre communication avec vos objectifs business.",
      icon: <Workflow className="w-full h-full" />, 
      subsidiary: "Genius",
      color: "#38BDF8"
    }
  ];

  // Filter expertise by subsidiary
  const filteredExpertises = activeFilter 
    ? expertises.filter(exp => {
        const subsidiary = subsidiaries.find(sub => sub.name === exp.subsidiary);
        return subsidiary?.id === activeFilter;
      })
    : expertises;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
  
  const subsidiaryFilterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.5 + (custom * 0.1),
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    active: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section 
      ref={ref}
      className="min-h-[100vh] flex flex-col items-center justify-center bg-black py-32 px-4 relative overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <motion.div
        className="container mx-auto max-w-6xl z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="text-center mb-16">
          <motion.h2 
            variants={titleVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6"
          >
            NOS MÉTIERS
          </motion.h2>
          <motion.p 
            variants={titleVariants}
            className="text-lg text-[#D9D9D9] max-w-2xl mx-auto leading-relaxed"
          >
            Une expertise complète et intégrée, 100% Made in Morocco avec des standards internationaux.
          </motion.p>
        </div>

        {/* Unified subsidiaries presentation */}
        <motion.div 
          variants={titleVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button 
            className={cn(
              "px-4 py-2 rounded-full transition-all duration-300",
              "text-sm font-medium border",
              activeFilter === null ? "bg-white/10 border-white/20 text-white" : "bg-transparent border-white/10 text-white/60 hover:text-white/80 hover:border-white/20"
            )}
            onClick={() => setActiveFilter(null)}
          >
            Tous les métiers
          </button>
          
          {subsidiaries.map((subsidiary, index) => (
            <motion.button
              key={subsidiary.id}
              custom={index}
              variants={subsidiaryFilterVariants}
              whileHover="active"
              className={cn(
                "px-4 py-2 rounded-full transition-all duration-300 border",
                "text-sm font-medium flex items-center space-x-2",
                activeFilter === subsidiary.id 
                  ? `bg-${subsidiary.id}-gradient border-${subsidiary.color} text-white` 
                  : "bg-transparent border-white/10 text-white/60 hover:text-white/80 hover:border-white/20"
              )}
              style={{
                borderColor: activeFilter === subsidiary.id ? subsidiary.color : '',
                background: activeFilter === subsidiary.id ? `linear-gradient(45deg, ${subsidiary.color}30, transparent)` : ''
              }}
              onClick={() => setActiveFilter(activeFilter === subsidiary.id ? null : subsidiary.id)}
            >
              <span>{subsidiary.name}</span>
              {activeFilter === subsidiary.id && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: subsidiary.color }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Expertise Grid with animation */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter || 'all'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredExpertises.map((expertise, index) => (
              <ExpertiseCard
                key={expertise.id}
                id={expertise.id}
                title={expertise.title}
                description={expertise.description}
                icon={expertise.icon}
                subsidiary={expertise.subsidiary}
                color={expertise.color}
                delay={0.2 + (index * 0.05)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Integration message */}
        <motion.div
          variants={titleVariants}
          className="mt-16 text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center mb-4">
            <HeartHandshake className="w-6 h-6 text-cyan-400 mr-2" />
            <h4 className="text-xl font-heading font-semibold text-white">Une approche intégrée unique</h4>
          </div>
          <p className="text-white/70 mb-4">
            Genius Ad District vous offre la puissance d'une agence full-service avec l'expertise de partenaires spécialisés, tous sous un même toit. Fini les expériences d'agences fragmentées.
          </p>
          <Link 
            href="#contact"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-300 font-medium"
          >
            Discutez de votre projet avec nous
            <span className="ml-2">→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
