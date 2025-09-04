'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

interface Character {
  x: number;
  y: number;
  direction: 'left' | 'right';
  isJumping: boolean;
  isMoving: boolean;
}

interface GameExperienceProps {
  onComplete?: () => void;
  redirectUrl?: string;
}

const GameExperience: React.FC<GameExperienceProps> = ({
  onComplete,
  redirectUrl = 'https://gamiusgroup.ma'
}) => {
  const locale = useLocale();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  const [character, setCharacter] = useState<Character>({
    x: 50,
    y: 0,
    direction: 'right',
    isJumping: false,
    isMoving: false
  });

  const [keyState, setKeyState] = useState({
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    Space: false
  });

  // Game level content
  const gameLevels = [
    {
      id: 'intro',
      title: locale === 'fr' ? 'Bienvenue dans l\'Univers Gamius' : 'Welcome to the Gamius Universe',
      content: locale === 'fr' 
        ? 'Embarquez pour une aventure interactive à travers le monde du gaming et de l\'e-sport avec Gamius.' 
        : 'Embark on an interactive adventure through the world of gaming and e-sports with Gamius.',
      action: locale === 'fr' ? 'Commencer l\'aventure' : 'Start the adventure',
      background: '/subsidiaries/gamius-level1.jpg'
    },
    {
      id: 'level1',
      title: locale === 'fr' ? 'Notre Mission' : 'Our Mission',
      content: locale === 'fr'
        ? 'Gamius crée des expériences gaming immersives et organise des événements e-sport de premier plan au Maroc et à l\'international.'
        : 'Gamius creates immersive gaming experiences and organizes premier e-sports events in Morocco and internationally.',
      action: locale === 'fr' ? 'Continuer' : 'Continue',
      background: '/subsidiaries/gamius-level2.jpg'
    },
    {
      id: 'level2',
      title: locale === 'fr' ? 'Nos Services' : 'Our Services',
      content: locale === 'fr'
        ? 'Tournois e-sport, production d\'événements gaming, gestion de talents et intégration des marques dans l\'écosystème gaming.'
        : 'E-sports tournaments, gaming event production, talent management and brand integration in the gaming ecosystem.',
      action: locale === 'fr' ? 'Explorer davantage' : 'Explore more',
      background: '/subsidiaries/gamius-level3.jpg'
    },
    {
      id: 'final',
      title: locale === 'fr' ? 'Prêt à Jouer ?' : 'Ready to Play?',
      content: locale === 'fr'
        ? 'Découvrez plus sur notre site officiel et rejoignez la communauté Gamius dès aujourd\'hui !'
        : 'Discover more on our official website and join the Gamius community today!',
      action: locale === 'fr' ? 'Visiter le site officiel' : 'Visit the official site',
      background: '/subsidiaries/gamius-hero.jpg'
    }
  ];

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
        e.preventDefault();
        setKeyState(prev => ({ ...prev, [e.code === 'Space' ? 'Space' : e.code]: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
        e.preventDefault();
        setKeyState(prev => ({ ...prev, [e.code === 'Space' ? 'Space' : e.code]: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Character movement logic
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setCharacter(prev => {
        let newX = prev.x;
        let newDirection = prev.direction;
        let isMoving = false;

        if (keyState.ArrowLeft) {
          newX = Math.max(0, prev.x - 3);
          newDirection = 'left';
          isMoving = true;
        }
        if (keyState.ArrowRight) {
          newX = Math.min(90, prev.x + 3);
          newDirection = 'right';
          isMoving = true;
        }

        // Handle jumping
        let newY = prev.y;
        let isJumping = prev.isJumping;

        if ((keyState.ArrowUp || keyState.Space) && !prev.isJumping) {
          isJumping = true;
        }

        if (isJumping) {
          // Simple jump animation
          if (prev.y < 20 && !keyState.ArrowDown) {
            newY = prev.y + 2;
          } else {
            newY = Math.max(0, prev.y - 2);
            if (newY === 0) {
              isJumping = false;
            }
          }
        }

        return {
          ...prev,
          x: newX,
          y: newY,
          direction: newDirection,
          isJumping,
          isMoving
        };
      });
    }, 16); // ~60fps

    return () => clearInterval(moveInterval);
  }, [keyState]);

  // Auto progress through levels when character reaches the right side
  useEffect(() => {
    if (character.x >= 85 && currentLevel < gameLevels.length - 1) {
      setCurrentLevel(prev => prev + 1);
      setCharacter(prev => ({ ...prev, x: 10 }));
    }
  }, [character.x, currentLevel, gameLevels.length]);

  // Handle redirect
  const handleRedirect = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1500);
  };

  return (
    <div className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-black">
      {/* Game container */}
      <div 
        ref={gameContainerRef}
        className="relative w-full h-[calc(100vh-6rem)] overflow-hidden"
        style={{ 
          backgroundImage: `url(${gameLevels[currentLevel].background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Game overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        {/* Character */}
        <motion.div
          className="absolute z-20"
          style={{
            bottom: `${character.y}%`,
            left: `${character.x}%`,
            transform: character.direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)'
          }}
          animate={{
            y: character.isJumping ? [0, -30, 0] : 0,
            transition: {
              y: { duration: 0.5, ease: "easeOut" },
              default: { duration: 0.1 }
            }
          }}
        >
          <div className="relative w-16 h-16 md:w-24 md:h-24">
            <Image
              src="/subsidiaries/game-character.png"
              alt="Game Character"
              fill
              style={{ objectFit: "contain" }}
              className={`${character.isMoving ? 'animate-bounce' : ''}`}
            />
          </div>
        </motion.div>
        
        {/* Level content */}
        <motion.div 
          className="absolute top-1/4 left-1/2 transform -translate-x-1/2 z-30 text-center max-w-xl px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          key={gameLevels[currentLevel].id}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            {gameLevels[currentLevel].title}
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-8">
            {gameLevels[currentLevel].content}
          </p>
          
          {currentLevel === gameLevels.length - 1 ? (
            <Button
              onClick={handleRedirect}
              className="bg-gamius hover:bg-gamius/80 text-white px-8 py-3 text-lg"
              disabled={isRedirecting}
            >
              {isRedirecting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {locale === 'fr' ? 'Redirection...' : 'Redirecting...'}
                </span>
              ) : gameLevels[currentLevel].action}
            </Button>
          ) : (
            <Button
              onClick={() => {
                setCurrentLevel(prev => prev + 1);
                setCharacter(prev => ({ ...prev, x: 10 }));
              }}
              className="bg-gamius hover:bg-gamius/80 text-white px-8 py-3 text-lg"
            >
              {gameLevels[currentLevel].action}
            </Button>
          )}
        </motion.div>
        
        {/* Game controls help */}
        {showControls && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 bg-black/60 backdrop-blur-sm p-4 rounded-lg text-white text-center">
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

        {/* Progress indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {gameLevels.map((_, index) => (
            <div 
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentLevel ? 'bg-gamius' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameExperience;
