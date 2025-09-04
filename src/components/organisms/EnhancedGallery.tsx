'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/button';

// Define gallery items with their metadata
const GALLERY_ITEMS = [
  { 
    title: "Coca Cola Events", 
    category: "Événementiel",
    year: "2023",
    client: "Coca Cola",
    description: "Conception et réalisation d'une expérience immersive pour Coca Cola lors d'un événement majeur à Casablanca.",
    imageUrl: "/item_images/image/cocalcola1.jpg",
    subsidiary: "LABRIG'Ad",
    additionalImages: [
      "/item_images/image/cocacola_stand.JPG",
      "/item_images/image/element/mps/4.jpg",
      "/item_images/image/element/element/6.jpg"
    ] 
  },
  { 
    title: "Sprite Campaign", 
    category: "Activation de marque",
    year: "2023",
    client: "Sprite",
    description: "Campagne d'activation de marque pour Sprite avec des installations interactives dans les espaces publics.",
    imageUrl: "/item_images/image/sprite2.JPG",
    subsidiary: "MPS",
    additionalImages: [
      "/item_images/image/element/element/5.jpg",
      "/item_images/image/element/mps/2.jpg"
    ] 
  },
  { 
    title: "Kia Motors", 
    category: "Showroom",
    year: "2022",
    client: "Kia",
    description: "Conception et installation d'un showroom temporaire pour le lancement du nouveau modèle Kia.",
    imageUrl: "/item_images/image/kia3.jpg",
    subsidiary: "LABRIG'Ad",
    additionalImages: [
      "/item_images/image/element/mps/7.jpg",
      "/item_images/image/element/element/9.jpg"
    ] 
  },
  { 
    title: "L'Oréal Paris", 
    category: "Marketing",
    year: "2023",
    client: "L'Oréal",
    description: "Campagne de marketing intégrée pour L'Oréal Paris, comprenant des activations en magasin et une stratégie digitale.",
    imageUrl: "/item_images/image/element/element/loreal2.jpg",
    subsidiary: "MPS",
    additionalImages: [
      "/item_images/image/element/element/3.jpg",
      "/item_images/image/element/mps/8.jpg"
    ] 
  },
  { 
    title: "Samsung Galaxy", 
    category: "Product Launch",
    year: "2023",
    client: "Samsung",
    description: "Lancement de produit pour le nouveau Samsung Galaxy, incluant une expérience immersive et des démonstrations interactives.",
    imageUrl: "/item_images/image/sam2.JPG",
    subsidiary: "Mouje & Leell",
    additionalImages: [
      "/item_images/image/sam7.jpg",
      "/item_images/image/element/element/4.jpg"
    ] 
  },
  { 
    title: "Inwi Gaming", 
    category: "E-Sport",
    year: "2023",
    client: "Inwi",
    description: "Organisation d'un événement gaming majeur pour Inwi, avec des tournois e-sport et des activations de marque.",
    imageUrl: "/item_images/image/inwi_event_gaming.jfif",
    subsidiary: "Gamius",
    additionalImages: [
      "/item_images/image/element/mps/5.jpg",
      "/item_images/image/element/element/10.jpg"
    ] 
  },
  { 
    title: "Schneider Electric", 
    category: "Exposition",
    year: "2022",
    client: "Schneider",
    description: "Conception et réalisation d'un stand d'exposition pour Schneider Electric lors d'un salon professionnel.",
    imageUrl: "/item_images/image/Shne3.jpg",
    subsidiary: "LABRIG'Ad",
    additionalImages: [
      "/item_images/image/element/element/13.jpg",
      "/item_images/image/element/mps/1.jpg"
    ] 
  },
  { 
    title: "Samsung Display", 
    category: "Retail",
    year: "2023",
    client: "Samsung",
    description: "Conception d'espaces de présentation produit pour Samsung dans les points de vente premium.",
    imageUrl: "/item_images/image/sam7.jpg",
    subsidiary: "Mouje & Leell",
    additionalImages: [
      "/item_images/image/sam2.JPG",
      "/item_images/image/element/element/15.jpg"
    ] 
  }
];

// Fallback image
const FALLBACK_IMAGE = "/item_images/image/G.png";

// Define gallery category filters
const CATEGORIES = [
  "Tous", 
  "Événementiel", 
  "E-Sport", 
  "Marketing", 
  "Product Launch",
  "Retail",
  "Showroom",
  "Exposition"
];

// Define gallery subsidiary filters
const SUBSIDIARIES = [
  "Tous",
  "MPS",
  "LABRIG'Ad",
  "Gamius",
  "Mouje & Leell"
];

interface EnhancedGalleryProps {
  limit?: number;
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
  containerClassName?: string;
}

export default function EnhancedGallery({ 
  limit = 8, 
  showFilters = true, 
  title = "NOS RÉALISATIONS",
  subtitle = "Découvrez nos projets récents et comment nous transformons les marques",
  containerClassName = "py-24"
}: EnhancedGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedSubsidiary, setSelectedSubsidiary] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter gallery items based on selected category and subsidiary
  const filteredItems = GALLERY_ITEMS.filter(item => {
    const categoryMatch = selectedCategory === "Tous" || item.category === selectedCategory;
    const subsidiaryMatch = selectedSubsidiary === "Tous" || item.subsidiary === selectedSubsidiary;
    return categoryMatch && subsidiaryMatch;
  }).slice(0, limit);

  // Handle filter change
  const handleCategoryChange = (category: string) => {
    setIsAnimating(true);
    setSelectedCategory(category);
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const handleSubsidiaryChange = (subsidiary: string) => {
    setIsAnimating(true);
    setSelectedSubsidiary(subsidiary);
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  // Handle project selection
  const openProject = (index: number) => {
    setSelectedProject(index);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeProject = () => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  };

  // Handle image navigation
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject === null) return;
    
    const item = filteredItems[selectedProject];
    const maxIndex = item.additionalImages.length;
    setCurrentImageIndex(prev => (prev + 1) % (maxIndex + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject === null) return;
    
    const item = filteredItems[selectedProject];
    const maxIndex = item.additionalImages.length;
    setCurrentImageIndex(prev => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
  };

  // Get current image URL
  const getCurrentImageUrl = () => {
    if (selectedProject === null) return "";
    
    const item = filteredItems[selectedProject];
    if (currentImageIndex === 0) {
      return item.imageUrl;
    }
    return item.additionalImages[currentImageIndex - 1];
  };

  // Handle click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeProject();
      }
    };

    if (selectedProject !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedProject]);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      } 
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 1, 1]
      } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className={`bg-black text-white ${containerClassName}`}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <Typography variant="h2" className="text-center mb-2">{title}</Typography>
          <Typography variant="body" color="muted" className="text-center max-w-3xl mx-auto">
            {subtitle}
          </Typography>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-12">
            <div className="flex flex-col space-y-6">
              {/* Category filters */}
              <div className="overflow-x-auto pb-2">
                <div className="flex space-x-2 min-w-max">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-white text-black'
                          : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Subsidiary filters */}
              <div className="overflow-x-auto pb-2">
                <div className="flex space-x-2 min-w-max">
                  {SUBSIDIARIES.map(subsidiary => (
                    <button
                      key={subsidiary}
                      onClick={() => handleSubsidiaryChange(subsidiary)}
                      className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
                        selectedSubsidiary === subsidiary
                          ? 'bg-white text-black'
                          : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {subsidiary}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${selectedSubsidiary}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                variants={itemVariants}
                className="relative bg-gray-900 rounded-lg overflow-hidden group cursor-pointer transition-transform duration-500 hover:scale-[1.02]"
                onClick={() => openProject(index)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = FALLBACK_IMAGE;
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                    {item.category}
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Typography variant="h4" className="mb-1 text-white line-clamp-1">
                      {item.title}
                    </Typography>
                    <Typography variant="body" color="muted" className="text-sm mb-2 line-clamp-2">
                      {item.description}
                    </Typography>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">{item.year}</span>
                      <span className="text-xs font-medium px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full">
                        {item.subsidiary}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View more button */}
        {filteredItems.length < GALLERY_ITEMS.length && limit < GALLERY_ITEMS.length && (
          <div className="mt-12 text-center">
            <a href="/gallery">
              <Button variant="outline" className="border-white/20 hover:bg-white/10">
                Voir tous les projets
              </Button>
            </a>
          </div>
        )}

        {/* Project modal */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
              onClick={closeProject}
            >
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative bg-gray-900 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* Image side */}
                  <div className="relative aspect-square md:aspect-auto md:h-full flex items-center justify-center bg-black overflow-hidden">
                    <Image
                      src={getCurrentImageUrl()}
                      alt={filteredItems[selectedProject].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'contain' }}
                      className="p-4"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = FALLBACK_IMAGE;
                      }}
                    />
                    
                    {/* Navigation controls */}
                    <button 
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                      onClick={prevImage}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button 
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                      onClick={nextImage}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 text-white text-sm">
                      {currentImageIndex + 1} / {filteredItems[selectedProject].additionalImages.length + 1}
                    </div>
                  </div>
                  
                  {/* Content side */}
                  <div className="p-6 md:p-8 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-[90vh]">
                    <button 
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                      onClick={closeProject}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    
                    <Typography variant="h3" className="mb-2">
                      {filteredItems[selectedProject].title}
                    </Typography>
                    
                    <div className="flex gap-4 mb-6">
                      <div className="px-3 py-1 rounded-full bg-gray-800 text-white text-sm">
                        {filteredItems[selectedProject].category}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-gray-800 text-white text-sm">
                        {filteredItems[selectedProject].subsidiary}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <Typography variant="body" color="muted" className="text-sm mb-1">CLIENT</Typography>
                        <Typography variant="body" className="font-medium">
                          {filteredItems[selectedProject].client}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="body" color="muted" className="text-sm mb-1">ANNÉE</Typography>
                        <Typography variant="body" className="font-medium">
                          {filteredItems[selectedProject].year}
                        </Typography>
                      </div>
                    </div>
                    
                    <Typography variant="body" color="muted" className="mb-8">
                      {filteredItems[selectedProject].description}
                    </Typography>
                    
                    {/* Thumbnails */}
                    <Typography variant="body" color="muted" className="text-sm mb-3">IMAGES DU PROJET</Typography>
                    <div className="grid grid-cols-4 gap-2">
                      <div 
                        className={`aspect-square relative overflow-hidden rounded cursor-pointer border-2 ${
                          currentImageIndex === 0 ? 'border-white' : 'border-transparent'
                        }`}
                        onClick={() => setCurrentImageIndex(0)}
                      >
                        <Image 
                          src={filteredItems[selectedProject].imageUrl} 
                          alt="Thumbnail" 
                          fill 
                          style={{ objectFit: 'cover' }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = FALLBACK_IMAGE;
                          }}
                        />
                      </div>
                      
                      {filteredItems[selectedProject].additionalImages.map((img, idx) => (
                        <div 
                          key={idx}
                          className={`aspect-square relative overflow-hidden rounded cursor-pointer border-2 ${
                            currentImageIndex === idx + 1 ? 'border-white' : 'border-transparent'
                          }`}
                          onClick={() => setCurrentImageIndex(idx + 1)}
                        >
                          <Image 
                            src={img} 
                            alt="Thumbnail" 
                            fill 
                            style={{ objectFit: 'cover' }}
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
