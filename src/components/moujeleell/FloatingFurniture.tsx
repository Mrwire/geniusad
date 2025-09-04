'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface FurnitureItem {
  id: string;
  name: string;
  image: string;
  description: string;
  dimensions: string;
  colors: string[];
  designCategory: string;
  available: boolean;
}

// Données des meubles (à remplacer par des données réelles de l'API ou CMS si nécessaire)
const furnitureData: FurnitureItem[] = [
  {
    id: 'canape-moderne',
    name: 'Canapé Moderne',
    image: '/moojandleel_item/Canape_moderne.png',
    description: 'Épuré dans sa forme, révolutionnaire dans sa conception. Une pièce qui change la façon dont nous percevons l\'espace.',
    dimensions: '220 x 90 x 85 cm',
    colors: ['#2C3E50', '#ECF0F1', '#E74C3C'],
    designCategory: 'Collection Minimalisme',
    available: true,
  },
  {
    id: 'chaise-longue',
    name: 'Chaise Longue Minimaliste',
    image: '/moojandleel_item/Chaiselongueminimaliste.png',
    description: 'L\'incarnation du repos repensé. Un objet qui ne fait pas de compromis entre forme et fonction.',
    dimensions: '160 x 55 x 40 cm',
    colors: ['#34495E', '#F1C40F', '#ECF0F1'],
    designCategory: 'Collection Équilibre',
    available: true,
  },
  {
    id: 'tableau-resine',
    name: 'Tableau en Bois et Résine Époxy',
    image: '/moojandleel_item/Tableau_en_bois_et_résine_époxy.png',
    description: 'L\'alliance parfaite entre tradition et innovation. Une œuvre d\'art qui réinvente l\'expression murale.',
    dimensions: '120 x 80 x 5 cm',
    colors: ['#16A085', '#2980B9', '#8E44AD'],
    designCategory: 'Collection Art Fonctionnel',
    available: true,
  },
  {
    id: 'bureau-gaming',
    name: 'Bureau Gaming',
    image: '/moojandleel_item/bureaugaming.png',
    description: 'Une station d\'immersion où performance et esthétique fusionnent. L\'expérience gaming totalement repensée.',
    dimensions: '140 x 70 x 75 cm',
    colors: ['#2C3E50', '#E74C3C', '#3498DB'],
    designCategory: 'Collection Digital Experience',
    available: false,
  },
  {
    id: 'bureau-pro-bois',
    name: 'Bureau Professionnel en Bois',
    image: '/moojandleel_item/bureaupro_bois.png',
    description: 'La quintessence du travail créatif. Un espace où chaque idée trouve sa source dans la pureté du matériau.',
    dimensions: '160 x 80 x 75 cm',
    colors: ['#D35400', '#7F8C8D', '#2C3E50'],
    designCategory: 'Collection Heritage',
    available: true,
  },
];

const FloatingFurniture: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<FurnitureItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation variants pour les meubles flottants - style Apple avec mouvements précis et élégants
  const floatVariants = {
    initial: (index: number) => ({
      y: 20,
      rotate: index % 2 === 0 ? -1 : 1,
      opacity: 0,
      scale: 0.9,
    }),
    animate: (index: number) => ({
      y: [0, -20, 0],
      rotate: index % 2 === 0 ? [-1, 1, -1] : [1, -1, 1],
      opacity: 1,
      scale: 1,
      transition: {
        y: {
          repeat: Infinity,
          duration: 5 + index * 0.3,
          ease: [0.4, 0.0, 0.2, 1], // Courbe Bezier style Apple
        },
        rotate: {
          repeat: Infinity,
          duration: 10 + index * 0.4,
          ease: [0.4, 0.0, 0.2, 1],
        },
        opacity: { duration: 1.2 },
        scale: { duration: 1.2, ease: [0.4, 0.0, 0.2, 1] }
      },
    }),
    hover: {
      y: -30,
      scale: 1.1,
      rotate: 0,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.5 }
    }
  };

  const handleItemClick = (item: FurnitureItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full min-h-[500px] relative flex flex-col items-center justify-center py-10">
      {/* Environnement de lévitation */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-indigo-900/30 z-0 rounded-3xl" />
      
      {/* Cercle lumineux au sol (effet de base pour la lévitation) */}
      <div className="absolute bottom-10 w-[80%] h-[20px] bg-purple-500/30 rounded-full blur-xl z-1" />
      
      {/* Meubles flottants */}
      <div className="relative w-full h-full flex items-center justify-center z-10">
        {furnitureData.map((item, index) => (
          <motion.div
            key={item.id}
            className="absolute cursor-pointer"
            style={{
              top: `${30 + (index * 5)}%`,
              left: `${15 + index * 17}%`,
              zIndex: 10 + index,
            }}
            custom={index}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            exit="exit"
            variants={floatVariants}
            onClick={() => handleItemClick(item)}
          >
            <div className="relative">
              <Image
                src={item.image}
                alt={item.name}
                width={200}
                height={200}
                className="object-contain filter drop-shadow-[0_10px_15px_rgba(90,60,160,0.5)]"
              />
              
              {/* Badge de catégorie de design - style Apple */}
              <motion.div 
                className="absolute -bottom-2 -right-2 bg-black/80 backdrop-blur-sm text-white font-medium px-3 py-1 rounded-full text-xs border border-white/10"
                initial={{ scale: 0, rotate: -5 }}
                animate={{ 
                  scale: 1,
                  rotate: [-5, 2, -5],
                  transition: {
                    rotate: {
                      repeat: Infinity,
                      duration: 6,
                      ease: [0.4, 0.0, 0.2, 1],
                    }
                  }
                }}
              >
                {item.designCategory}
              </motion.div>
              
              {/* Effet de lueur sous le meuble */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[80%] h-[10px] bg-purple-500/40 rounded-full blur-lg" />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Modal détaillé du meuble */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-slate-900 to-purple-900 text-white border-purple-500">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">{selectedItem?.name}</DialogTitle>
            <DialogDescription className="text-purple-200">
              Découvrez les détails de ce meuble exceptionnel
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="relative">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    width={280}
                    height={280}
                    className="object-contain mx-auto filter drop-shadow-[0_10px_25px_rgba(138,43,226,0.5)]"
                  />
                </motion.div>
              </div>
              
              <div className="flex flex-col space-y-4">
                <p className="text-sm text-purple-200">{selectedItem.description}</p>
                
                <div>
                  <h4 className="text-sm font-semibold text-purple-300">Dimensions</h4>
                  <p className="text-white">{selectedItem.dimensions}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-purple-300">Catégorie</h4>
                  <p className="text-xl font-medium text-white">{selectedItem.designCategory}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-purple-300">Couleurs disponibles</h4>
                  <div className="flex space-x-2 mt-1">
                    {selectedItem.colors.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-6 h-6 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3 mt-4">
                  <Button variant="default" className="bg-black hover:bg-black/90 text-white font-medium border border-white/10 rounded-full px-6">
                    Explorer
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white/90 hover:bg-white/10 rounded-full px-6"
                    disabled={!selectedItem.available}
                  >
                    {selectedItem.available ? "Visualiser en 3D" : "Bientôt disponible"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FloatingFurniture;
