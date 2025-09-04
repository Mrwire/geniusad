'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Division = {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
};

const divisions: Division[] = [
  {
    id: 'event',
    name: 'Gamius Event',
    description: 'GAMIUS conçoit des expériences gaming sur-mesure qui transcendent le simple divertissement pour devenir de puissants vecteurs d\'engagement.',
    image: '/item_images/gamius_filiale_isometric/gamius_event.png',
    color: '#9333ea', // purple
  },
  {
    id: 'code',
    name: 'Gamius Code',
    description: 'Nos développeurs conçoivent des expériences VR/AR qui offrent une perspective nouvelle sur votre produit ou service.',
    image: '/item_images/gamius_filiale_isometric/gamius_code.png',
    color: '#3b82f6', // blue
  },
  {
    id: 'studio',
    name: 'Gamius Studio',
    description: 'Création de contenu visuel pour l\'industrie du jeu avec une qualité premium et une direction artistique unique.',
    image: '/item_images/gamius_filiale_isometric/gamius_studio.png',
    color: '#f59e0b', // amber
  },
  {
    id: 'esport',
    name: 'Gamius eSport',
    description: 'La \'Sprite Game Arena\' – un dispositif hybride associant compétition e-sport nationale et expérience mobile gamifiée.',
    image: '/item_images/gamius_filiale_isometric/gamius_esport.png',
    color: '#ef4444', // red
  },
];

interface DivisionCardsProps {
  onSelectDivision?: (division: Division) => void;
}

export default function DivisionCards({ onSelectDivision }: DivisionCardsProps) {
  const [hoveredDivision, setHoveredDivision] = useState<string | null>(null);
  const [expandedDivision, setExpandedDivision] = useState<string | null>(null);

  const handleDivisionClick = (division: Division) => {
    if (expandedDivision === division.id) {
      setExpandedDivision(null);
    } else {
      setExpandedDivision(division.id);
    }
    
    if (onSelectDivision) {
      onSelectDivision(division);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {divisions.map((division) => {
        const isHovered = hoveredDivision === division.id;
        const isExpanded = expandedDivision === division.id;
        
        return (
          <motion.div
            key={division.id}
            className="relative overflow-hidden rounded-xl cursor-pointer"
            style={{ 
              backgroundColor: 'rgba(0,0,0,0.8)',
              boxShadow: `0 0 15px 2px ${division.color}40`,
              border: `1px solid ${division.color}40`
            }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: `0 0 20px 5px ${division.color}60`
            }}
            onHoverStart={() => setHoveredDivision(division.id)}
            onHoverEnd={() => setHoveredDivision(null)}
            onClick={() => handleDivisionClick(division)}
            transition={{ duration: 0.3 }}
            animate={{ 
              height: isExpanded ? 300 : 200
            }}
          >
            {/* Barre colorée en haut de la carte */}
            <div 
              className="h-2 w-full absolute top-0 left-0" 
              style={{ backgroundColor: division.color }}
            />
            
            {/* Image */}
            <div className="p-4 pt-6 h-[150px] flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={division.image}
                  alt={division.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="drop-shadow-lg transform transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Titre */}
            <div className="p-2 text-center">
              <h3 className="text-white font-bold text-lg">{division.name}</h3>
            </div>
            
            {/* Description (visible uniquement si carte étendue) */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div 
                  className="p-3 text-white/90 text-sm overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p>{division.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Indicateur d'expansion */}
            <div className="absolute bottom-2 right-2">
              <motion.div 
                className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center"
                animate={{ rotate: isExpanded ? 180 : 0 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
