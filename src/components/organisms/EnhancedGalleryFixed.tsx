'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/button';
// Using explicit locale prop; avoid next-intl in this component

// Définition des projets de la galerie avec données de localisation
const GALLERY_PROJECTS = [
  {
    id: 'coca-cola',
    title: { fr: 'Coca Cola Events', en: 'Coca Cola Events' },
    category: { fr: 'Événementiel', en: 'Events' },
    description: {
      fr: "Conception et réalisation d'une expérience immersive pour Coca Cola lors d'un événement majeur à Casablanca.",
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
      fr: "Campagne d'activation de marque pour Sprite avec des installations interactives dans les espaces publics.",
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
  }
];

// Image de secours en cas d'erreur
const FALLBACK_IMAGE = '/item_images/image/G.png';

// Interface pour les textes localisés
interface LocaleText {
  fr: string;
  en: string;
}

// Props du composant de galerie
interface EnhancedGalleryFixedProps {
  limit?: number;
  title?: LocaleText;
  subtitle?: LocaleText;
  className?: string;
  showFilters?: boolean;
  locale?: 'fr' | 'en';
}

const EnhancedGalleryFixed: React.FC<EnhancedGalleryFixedProps> = ({ 
  limit = GALLERY_PROJECTS.length, 
  title = { fr: 'NOS PROJETS', en: 'OUR PROJECTS' },
  subtitle = { 
    fr: 'Découvrez nos réalisations récentes et comment nous transformons les marques',
    en: 'Discover our recent achievements and how we transform brands'
  },
  className = '',
  showFilters = false,
  locale = 'en'
}) => {
  // locale provided via props with 'en' default
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<typeof GALLERY_PROJECTS[0] | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  useEffect(() => {
    // Simuler un chargement
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  
  // Récupérer les catégories uniques
  const categories = React.useMemo(() => {
    const uniqueCategories = new Set<string>();
    GALLERY_PROJECTS.forEach(project => {
      uniqueCategories.add(project.category[locale]);
    });
    return Array.from(uniqueCategories);
  }, [locale]);
  
  // Filtrer les projets par catégorie
  const filteredProjects = React.useMemo(() => {
    const projectsToDisplay = GALLERY_PROJECTS.slice(0, limit);
    
    if (!activeCategory) {
      return projectsToDisplay;
    }
    
    return projectsToDisplay.filter(project => 
      project.category[locale] === activeCategory
    );
  }, [limit, activeCategory, locale]);
  
  // Fonction pour changer l'image du projet sélectionné
  const handleImageChange = (index: number) => {
    setImageIndex(index);
  };
  
  // Fonction pour ouvrir/fermer le modal de projet
  const toggleProject = (project: typeof GALLERY_PROJECTS[0] | null) => {
    setSelectedProject(project);
    if (project) {
      // Réinitialiser l'index d'image à 0 lors de l'ouverture du projet
      setImageIndex(0);
      // Empêcher le défilement du body quand le modal est ouvert
      document.body.style.overflow = 'hidden';
    } else {
      // Restaurer le défilement du body quand le modal est fermé
      document.body.style.overflow = 'auto';
    }
  };
  
  // Récupération de l'image courante
  const getCurrentImage = () => {
    if (!selectedProject) return '';
    
    if (imageIndex === 0) {
      return selectedProject.mainImage;
    }
    
    const adjustedIndex = imageIndex - 1;
    return selectedProject.images[adjustedIndex] || FALLBACK_IMAGE;
  };
  
  return (
    <MotionConfig transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}>
      <section className={`relative py-24 bg-black ${className}`}>
        <div className="container mx-auto px-4">
          {/* Titre et sous-titre */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Typography variant="h2" className="mb-4">
              {title[locale]}
            </Typography>
            <Typography variant="body" color="muted" className="md:text-lg max-w-2xl mx-auto">
              {subtitle[locale]}
            </Typography>
          </div>
          
          {/* Filtres de catégorie */}
          {showFilters && (
            <div className="flex justify-center flex-wrap gap-3 mb-12">
              <button
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  activeCategory === null ? 'bg-white text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory(null)}
              >
                {locale === 'fr' ? 'Tous' : 'All'}
              </button>
              
              {categories.map((category) => (
                <button
                  key={category}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    activeCategory === category ? 'bg-white text-black' : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
          
          {/* Galerie de projets */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory || 'all'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 fade-in"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6 }}
                  className={`relative cursor-pointer overflow-hidden rounded-lg ${project.size === 'large' ? 'row-span-2' : ''} ${project.size === 'small' ? 'col-span-1' : ''} ${project.size === 'medium' ? 'md:col-span-2 lg:col-span-1' : ''}`}
                  onClick={() => toggleProject(project)}
                >
                  <div className={`relative overflow-hidden ${project.size === 'large' ? 'aspect-[3/4]' : 'aspect-square'}`}>
                    {isLoading ? (
                      <div className="absolute inset-0 bg-gray-900 animate-pulse" />
                    ) : (
                      <>
                        <div className="relative w-full h-full">
                          <Image
                            src={project.mainImage}
                            alt={project.title[locale as keyof LocaleText]}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ 
                              position: 'absolute', 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              maxWidth: '100%'
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = FALLBACK_IMAGE;
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <Typography variant="h4" className="text-white mb-2">
                              {project.title[locale as keyof LocaleText]}
                            </Typography>
                            <div className="flex items-center justify-between">
                              <span className="text-sm bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                {project.category[locale as keyof LocaleText]}
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
                          className="relative w-full h-full"
                        >
                          <Image
                            src={getCurrentImage()}
                            alt={selectedProject.title[locale]}
                            fill
                            className="object-cover"
                            style={{ 
                              position: 'absolute', 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              maxWidth: '100%'
                            }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = FALLBACK_IMAGE;
                            }}
                          />
                        </motion.div>
                      </AnimatePresence>
                      
                      {/* Contrôles de navigation */}
                      {selectedProject.images.length > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div className="flex justify-center gap-2">
                            <button
                              className={`w-3 h-3 rounded-full ${imageIndex === 0 ? 'border-white' : 'border-transparent hover:border-white/50'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleImageChange(0);
                              }}
                            />
                            {selectedProject.images.map((_, idx) => (
                              <button
                                key={idx}
                                className={`w-3 h-3 rounded-full ${imageIndex === idx + 1 ? 'border-white' : 'border-transparent hover:border-white/50'}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleImageChange(idx + 1);
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Côté informations */}
                    <div className="p-8 overflow-y-auto max-h-[90vh] md:max-h-[unset]">
                      <Typography variant="h3" className="mb-4">
                        {selectedProject.title[locale as keyof LocaleText]}
                      </Typography>
                      
                      <div className="flex flex-wrap gap-4 mb-8">
                        <div className="bg-white/10 rounded-lg p-3">
                          <Typography variant="body" color="muted" className="text-xs">
                            {locale === 'fr' ? 'CATÉGORIE' : 'CATEGORY'}
                          </Typography>
                          <Typography variant="body" className="font-medium">
                            {selectedProject.category[locale]}
                          </Typography>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-3">
                          <Typography variant="body" color="muted" className="text-xs">
                            {locale === 'fr' ? 'CLIENT' : 'CLIENT'}
                          </Typography>
                          <Typography variant="body" className="font-medium">
                            {selectedProject.client}
                          </Typography>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-3">
                          <Typography variant="body" color="muted" className="text-xs">
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
                            className={`relative aspect-square rounded overflow-hidden border-2 cursor-pointer ${imageIndex === 0 ? 'border-white' : 'border-transparent hover:border-white/50'}`}
                            onClick={() => handleImageChange(0)}
                          >
                            <div className="next-image-wrapper">
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
                          </div>
                          
                          {selectedProject.images.map((img, idx) => (
                            <div 
                              key={idx}
                              className={`relative aspect-square rounded overflow-hidden border-2 cursor-pointer ${imageIndex === idx + 1 ? 'border-white' : 'border-transparent hover:border-white/50'}`}
                              onClick={() => handleImageChange(idx + 1)}
                            >
                              <div className="next-image-wrapper">
                                <Image 
                                  src={img} 
                                  alt={`${selectedProject.title[locale]} ${idx + 1}`} 
                                  fill 
                                  className="object-cover"
                                  style={{ 
                                    position: 'absolute', 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover',
                                    maxWidth: '100%'
                                  }}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = FALLBACK_IMAGE;
                                  }}
                                />
                              </div>
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

export default EnhancedGalleryFixed;
