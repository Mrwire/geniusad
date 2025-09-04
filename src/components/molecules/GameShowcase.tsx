'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GameItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface GameShowcaseProps {
  title: string;
  subtitle: string;
  games: GameItem[];
  theme?: 'gamius' | 'mps' | 'labrigad' | 'moujeleell';
}

export default function GameShowcase({
  title,
  subtitle,
  games,
  theme = 'gamius'
}: GameShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGame = games[activeIndex];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-${theme}`}>{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Game Selector - Small Thumbnails */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ x: 5 }}
                  className={`p-2 cursor-pointer rounded-md transition-colors duration-300 ${
                    index === activeIndex 
                      ? `bg-${theme} text-white` 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-sm">{game.title}</h3>
                      <span className={`text-xs ${index === activeIndex ? 'text-white/80' : `text-${theme}`}`}>
                        {game.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Featured Game Display */}
          <div className="lg:col-span-9">
            <motion.div
              key={activeGame.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-80 md:h-96 w-full">
                <Image
                  src={activeGame.image}
                  alt={activeGame.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                
                {/* Game Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{activeGame.title}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs text-white bg-${theme} mb-2`}>
                    {activeGame.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700">{activeGame.description}</p>
                
                <div className="mt-6 flex justify-end">
                  <button className={`bg-${theme} hover:bg-${theme}/90 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300`}>
                    View Project
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 