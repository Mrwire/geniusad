'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

// Définition du type pour les étapes du jeu
interface GameStep {
  id: string;
  title: string;
  description: string;
  image: string;
  action: string;
}

interface GamiusInteractiveWorldProps {
  onComplete?: () => void;
  redirectUrl?: string;
}

const GamiusInteractiveWorld: React.FC<GamiusInteractiveWorldProps> = ({
  onComplete,
  redirectUrl = 'https://gamiusgroup.ma'
}) => {
  const { locale } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 0 });
  const [characterDirection, setCharacterDirection] = useState<'left' | 'right'>('right');
  const [isJumping, setIsJumping] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const jumpTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Définition des étapes du jeu
  const gameSteps: GameStep[] = [
    {
      id: 'intro',
      title: locale === 'fr' ? 'Bienvenue dans l\'Univers Gamius' : 'Welcome to the Gamius Universe',
      description: locale === 'fr' 
        ? 'Embarquez pour une aventure interactive à travers le monde du gaming et de l\'e-sport avec Gamius.' 
        : 'Embark on an interactive adventure through the world of gaming and e-sports with Gamius.',
      action: locale === 'fr' ? 'Commencer l\'aventure' : 'Start the adventure',
      image: '/subsidiaries/gamius-level1.jpg'
    },
    {
      id: 'level1',
      title: locale === 'fr' ? 'Notre Mission' : 'Our Mission',
      description: locale === 'fr'
        ? 'Gamius crée des expériences gaming immersives et organise des événements e-sport de premier plan au Maroc et à l\'international.'
        : 'Gamius creates immersive gaming experiences and organizes premier e-sports events in Morocco and internationally.',
      action: locale === 'fr' ? 'Continuer' : 'Continue',
      image: '/subsidiaries/gamius-level2.jpg'
    },
    {
      id: 'level2',
      title: locale === 'fr' ? 'Nos Services' : 'Our Services',
      description: locale === 'fr'
        ? 'Tournois e-sport, production d\'événements gaming, gestion de talents et intégration des marques dans l\'écosystème gaming.'
        : 'E-sports tournaments, gaming event production, talent management and brand integration in the gaming ecosystem.',
      action: locale === 'fr' ? 'Explorer davantage' : 'Explore more',
      image: '/subsidiaries/gamius-level3.jpg'
    },
    {
      id: 'final',
      title: locale === 'fr' ? 'Prêt à Jouer ?' : 'Ready to Play?',
      description: locale === 'fr'
        ? 'Découvrez plus sur notre site officiel et rejoignez la communauté Gamius dès aujourd\'hui !'
        : 'Discover more on our official website and join the Gamius community today!',
      action: locale === 'fr' ? 'Visiter le site officiel' : 'Visit the official site',
      image: '/subsidiaries/gamius-hero.jpg'
    }
  ];

  // Gestion du clavier pour les contrôles du personnage
  useEffect(() => {
    const keyState = {
      ArrowLeft: false,
      ArrowRight: false,
      ArrowUp: false,
      Space: false
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space'].includes(e.code)) {
        e.preventDefault();
        keyState[e.code === 'Space' ? 'Space' as keyof typeof keyState : e.code as keyof typeof keyState] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space'].includes(e.code)) {
        e.preventDefault();
        keyState[e.code === 'Space' ? 'Space' as keyof typeof keyState : e.code as keyof typeof keyState] = false;
      }
    };

    // Animation loop pour le mouvement du personnage
    const updateCharacter = () => {
      setCharacterPosition(prev => {
        let newX = prev.x;
        let newDirection = characterDirection;
        let moving = false;

        if (keyState.ArrowLeft) {
          newX = Math.max(0, prev.x - 3);
          newDirection = 'left';
          moving = true;
        }
        if (keyState.ArrowRight) {
          newX = Math.min(90, prev.x + 3);
          newDirection = 'right';
          moving = true;
        }

        // Si le personnage atteint le bord droit, passer à l'étape suivante
        if (newX >= 85 && currentStep < gameSteps.length - 1) {
          setCurrentStep(prevStep => prevStep + 1);
          newX = 10; // Repositionner le personnage à gauche
        }

        // Mettre à jour la direction et l'état de mouvement
        setCharacterDirection(newDirection);
        setIsMoving(moving);

        return { ...prev, x: newX };
      });

      // Gestion du saut
      if ((keyState.ArrowUp || keyState.Space) && !isJumping) {
        setIsJumping(true);
        
        // Simuler un saut avec setTimeout
        if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
        jumpTimeoutRef.current = setTimeout(() => {
          setIsJumping(false);
        }, 500);
      }

      animationFrameRef.current = requestAnimationFrame(updateCharacter);
    };

    // Démarrer l'animation
    animationFrameRef.current = requestAnimationFrame(updateCharacter);

    // Ajouter les event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Clean up
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (jumpTimeoutRef.current) {
        clearTimeout(jumpTimeoutRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [characterDirection, currentStep, gameSteps.length, isJumping]);

  // Fonction pour passer à l'étape suivante
  const handleNextStep = () => {
    if (currentStep < gameSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setCharacterPosition({ ...characterPosition, x: 10 });
    } else {
      handleRedirect();
    }
  };

  // Fonction de redirection
  const handleRedirect = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      } else {
        window.location.href = redirectUrl;
      }
    }, 1500);
  };

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] overflow-hidden bg-black">
      {/* Conteneur du jeu */}
      <div 
        ref={gameContainerRef}
        className="relative w-full h-full overflow-hidden"
        style={{ 
          backgroundImage: `url(${gameSteps[currentStep].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay de jeu */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* Effet de particules pour l'ambiance gaming */}
        <div className="absolute inset-0 z-20 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 4 + 2;
            const speed = Math.random() * 15 + 5;
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            
            return (
              <div 
                key={i}
                className="absolute w-1 h-1 rounded-full bg-gamius animate-pulse"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: '-10px',
                  opacity: Math.random() * 0.5 + 0.3,
                  animationDelay: `${delay}s`,
                  animation: `fall ${speed}s linear ${delay}s infinite`
                }}
              />
            );
          })}
        </div>
        
        {/* Personnage */}
        <div
          className="absolute z-30"
          style={{
            bottom: `${characterPosition.y + (isJumping ? 10 : 0)}%`,
            left: `${characterPosition.x}%`,
            transform: characterDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
            transition: isJumping ? 'bottom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'
          }}
        >
          <div className="relative w-16 h-16 md:w-24 md:h-24">
            <div className="w-full h-full relative overflow-hidden rounded-full bg-gamius border-2 border-white shadow-lg shadow-gamius/50">
              <div 
                className={`absolute inset-0 ${isMoving ? 'animate-pulse' : ''}`}
                style={{
                  backgroundImage: "url('/item_images/logo/gamiusgroup-631x311.png')",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Contenu de l'étape */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-40 text-center max-w-xl px-6">
          <motion.h2
            key={`title-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            {gameSteps[currentStep].title}
          </motion.h2>
          
          <motion.p
            key={`desc-${currentStep}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 mb-8"
          >
            {gameSteps[currentStep].description}
          </motion.p>
          
          {currentStep === gameSteps.length - 1 ? (
            <Button
              onClick={handleRedirect}
              className="bg-gamius hover:bg-gamius/80 text-white px-8 py-3 text-lg"
              disabled={isRedirecting}
            >
              {isRedirecting ? (
                <span className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                  {locale === 'fr' ? 'Redirection...' : 'Redirecting...'}
                </span>
              ) : gameSteps[currentStep].action}
            </Button>
          ) : (
            <Button
              onClick={handleNextStep}
              className="bg-gamius hover:bg-gamius/80 text-white px-8 py-3 text-lg"
            >
              {gameSteps[currentStep].action}
            </Button>
          )}
        </div>
        
        {/* Aide aux contrôles du jeu */}
        {showControls && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 bg-black/60 backdrop-blur-sm p-4 rounded-lg text-white text-center">
            <p className="text-sm font-medium mb-2">
              {locale === 'fr' ? 'Contrôles du jeu' : 'Game Controls'}
            </p>
            <div className="flex justify-center space-x-4 text-xs">
              <div>
                <span className="px-2 py-1 bg-white/20 rounded">←</span>
                <span className="px-2 py-1 bg-white/20 rounded mx-1">→</span>
                <span className="block mt-1">{locale === 'fr' ? 'Se déplacer' : 'Move'}</span>
              </div>
              <div>
                <span className="px-2 py-1 bg-white/20 rounded">↑</span>
                <span className="block mt-1">{locale === 'fr' ? 'Sauter' : 'Jump'}</span>
              </div>
            </div>
            <button 
              onClick={() => setShowControls(false)}
              className="mt-2 text-xs underline"
            >
              {locale === 'fr' ? 'Fermer' : 'Close'}
            </button>
          </div>
        )}

        {/* Indicateur de progression */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2">
          {gameSteps.map((_, index) => (
            <div 
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentStep ? 'bg-gamius' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CSS pour l'animation de chute des particules */}
      <style jsx global>{`
        @keyframes fall {
          0% { transform: translateY(0); opacity: 0.7; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default GamiusInteractiveWorld;
