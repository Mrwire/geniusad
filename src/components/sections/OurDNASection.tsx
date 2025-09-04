'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Target, TrendingUp, Lightbulb, Rocket, Users, RefreshCw } from 'lucide-react';

export default function OurDNASection() {
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  const [animationPhase, setAnimationPhase] = useState<'intro' | 'stabilized'>('intro');
  const [visiblePoints, setVisiblePoints] = useState<number[]>([]);
  const dnaRef = useRef<SVGSVGElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Contenu bilingue avec philosophie d'entreprise
  const content = {
    title: locale === 'fr' ? 'Notre ADN d\'Excellence' : 'Our DNA of Excellence',
    subtitle: locale === 'fr' ? 'Code Génétique de l\'Innovation' : 'Genetic Code of Innovation',
    philosophySteps: [
      {
        icon: <Target className="w-6 h-6 text-white" />,
        title: locale === 'fr' ? 'Vision Stratégique' : 'Strategic Vision',
        description: locale === 'fr' ? 'Définir l\'orientation avec précision et clarté' : 'Defining direction with precision and clarity'
      },
      {
        icon: <TrendingUp className="w-6 h-6 text-white" />,
        title: locale === 'fr' ? 'Excellence Continue' : 'Continuous Excellence',
        description: locale === 'fr' ? 'Toujours chercher à surpasser nos standards' : 'Always seeking to exceed our standards'
      },
      {
        icon: <Lightbulb className="w-6 h-6 text-white" />,
        title: locale === 'fr' ? 'Innovation Disruptive' : 'Disruptive Innovation',
        description: locale === 'fr' ? 'Créer de nouvelles perspectives et solutions' : 'Creating new perspectives and solutions'
      },
      {
        icon: <Rocket className="w-6 h-6 text-white" />,
        title: locale === 'fr' ? 'Agilité Adaptative' : 'Adaptive Agility',
        description: locale === 'fr' ? 'Transformation rapide face aux opportunités' : 'Rapid transformation in face of opportunities'
      },
      {
        icon: <Users className="w-6 h-6 text-white" />,
        title: locale === 'fr' ? 'Collaboration Synergique' : 'Synergistic Collaboration',
        description: locale === 'fr' ? 'Unir les talents pour amplifier l\'impact' : 'Uniting talents to amplify impact'
      },
      {
        icon: <RefreshCw className="w-6 h-6 text-white" />,
        title: locale === 'fr' ? 'Évolution Durable' : 'Sustainable Evolution',
        description: locale === 'fr' ? 'Progresser avec responsabilité et vision' : 'Progressing with responsibility and vision'
      }
    ]
  };
  
  // S'assurer que le code ne s'exécute que côté client
  useEffect(() => {
    setIsMounted(true);
    
    // Afficher progressivement les points de philosophie
    const displayPoints = () => {
      const pointsTimer = setTimeout(() => {
        setAnimationPhase('stabilized');
        
        // Afficher progressivement les points
        const totalPoints = content.philosophySteps.length;
        for (let i = 0; i < totalPoints; i++) {
          setTimeout(() => {
            setVisiblePoints(prev => [...prev, i]);
          }, i * 600);
        }
      }, 2000);
      
      return () => clearTimeout(pointsTimer);
    };
    
    displayPoints();
  }, []);

  return (
    <section className="bg-black py-24 md:py-32 relative overflow-hidden">
      {/* Fond de grille holographique */}
      <div className="absolute inset-0 grid-bg opacity-10" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête avec effet lumineux */}
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ 
            textShadow: '0 0 8px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.2)',
            letterSpacing: '0.5px'
          }}
        >
          {content.title}
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl text-center text-white mt-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {content.subtitle}
        </motion.p>
        
        {/* Animation ADN - Nouvelle conception mobile-first */}
        <div className="relative flex justify-center items-center min-h-[400px] md:min-h-[500px] mb-12">
          {/* Animation ADN avec design moderne et minimaliste */}
          {isMounted && (
            <svg 
              ref={dnaRef}
              className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[350px] h-auto mx-auto"
              viewBox="0 0 200 400"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Filtre pour l'effet lumineux */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              
              {/* Traces du brin d'ADN */}
              <g filter="url(#glow)">
                {/* Brin gauche */}
                <motion.path
                  d={`M 60,20 C 40,50 40,70 60,100 C 40,130 40,150 60,180 C 40,210 40,230 60,260 C 40,290 40,310 60,340 C 40,370 40,390 60,420`}
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
                
                {/* Brin droit */}
                <motion.path
                  d={`M 140,20 C 160,50 160,70 140,100 C 160,130 160,150 140,180 C 160,210 160,230 140,260 C 160,290 160,310 140,340 C 160,370 160,390 140,420`}
                  stroke="white"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 3, ease: "easeInOut", delay: 0.3 }}
                />
                
                {/* Connexions entre brins - Génération dynamique */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => {
                  const y = 40 + i * 40;
                  return (
                    <motion.line
                      key={`connection-${i}`}
                      x1="60"
                      y1={y}
                      x2="140"
                      y2={y}
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 2 + i * 0.15 }}
                    />
                  );
                })}
              </g>
              
              {/* Points lumineux animés le long des brins */}
              <g>
                <motion.circle
                  cx="60"
                  cy="20"
                  r="3"
                  fill="white"
                  filter="url(#glow)"
                  animate={{
                    y: [20, 420, 20],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <motion.circle
                  cx="140"
                  cy="420"
                  r="3"
                  fill="white"
                  filter="url(#glow)"
                  animate={{
                    y: [420, 20, 420],
                    opacity: [1, 0.8, 1]
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </g>
            </svg>
          )}
          
          {/* Points de philosophie avec animation d'apparition */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full max-w-[90%] sm:max-w-4xl px-2 sm:px-3 md:px-4">
              <AnimatePresence>
                {content.philosophySteps.map((step, index) => {
                  if (!visiblePoints.includes(index)) return null;
                  
                  return (
                    <motion.div
                      key={`philosophy-${index}`}
                      className="bg-black bg-opacity-60 backdrop-blur-sm p-5 rounded-lg border border-white border-opacity-20 flex flex-col items-center text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="bg-white bg-opacity-10 p-2 sm:p-3 rounded-full mb-2 sm:mb-3 md:mb-4">
                        {step.icon}
                      </div>
                      <h3 className="text-white text-base sm:text-lg font-semibold mb-1 sm:mb-2">{step.title}</h3>
                      <p className="text-gray-300 text-xs sm:text-sm">{step.description}</p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Indicateur de progression */}
        <div className="flex justify-center mt-8 space-x-2">
          {/** Compute width without touching window during SSR */}
          {/** eslint-disable-next-line @typescript-eslint/no-unused-vars */}
          {(() => {
            const isSmall = typeof window !== 'undefined' && window.innerWidth < 640;
            return null;
          })()}
          {content.philosophySteps.map((_, i) => (
            <motion.div
              key={`indicator-${i}`}
              className={`h-1 sm:h-1.5 rounded-full ${visiblePoints.includes(i) ? 'bg-white' : 'bg-gray-700'}`}
              style={{ width: visiblePoints.includes(i) ? '1rem' : '0.4rem', marginRight: '2px', marginLeft: '2px' }}
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: visiblePoints.includes(i) ? 1 : 0.3,
                width: (() => {
                  const isSmall = typeof window !== 'undefined' && window.innerWidth < 640;
                  if (visiblePoints.includes(i)) return isSmall ? '1rem' : '1.5rem';
                  return isSmall ? '0.4rem' : '0.5rem';
                })()
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Styles CSS pour les animations */}
      <style jsx>{`
        @keyframes pulse-glow {
          0% { text-shadow: 0 0 8px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.2); }
          50% { text-shadow: 0 0 12px rgba(255,255,255,0.7), 0 0 30px rgba(255,255,255,0.3); }
          100% { text-shadow: 0 0 8px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.2); }
        }
      `}</style>
    </section>
  );
}
