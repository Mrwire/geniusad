'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/button';
import { useLocale } from 'next-intl';

// Définition des projets de la galerie avec données de localisation
const GALLERY_PROJECTS = [
  {
    id: 'coca-cola',
    title: { fr: 'Coca Cola Events', en: 'Coca Cola Events' },
    category: { fr: 'Événementiel', en: 'Events' },
    description: {
      fr: 'Conception et réalisation d'une expérience immersive pour Coca Cola lors d'un événement majeur à Casablanca.',
      en: 'Design and implementation of an immersive experience for Coca Cola during a major event in Casablanca.'
    },
    client: 'Coca Cola',
    year: '2023',
    mainImage: '/item_images/image/cocalcola1.jpg',
    images: [
      '/item_images/image/cocacola_stand.JPG',
      '/item_images/image/element/mps/4.jpg',
      '/item_images/image/element/element/6.jpg'
    ],
    size: 'large',
    subsidiary: 'LABRIG\'Ad'
  },
  {
    id: 'sprite',
    title: { fr: 'Sprite Campaign', en: 'Sprite Campaign' },
    category: { fr: 'Activation de marque', en: 'Brand Activation' },
    description: {
      fr: 'Campagne d'activation de marque pour Sprite avec des installations interactives dans les espaces publics.',
      en: 'Brand activation campaign for Sprite with interactive installations in public spaces.'
    },
    client: 'Sprite',
    year: '2023',
    mainImage: '/item_images/image/sprite2.JPG',
    images: [
      '/item_images/image/element/element/5.jpg',
      '/item_images/image/element/mps/2.jpg'
    ],
    size: 'medium',
    subsidiary: 'MPS'
  },
  {
    id: 'kia',
    title: { fr: 'Kia Motors', en: 'Kia Motors' },
    category: { fr: 'Showroom', en: 'Showroom' },
    description: {
      fr: 'Conception et installation d'un showroom temporaire pour le lancement du nouveau modèle Kia.',
      en: 'Design and installation of a temporary showroom for the launch of the new Kia model.'
    },
    client: 'Kia',
    year: '2022',
    mainImage: '/item_images/image/kia3.jpg',
    images: [
      '/item_images/image/element/mps/7.jpg',
      '/item_images/image/element/element/9.jpg'
    ],
    size: 'medium',
    subsidiary: 'LABRIG\'Ad'
  },
  {
    id: 'loreal',
    title: { fr: 'L\'Oréal Paris', en: 'L\'Oréal Paris' },
    category: { fr: 'Marketing', en: 'Marketing' },
    description: {
      fr: 'Campagne de marketing intégrée pour L\'Oréal Paris, comprenant des activations en magasin et une stratégie digitale.',
      en: 'Integrated marketing campaign for L\'Oréal Paris, including in-store activations and digital strategy.'
    },
    client: 'L\'Oréal',
    year: '2023',
    mainImage: '/item_images/image/element/element/loreal2.jpg',
    images: [
      '/item_images/image/element/element/3.jpg',
      '/item_images/image/element/mps/8.jpg'
    ],
    size: 'small',
    subsidiary: 'MPS'
  },
  {
    id: 'samsung',
    title: { fr: 'Samsung Galaxy', en: 'Samsung Galaxy' },
    category: { fr: 'Lancement de produit', en: 'Product Launch' },
    description: {
      fr: 'Lancement de produit pour le nouveau Samsung Galaxy, incluant une expérience immersive et des démonstrations interactives.',
      en: 'Product launch for the new Samsung Galaxy, including an immersive experience and interactive demonstrations.'
    },
    client: 'Samsung',
    year: '2023',
    mainImage: '/item_images/image/sam2.JPG',
    images: [
      '/item_images/image/sam7.jpg',
      '/item_images/image/element/element/4.jpg'
    ],
    size: 'large',
    subsidiary: 'Mouje & Leell'
  },
  {
    id: 'inwi',
    title: { fr: 'Inwi Gaming', en: 'Inwi Gaming' },
    category: { fr: 'E-Sport', en: 'E-Sport' },
    description: {
      fr: 'Organisation d'un événement gaming majeur pour Inwi, avec des tournois e-sport et des activations de marque.',
      en: 'Organization of a major gaming event for Inwi, with e-sport tournaments and brand activations.'
    },
    client: 'Inwi',
    year: '2023',
    mainImage: '/item_images/image/inwi_event_gaming.jfif',
    images: [
      '/item_images/image/element/mps/5.jpg',
      '/item_images/image/element/element/10.jpg'
    ],
    size: 'medium',
    subsidiary: 'Gamius'
  }
];

// Image de secours en cas d'erreur
const FALLBACK_IMAGE = '/item_images/image/G.png';

// Types pour les projets de la galerie
type Project = typeof GALLERY_PROJECTS[0];
type LocaleText = { fr: string; en: string };

interface GalleryMasonryProps {
  limit?: number;
  title?: LocaleText;
  subtitle?: LocaleText;
  className?: string;
}

const GalleryMasonry: React.FC<GalleryMasonryProps> = ({ 
  limit = GALLERY_PROJECTS.length, 
  title = { fr: 'NOS PROJETS', en: 'OUR PROJECTS' },
  subtitle = { 
    fr: 'Découvrez nos réalisations récentes et comment nous transformons les marques',
    en: 'Discover our recent achievements and how we transform brands'
  },
  className = ''
}) => {
  const locale = useLocale() as 'fr' | 'en';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Effet pour simuler le chargement des images
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Extraction des catégories uniques
  const categories = ['All', ...new Set(GALLERY_PROJECTS.map(project => project.category[locale]))];

  // Filtrage des projets par catégorie
  const filteredProjects = GALLERY_PROJECTS
    .filter(project => selectedCategory === null || selectedCategory === 'All' || project.category[locale] === selectedCategory)
    .slice(0, limit);

  // Fonction pour changer l'image du projet sélectionné
  const handleImageChange = (index: number) => {
    setImageIndex(index);
  };

  // Fonction pour ouvrir/fermer le modal de projet
  const toggleProject = (project: Project | null) => {
    setSelectedProject(project);
    setImageIndex(0);
    
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Récupération de l'image courante
  const getCurrentImage = () => {
    if (!selectedProject) return '';
    
    if (imageIndex === 0) {
      return selectedProject.mainImage;
    }
    
    return selectedProject.images[imageIndex - 1];
  };

  return (
    <MotionConfig transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}>
      <section className={`bg-black text-white py-24 ${className}`}>
        <div className="container mx-auto px-4">
          {/* En-tête de la galerie */}
          <div className="mb-16 text-center">
            <Typography variant="h2" className="mb-4">
              {title[locale]}
            </Typography>
            <Typography variant="body" color="muted" className="max-w-2xl mx-auto">
              {subtitle[locale]}
            </Typography>
            
            {/* Filtres de catégorie */}
            <div className="mt-12 flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-sm ${selectedCategory === category ? 'bg-white text-black' : 'border-white/20 hover:bg-white/10'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Grille de projets en masonry */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6 }}
                  className={`
                    relative cursor-pointer overflow-hidden rounded-lg 
                    ${project.size === 'large' ? 'row-span-2' : ''}
                    ${project.size === 'small' ? 'col-span-1' : ''}
                    ${project.size === 'medium' ? 'md:col-span-2 lg:col-span-1' : ''}
                  `}
                  onClick={() => toggleProject(project)}
                >
                  <div className={`
                    aspect-square relative overflow-hidden
                    ${project.size === 'large' ? 'aspect-[3/4]' : 'aspect-square'}
                  `}>
                    {isLoading ? (
                      <div className="absolute inset-0 bg-gray-900 animate-pulse" />
                    ) : (
                      <>
                        <div className="relative w-full h-full">
                          <Image
                            src={project.mainImage}
                            alt={project.title[locale]}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ position: 'absolute', height: '100%', width: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = FALLBACK_IMAGE;
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <Typography variant="h4" className="text-white mb-2">
                              {project.title[locale]}
                            </Typography>
                            <div className="flex items-center justify-between">
                              <span className="text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                {project.category[locale]}
                              </span>
                              <span className="text-sm text-gray-300">
                                {project.year}
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Modal du projet */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                onClick={() => toggleProject(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="relative bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/80 transition-colors"
                    onClick={() => toggleProject(null)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    {/* Côté image */}
                    <div className="relative bg-black aspect-square md:aspect-auto md:h-full">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={imageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Image
                            src={getCurrentImage()}
                            alt={selectedProject.title[locale]}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-contain p-8"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = FALLBACK_IMAGE;
                            }}
                          />
                        </motion.div>
                      </AnimatePresence>
                      
                      {/* Navigation des images */}
                      <div className="absolute left-4 right-4 bottom-4 flex justify-between">
                        <button
                          className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            const max = selectedProject.images.length + 1;
                            setImageIndex((imageIndex - 1 + max) % max);
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        
                        <div className="text-sm bg-black/60 rounded-full px-3 py-2">
                          {imageIndex + 1} / {selectedProject.images.length + 1}
                        </div>
                        
                        <button
                          className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            const max = selectedProject.images.length + 1;
                            setImageIndex((imageIndex + 1) % max);
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Côté détails */}
                    <div className="p-8 overflow-y-auto">
                      <Typography variant="h3" className="mb-4">
                        {selectedProject.title[locale]}
                      </Typography>
                      
                      <div className="flex gap-3 mb-6">
                        <span className="text-sm bg-gray-800 rounded-full px-3 py-1">
                          {selectedProject.category[locale]}
                        </span>
                        <span className="text-sm bg-gray-800 rounded-full px-3 py-1">
                          {selectedProject.subsidiary}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                          <Typography variant="body" color="muted" className="text-sm mb-1">
                            {locale === 'fr' ? 'CLIENT' : 'CLIENT'}
                          </Typography>
                          <Typography variant="body" className="font-medium">
                            {selectedProject.client}
                          </Typography>
                        </div>
                        
                        <div>
                          <Typography variant="body" color="muted" className="text-sm mb-1">
                            {locale === 'fr' ? 'ANNÉE' : 'YEAR'}
                          </Typography>
                          <Typography variant="body" className="font-medium">
                            {selectedProject.year}
                          </Typography>
                        </div>
                      </div>
                      
                      <Typography variant="h6" className="mb-4">
                        {locale === 'fr' ? 'À propos du projet' : 'About the project'}
                      </Typography>
                      
                      <Typography variant="body" color="muted" className="mb-8">
                        {selectedProject.description[locale]}
                      </Typography>
                      
                      {/* Miniatures */}
                      <div className="space-y-4">
                        <Typography variant="body" color="muted" className="text-sm">
                          {locale === 'fr' ? 'GALERIE D\'IMAGES' : 'IMAGE GALLERY'}
                        </Typography>
                        
                        <div className="grid grid-cols-4 gap-3">
                          <div 
                            className={`relative aspect-square rounded overflow-hidden border-2 cursor-pointer ${
                              imageIndex === 0 ? 'border-white' : 'border-transparent hover:border-white/50'
                            }`}
                            onClick={() => handleImageChange(0)}
                          >
                            <Image 
                              src={selectedProject.mainImage} 
                              alt={selectedProject.title[locale]} 
                              fill 
                              className="object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = FALLBACK_IMAGE;
                              }}
                            />
                          </div>
                          
                          {selectedProject.images.map((img, idx) => (
                            <div 
                              key={idx}
                              className={`relative aspect-square rounded overflow-hidden border-2 cursor-pointer ${
                                imageIndex === idx + 1 ? 'border-white' : 'border-transparent hover:border-white/50'
                              }`}
                              onClick={() => handleImageChange(idx + 1)}
                            >
                              <Image 
                                src={img} 
                                alt={`${selectedProject.title[locale]} ${idx + 1}`} 
                                fill 
                                className="object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = FALLBACK_IMAGE;
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Bouton pour voir plus de projets */}
          {limit < GALLERY_PROJECTS.length && (
            <div className="mt-16 text-center">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/20 hover:bg-white/10"
                asChild
              >
                <a href="/gallery">
                  {locale === 'fr' ? 'Voir tous les projets' : 'View all projects'}
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
};

export default GalleryMasonry;
