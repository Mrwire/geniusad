'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SubsidiaryProps {
  id: string;
  name: string;
  logo: string;
  color: string;
  description: string;
  link: string;
  linkText: string;
  expertise: string[];
  tagline: string;
}

const subsidiaries: SubsidiaryProps[] = [
  {
    id: 'mps',
    name: 'MPS',
    logo: '/item_images/logo/MPS-logo-421x245.png',
    color: '#0066FF',
    description: 'Experte en production événementielle, MPS apporte son savoir-faire technique et logistique pour concrétiser vos concepts créatifs avec excellence et précision.',
    link: '/filiales/mps',
    linkText: 'Découvrir MPS',
    expertise: ['Production', 'Logistique', 'Événementiel', 'Technique'],
    tagline: 'Excellence technique au service de vos événements',
  },
  {
    id: 'labrigad',
    name: 'LABRIG\'Ad',
    logo: '/item_images/logo/labrigad-logo-600x244.png',
    color: '#FF3300',
    description: 'Spécialiste du déploiement terrain, LABRIG\'Ad assure une présence physique impactante de votre marque lors d\'événements, créant des connexions mémorables avec votre public.',
    link: '/filiales/labrigad',
    linkText: 'Découvrir LABRIG\'Ad',
    expertise: ['Street Marketing', 'Activation', 'Déploiement', 'Promotion'],
    tagline: 'L\'impact terrain pour des marques qui résonnent',
  },
  {
    id: 'gamius',
    name: 'Gamius',
    logo: '/item_images/logo/gamiusgroup-631x311.png',
    color: '#9933FF',
    description: 'Référence en gaming et esport, Gamius conçoit des expériences ludiques et immersives pour engager vos audiences et créer des expériences inoubliables à l\'intersection du jeu et de la marque.',
    link: '/filiales/gamius',
    linkText: 'Découvrir Gamius',
    expertise: ['Gaming', 'Esport', 'Expériences Immersives', 'Engagement'],
    tagline: 'Jeu, engagement et immersion pour révolutionner votre marque',
  },
  {
    id: 'moujeleell',
    name: 'Mouje & Leell',
    logo: '/item_images/logo/genius_black.png', // Remplacer par le bon logo quand disponible
    color: '#00CC66',
    description: 'Studio de design et de création, Mouje & Leell façonne l\'identité visuelle et conceptuelle de vos projets avec audace et créativité, pour des designs qui marquent les esprits.',
    link: '/filiales/moujeleell',
    linkText: 'Découvrir Mouje & Leell',
    expertise: ['Design', 'Direction Artistique', 'Identité Visuelle', 'Création'],
    tagline: 'L\'audace créative qui fait rayonner votre identité',
  },
];

// Animated backdrop effect component
const AnimatedBackdrop = ({ isActive, color }: { isActive: boolean; color: string }) => (
  <motion.div 
    className="absolute inset-0 z-0 opacity-0 pointer-events-none"
    animate={{ 
      opacity: isActive ? 0.07 : 0, 
      scale: isActive ? 1 : 0.8,
    }}
    transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
  >
    <div className="w-full h-full" style={{ background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)` }} />
  </motion.div>
);

// Expertise tag component
const ExpertiseTag = ({ text, color }: { text: string; color: string }) => (
  <motion.span 
    className="inline-block px-2.5 py-1 text-xs font-medium rounded-full border mr-2 mb-2"
    style={{ 
      borderColor: color,
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.7)',
    }}
    whileHover={{ 
      y: -2, 
      backgroundColor: color,
      color: '#000',
    }}
    transition={{ duration: 0.2 }}
  >
    {text}
  </motion.span>
);

// Logo component with advanced animation
const SubsidiaryLogo = ({ logo, name, isActive }: { logo: string; name: string; isActive: boolean }) => (
  <motion.div 
    className="relative h-20 w-full max-w-[180px] mx-auto mb-6"
    animate={{ 
      y: isActive ? [0, -5, 0] : 0,
      filter: isActive ? 'drop-shadow(0 0 8px rgba(255,255,255,0.8))' : 'none',
    }}
    transition={{ 
      y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
      filter: { duration: 0.5 }
    }}
  >
    <div className="relative w-full h-full">
      <Image
        src={logo}
        alt={`Logo ${name}`}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 25vw"
      />
    </div>
  </motion.div>
);

// Detailed subsidiary card component
const SubsidiaryDetail = ({ subsidiary, isActive }: { subsidiary: SubsidiaryProps; isActive: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ 
      opacity: isActive ? 1 : 0, 
      x: isActive ? 0 : 20,
      transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
    }}
    className={`${isActive ? 'block' : 'hidden'} bg-black/80 backdrop-blur-md p-8 rounded-2xl`}
  >
    <h3 className="text-2xl font-heading font-bold mb-2">{subsidiary.name}</h3>
    <p className="text-white/80 text-lg italic mb-4">{subsidiary.tagline}</p>
    <div className="mb-4 flex flex-wrap">
      {subsidiary.expertise.map((skill) => (
        <ExpertiseTag key={skill} text={skill} color={subsidiary.color} />
      ))}
    </div>
    <p className="text-white/90 mb-6">{subsidiary.description}</p>
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        href={subsidiary.link}
        className={cn(
          "inline-flex items-center justify-center px-5 py-2.5 rounded-md transition-colors duration-200 font-medium",
        )}
        style={{ 
          color: 'black',
          backgroundColor: subsidiary.color,
        }}
      >
        {subsidiary.linkText}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="ml-2"
        >
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </Link>
    </motion.div>
  </motion.div>
);

// Subsidiary navigation tab
const SubsidiaryTab = ({ 
  subsidiary, 
  isActive, 
  onClick 
}: { 
  subsidiary: SubsidiaryProps; 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <motion.div
    onClick={onClick}
    className={cn(
      "relative cursor-pointer p-4 rounded-lg transition-all duration-300 overflow-hidden",
      isActive 
        ? "bg-black/50 shadow-lg" 
        : "bg-black/20 hover:bg-black/30"
    )}
    whileHover={{ scale: isActive ? 1 : 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="relative z-10">
      <div className="h-12 relative mb-2">
        <Image
          src={subsidiary.logo}
          alt={`Logo ${subsidiary.name}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 25vw, 10vw"
        />
      </div>
      <h4 className={cn(
        "text-center font-heading font-semibold transition-all duration-300",
        isActive ? "text-white" : "text-white/80"
      )}>
        {subsidiary.name}
      </h4>
    </div>
    
    {/* Active indicator line */}
    <motion.div 
      className="absolute bottom-0 left-0 right-0 h-1"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isActive ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{ 
        backgroundColor: subsidiary.color,
        transformOrigin: "left"
      }}
    />
  </motion.div>
);

// Main component
export const PowerfulSubsidiariesShowcase: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSubsidiary = subsidiaries[activeIndex];
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  
  // Lines effect background
  const linesRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Auto-rotate subsidiaries every 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % subsidiaries.length);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, [activeIndex]);
  
  // Lines effect movement
  useEffect(() => {
    if (!linesRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!linesRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = linesRef.current.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      
      linesRef.current.style.setProperty('--mouse-x', String(x));
      linesRef.current.style.setProperty('--mouse-y', String(y));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="py-24 relative overflow-hidden bg-black text-white"
    >
      {/* Dynamic background effect */}
      <div 
        ref={linesRef}
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(1000px) rotateX(calc(var(--mouse-y, 0.5) * 5deg)) rotateY(calc(var(--mouse-x, 0.5) * -5deg))',
        }}
      />
      
      {/* Subsidiary-specific glowing backdrop */}
      {subsidiaries.map((subsidiary, index) => (
        <AnimatedBackdrop 
          key={subsidiary.id} 
          isActive={index === activeIndex} 
          color={subsidiary.color} 
        />
      ))}
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.7, 
                ease: [0.4, 0.0, 0.2, 1]
              }
            }
          }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-1 relative z-10">
              L'ÉCOSYSTÈME GENIUS
            </h2>
            <motion.div
              className="absolute -bottom-3 left-0 right-0 h-1 bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.5,
                ease: [0.4, 0.0, 0.2, 1] 
              }}
              style={{ transformOrigin: "left" }}
            />
          </div>
          
          <motion.p 
            className="text-white/80 max-w-2xl mx-auto font-sans mt-8 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            Découvrez notre constellation de filiales spécialisées, chacune maître dans son domaine, 
            formant ensemble un écosystème complet au service de votre succès.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left side: Featured subsidiary logo */}
          <motion.div 
            className="text-center lg:col-span-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative bg-black/40 backdrop-blur-md p-10 rounded-2xl">
              {/* Dynamic border effect */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{ 
                  background: `linear-gradient(45deg, ${activeSubsidiary.color}00, ${activeSubsidiary.color}40, ${activeSubsidiary.color}00)`,
                  border: `1px solid ${activeSubsidiary.color}30`,
                  boxShadow: `0 0 30px ${activeSubsidiary.color}20`
                }}
              ></div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeSubsidiary.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10"
                >
                  <SubsidiaryLogo 
                    logo={activeSubsidiary.logo} 
                    name={activeSubsidiary.name} 
                    isActive={true} 
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          
          {/* Right side: Detailed info */}
          <div className="lg:col-span-2 relative min-h-[300px]">
            {subsidiaries.map((subsidiary, index) => (
              <SubsidiaryDetail 
                key={subsidiary.id}
                subsidiary={subsidiary}
                isActive={index === activeIndex}
              />
            ))}
          </div>
        </div>
        
        {/* Navigation tabs */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          {subsidiaries.map((subsidiary, index) => (
            <SubsidiaryTab
              key={subsidiary.id}
              subsidiary={subsidiary}
              isActive={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </motion.div>
        
        {/* Synergy statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
          }}
          transition={{ 
            duration: 0.5, 
            ease: [0.4, 0.0, 0.2, 1],
            delay: 1.4
          }}
          className="text-center mt-20 relative"
        >
          <div className="max-w-3xl mx-auto relative">
            {/* Radial gradient background */}
            <div className="absolute inset-0 opacity-20 bg-gradient-radial from-white/20 to-transparent" />
            
            <p className="text-xl md:text-2xl font-medium relative z-10 p-6">
              <span className="italic">En synergie,</span> <span className="font-bold not-italic">ce que GENIUS crée, MPS produit et LABRIG'Ad déploie</span>, 
              <br className="hidden md:block" /> tandis que <span className="font-bold">Gamius</span> et <span className="font-bold">Mouje & Leell</span> apportent leur expertise spécifique.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PowerfulSubsidiariesShowcase;
