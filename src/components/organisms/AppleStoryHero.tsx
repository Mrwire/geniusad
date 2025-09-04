'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Container } from '@/components/atoms/Container';
import { useParams } from 'next/navigation';

// Composant inspiré de l'esthétique Apple pour la section hero
export function AppleStoryHero() {
  const params = useParams();
  const locale = (params && typeof params === 'object' && 'locale' in params) ? params.locale as string : 'fr';
  
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Effet pour animer basé sur le scroll
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setScrollY(window.scrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculer l'opacité basée sur le scroll
  const opacity = Math.max(1 - scrollY / 700, 0);
  const scale = Math.max(1 - scrollY / 2000, 0.8);
  
  // Content based on locale
  const content = {
    mainHeading: locale === 'fr' ? "GENIUS est né d'une conviction" : "GENIUS was born from a conviction",
    subHeading: locale === 'fr' ? "La créativité n'a de valeur que si elle change la donne" : "Creativity only has value if it's a game-changer",
    videoAlt: locale === 'fr' ? "Votre navigateur ne supporte pas la lecture de vidéos." : "Your browser does not support video playback."
  };
  
  // Textes qui apparaissent progressivement avec le vocabulaire ESPRIT
  const storyPhrases = locale === 'fr' ? [
    "En 1999, notre atelier de 20m² était déjà animé par l'EXCELLENCE.",
    "Nos premiers projets SUR-MESURE ont marqué le paysage créatif marocain dès nos débuts.",
    "Notre PASSION : allier créativité et maîtrise technique.",
    "Des premiers sites web aux solutions digitales actuelles, l'INNOVATION guide notre démarche.",
    "Aujourd'hui, notre infrastructure de 2 600 m² reflète notre engagement continu depuis 1999."
  ] : [
    "In 1999, our 20m² workshop was already driven by EXCELLENCE.",
    "Our first CUSTOM projects marked the Moroccan creative landscape from the beginning.",
    "Our PASSION: combining creativity with technical mastery.",
    "From early websites to current digital solutions, INNOVATION guides our approach.",
    "Today, our 2,600 m² infrastructure reflects our continuous commitment since 1999."
  ];

  // Gérer l'animation séquentielle des textes
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % storyPhrases.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const cdnMp4 = process.env.NEXT_PUBLIC_STORY_VIDEO_MP4;
  const cdnWebm = process.env.NEXT_PUBLIC_STORY_VIDEO_WEBM;
  const localMp4 = cdnMp4 || '/videos/video-bg-ourstory-720.mp4';
  const localWebm = cdnWebm || '/videos/video-bg-ourstory-720.webm';

  return (
    <div ref={heroRef} className="relative h-[100svh] w-full overflow-hidden bg-black">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/story-poster.jpg"
          className="absolute h-full w-full object-cover scale-110"
          style={{ transform: `scale(${scale + 0.1}) translateY(${scrollY * 0.15}px)` }}
        >
          <source src={localWebm} type="video/webm" />
          <source src={localMp4} type="video/mp4" />
          {content.videoAlt}
        </video>
        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/60 z-0" />
        {/* Gradient supplémentaire pour le style Apple */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/90 z-0" />
      </div>
      
      {/* Conteneur pour les textes animés */}
      <Container className="relative h-full flex flex-col items-center justify-center z-10 text-white px-4">
        {/* Tagline permanente en haut */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold text-center mt-16 sm:mt-20 md:mt-0 leading-tight"
        >
          {content.mainHeading}
        </motion.h1>
        
        {/* Sous-titre typique d'Apple */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 italic mt-4 text-center max-w-xl"
        >
          {content.subHeading}
        </motion.p>
        
        {/* Conteneur pour les phrases de storytelling qui se succèdent */}
        <div className="h-36 sm:h-32 md:h-24 flex items-center justify-center mt-8 sm:mt-10 md:mt-16">
          {storyPhrases.map((phrase, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: currentPhraseIndex === index ? 1 : 0,
                y: currentPhraseIndex === index ? 0 : 20 
              }}
              transition={{ duration: 0.8 }}
              className="absolute text-base sm:text-lg md:text-2xl max-w-xs sm:max-w-lg md:max-w-2xl mx-auto text-center font-light px-4"
            >
              {phrase}
            </motion.p>
          ))}
        </div>
        
        {/* Indicateur de scroll comme Apple */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut" 
              }}
            />
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
