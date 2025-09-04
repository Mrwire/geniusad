'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, ArrowUpRight, Plus, X, ChevronRight, ChevronLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

// Animation variants pour un style Apple fluide et élégant (spring animation)  
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 260, 
      damping: 20,
      mass: 0.9,
      duration: 0.7 
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { 
      y: { type: "spring", stiffness: 400, damping: 25 },
      scale: { duration: 0.2, ease: "easeOut" }
    }
  }
};

// Variantes pour le Dialog
const dialogVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.15, ease: "easeOut" } }
};

type ProjectImage = {
  src: string;
  alt: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  logo: string;
  category: string;
  gallery: ProjectImage[];
  details: string;
  client: string;
  year: string;
};

const featuredProjects: Project[] = [
  {
    id: 'cocacola',
    title: 'Coca-Cola',
    description: 'Campagne de marketing expérientiel pour la nouvelle gamme de boissons',
    image: '/item_images/projet/cocacola_stand.JPG',
    logo: '/item_images/projet/coca-cola-logo-png-900x600.png',
    category: 'Événementiel',
    gallery: [
      { src: '/item_images/projet/cocacola_stand.JPG', alt: 'Stand Coca-Cola' },
      { src: '/item_images/projet/cocacola_stand2.JPG', alt: 'Expérience Coca-Cola' },
      { src: '/item_images/projet/cocacola_stand3.JPG', alt: 'Présentation Coca-Cola' },
      { src: '/item_images/projet/cocacola_stand4.JPG', alt: 'Activation Coca-Cola' },
    ],
    details: 'Une campagne immersive qui a permis aux consommateurs de découvrir les nouvelles saveurs de la marque à travers une expérience sensorielle unique. Installation d\'un stand interactif dans plusieurs centres commerciaux pour maximiser l\'engagement.',
    client: 'The Coca-Cola Company',
    year: '2024'
  },
  {
    id: 'samsung',
    title: 'Samsung',
    description: 'Lancement de produit avec expérience immersive en réalité augmentée',
    image: '/item_images/projet/sam3.JPG',
    logo: '/item_images/projet/logo_samsung_fond_noir.jpg',
    category: 'Digital',
    gallery: [
      { src: '/item_images/projet/sam3.JPG', alt: 'Stand Samsung' },
      { src: '/item_images/projet/sam1.JPG', alt: 'Démonstration Samsung' },
      { src: '/item_images/projet/sam2.JPG', alt: 'Présentation Samsung' },
      { src: '/item_images/projet/sam4.JPG', alt: 'Expérience Samsung' },
    ],
    details: 'Une expérience de réalité augmentée conçue pour le lancement de la nouvelle gamme de smartphones. Les visiteurs pouvaient interagir avec les produits virtuellement et découvrir leurs fonctionnalités à travers une expérience immersive.',
    client: 'Samsung Electronics',
    year: '2024'
  },
  {
    id: 'loreal',
    title: 'L\'Oréal',
    description: 'Expérience de marque interactive pour le lancement de la collection printemps',
    image: '/item_images/projet/loreal2.jpg',
    logo: '/item_images/projet/Logo-LOréal-symbole-500x281.jpg',
    category: 'Beauté',
    gallery: [
      { src: '/item_images/projet/loreal2.jpg', alt: 'Espace L\'Oréal' },
      { src: '/item_images/projet/loreal3.jpg', alt: 'Présentation L\'Oréal' },
      { src: '/item_images/projet/loreal4.jpg', alt: 'Stand L\'Oréal' },
      { src: '/item_images/projet/lopreal4.jpg', alt: 'Démonstration L\'Oréal' },
    ],
    details: 'Une expérience de marque immersive pour le lancement de la collection printemps. Installation d\'un espace éphémère permettant aux visiteurs de tester les produits et de bénéficier de conseils personnalisés de la part d\'experts beauté.',
    client: 'L\'Oréal Paris',
    year: '2023'
  },
  {
    id: 'nissan',
    title: 'Nissan',
    description: 'Démonstration et essai des nouveaux modèles électriques',
    image: '/item_images/projet/nissan_stand.JPG',
    logo: '/item_images/projet/nissan-logo-4-2.png',
    category: 'Automobile',
    gallery: [
      { src: '/item_images/projet/nissan_stand.JPG', alt: 'Stand Nissan' },
      { src: '/item_images/projet/nissan.JPG', alt: 'Véhicule Nissan' },
      { src: '/item_images/projet/nissan (2).jpg', alt: 'Showroom Nissan' },
      { src: '/item_images/projet/nissan_showrom_stand.jpg', alt: 'Présentation Nissan' },
    ],
    details: 'Un événement exclusif pour la présentation des nouveaux modèles électriques de Nissan. Les visiteurs ont pu essayer les véhicules sur un circuit spécialement aménagé et découvrir les innovations technologiques de la marque en matière de mobilité durable.',
    client: 'Nissan Motor Corporation',
    year: '2023'
  }
];

// Composant pour afficher la galerie d'images dans le popup avec animations simples
const ProjectGallery = ({ images }: { images: ProjectImage[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <div className="relative rounded-2xl overflow-hidden aspect-video mb-8 bg-black/30">
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image 
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {images.length > 1 && (
        <>
          <motion.button 
            onClick={prevImage}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2.5 rounded-full transition-all z-10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Image précédente"
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button 
            onClick={nextImage}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white p-2.5 rounded-full transition-all z-10 focus:outline-none focus:ring-2 focus:ring-white/30"
            aria-label="Image suivante"
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>
          
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2.5 z-10">
            {images.map((_, index) => (
              <motion.button 
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                animate={index === currentImageIndex ? 
                  { scale: 1.2, backgroundColor: "rgba(255,255,255,1)" } : 
                  { scale: 1, backgroundColor: "rgba(255,255,255,0.4)" }
                }
                transition={{ duration: 0.2 }}
                className="w-2 h-2 rounded-full focus:outline-none"
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Légende de l'image */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent pt-8 pb-4 px-6 transform translate-y-full hover:translate-y-0 transition-transform duration-300">
        <p className="text-white/90 text-sm font-medium tracking-wide">
          {images[currentImageIndex].alt}
        </p>
      </div>
    </div>
  );
};

const FeaturedProjects = () => {
  // État pour contrôler quel projet est affiché dans le popup
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <div className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Fond subtil avec un motif diagonal très léger */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03),transparent_70%)] z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-6">
            <span className="block md:inline opacity-70 mr-2">—</span>
            <span>Projets remarquables</span>
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-base md:text-lg font-light tracking-wide leading-relaxed">
            Des expériences qui redéfinissent ce qui est possible, conçues avec précision pour chaque marque.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div className="h-full" whileHover="hover">
                <Card className="h-full bg-transparent border-0 shadow-none overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-6 group-hover:shadow-[0_20px_30px_-10px_rgba(0,0,0,0.3)] transition-all duration-500">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-all duration-1000 ease-out"
                      style={{
                        filter: "grayscale(0.9)",
                      }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 transition-opacity duration-700" 
                      variants={{
                        hover: { opacity: 0.3 }
                      }}
                    />
                    
                    {/* Overlay au hover qui révèle l'image en couleur */}
                    <motion.div 
                      className="absolute inset-0 bg-transparent opacity-0"
                      variants={{
                        hover: { 
                          opacity: 1,
                          transition: { duration: 0.5 }
                        }
                      }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    </motion.div>
                    
                    {/* Logo en bas à gauche avec position absolue */}
                    <div className="absolute bottom-4 left-4 flex items-center space-x-3 z-10">
                      <motion.div 
                        className="bg-white/10 backdrop-blur-md p-1.5 rounded-full"
                        variants={{
                          hover: { 
                            scale: 1.1, 
                            backgroundColor: "rgba(255,255,255,0.2)",
                            transition: { duration: 0.2 }
                          }
                        }}
                      >
                        <Image 
                          src={project.logo} 
                          alt={`${project.title} logo`} 
                          width={20} 
                          height={20}
                          className="object-contain h-5 w-5"
                        />
                      </motion.div>
                      <motion.span 
                        className="text-xs font-medium text-white/90 tracking-wide"
                        variants={{
                          hover: { 
                            y: -1,
                            transition: { delay: 0.05, duration: 0.2 }
                          }
                        }}
                      >
                        {project.category}
                      </motion.span>
                    </div>
                    
                    {/* Bouton view qui apparaît au hover */}
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center opacity-0 z-10"
                      variants={{
                        hover: { 
                          opacity: 1,
                          transition: { delay: 0.1, duration: 0.2 }
                        }
                      }}
                    >
                      <motion.button 
                        onClick={() => setSelectedProject(project)}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Plus className="h-5 w-5 text-white" />
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  <div className="px-1">
                    <motion.h3 
                      className="text-lg font-medium text-white transition-colors mb-2"
                      variants={{
                        hover: { 
                          color: "rgba(255,255,255,1)",
                          y: -1,
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p 
                      className="text-neutral-400 text-sm font-light leading-relaxed mb-4"
                      variants={{
                        hover: { 
                          color: "rgba(180,180,180,1)",
                          transition: { delay: 0.05, duration: 0.2 }
                        }
                      }}
                    >
                      {project.description}
                    </motion.p>
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      className="text-white inline-flex items-center text-sm font-medium"
                      variants={{
                        hover: { 
                          x: 2,
                          transition: { delay: 0.1, duration: 0.3 }
                        }
                      }}
                    >
                      <span className="border-b border-white/30 hover:border-white transition-colors duration-300">Découvrir</span>
                      <motion.div
                        variants={{
                          hover: { 
                            x: 3,
                            transition: { delay: 0.15, duration: 0.3 }
                          }
                        }}
                      >
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </motion.div>
                    </motion.button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/30 transition-all group rounded-full px-8"
          >
            <Link href="/projets" className="inline-flex items-center">
              <Plus className="mr-2 h-4 w-4 opacity-70" />
              <span className="font-normal">Tous nos projets</span>
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Dialog pour afficher les détails du projet */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="sm:max-w-5xl max-h-[95vh] bg-[#0a0a0a] border border-white/10 text-white p-0 overflow-hidden shadow-2xl">
            <DialogHeader className="pt-10 px-8">
              <div className="flex items-center space-x-4 mb-2">
                <div className="bg-white/10 backdrop-blur-md p-2 rounded-full">
                  <Image 
                    src={selectedProject.logo} 
                    alt={`${selectedProject.title} logo`} 
                    width={28} 
                    height={28}
                    className="object-contain h-7 w-7"
                  />
                </div>
                <div>
                  <DialogTitle className="text-2xl md:text-3xl font-medium tracking-tight">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-neutral-400 font-light tracking-wider mt-1">
                    {selectedProject.category}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="px-8 py-6 space-y-8 overflow-y-auto max-h-[calc(95vh-180px)] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {/* Galerie */}
              <div>
                <ProjectGallery images={selectedProject.gallery} />
              </div>
              
              {/* Détails */}
              <div className="prose prose-invert max-w-none">
                <p className="text-neutral-300 leading-relaxed text-base md:text-lg font-light tracking-wide">
                  {selectedProject.details}
                </p>
              </div>
              
              {/* Informations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-white/10">
                <div>
                  <p className="text-neutral-400 text-sm mb-2 uppercase tracking-wider font-light">Client</p>
                  <p className="text-white font-medium text-lg">{selectedProject.client}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm mb-2 uppercase tracking-wider font-light">Année</p>
                  <p className="text-white font-medium text-lg">{selectedProject.year}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FeaturedProjects;
