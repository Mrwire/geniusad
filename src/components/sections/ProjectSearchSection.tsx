'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Projets de démonstration pour la recherche
const DEMO_PROJECTS = [
  {
    id: 'coca-cola',
    title: { fr: 'Coca Cola Events', en: 'Coca Cola Events' },
    category: { fr: 'Événementiel', en: 'Events' },
    client: 'Coca Cola',
    tags: ['branding', 'événementiel', 'digital'],
    subsidiary: 'LABRIG\'Ad'
  },
  {
    id: 'sprite',
    title: { fr: 'Sprite Campaign', en: 'Sprite Campaign' },
    category: { fr: 'Activation de marque', en: 'Brand Activation' },
    client: 'Sprite',
    tags: ['activation', 'marketing', 'street'],
    subsidiary: 'MPS'
  },
  {
    id: 'samsung',
    title: { fr: 'Samsung Galaxy', en: 'Samsung Galaxy' },
    category: { fr: 'Lancement de produit', en: 'Product Launch' },
    client: 'Samsung',
    tags: ['technologie', 'lancement', 'événementiel'],
    subsidiary: 'Mouje & Leell'
  },
  {
    id: 'nike',
    title: { fr: 'Nike Run Club', en: 'Nike Run Club' },
    category: { fr: 'Expérience digitale', en: 'Digital Experience' },
    client: 'Nike',
    tags: ['digital', 'sport', 'expérience'],
    subsidiary: 'Gamius'
  },
  {
    id: 'festival',
    title: { fr: 'Festival de Musique', en: 'Music Festival' },
    category: { fr: 'Événementiel', en: 'Events' },
    client: 'Maroc Festival',
    tags: ['culture', 'événementiel', 'scénographie'],
    subsidiary: 'LABRIG\'Ad'
  }
];

// Interface pour les propriétés du composant
interface ProjectSearchSectionProps {
  className?: string;
}

export const ProjectSearchSection: React.FC<ProjectSearchSectionProps> = ({
  className = '',
}) => {
  const locale = useLocale() as 'fr' | 'en';
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof DEMO_PROJECTS>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Extraire les catégories uniques lors du montage du composant
  useEffect(() => {
    const uniqueCategories = [...new Set(DEMO_PROJECTS.map(project => project.category[locale]))];
    setCategories(uniqueCategories);
  }, [locale]);

  // Effectuer la recherche lorsque la requête change
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(DEMO_PROJECTS);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = DEMO_PROJECTS.filter(project => {
      return (
        project.title[locale].toLowerCase().includes(query) ||
        project.category[locale].toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.tags.some(tag => tag.toLowerCase().includes(query)) ||
        project.subsidiary.toLowerCase().includes(query)
      );
    });

    setSearchResults(results);
  }, [searchQuery, locale]);

  // Animation du titre
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 70,
        damping: 15
      }
    }
  };

  // Animation du contenu
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 70
      }
    }
  };

  return (
    <section className={`py-16 px-4 md:px-8 bg-neutral-950 ${className}`}>
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {locale === 'fr' ? 'Recherche de Projets' : 'Project Search'}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {locale === 'fr' 
              ? 'Découvrez notre portfolio de projets avec notre outil de recherche avancé' 
              : 'Discover our project portfolio with our advanced search tool'}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div variants={itemVariants} className="relative">
            <div 
              className="flex items-center w-full border border-neutral-800 rounded-lg px-4 py-3 bg-neutral-900 hover:bg-neutral-800 transition-colors focus-within:ring-2 focus-within:ring-blue-500 cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <Search className="w-5 h-5 mr-2 text-neutral-400" />
              <span className="text-neutral-400">
                {locale === 'fr' 
                  ? 'Rechercher un projet par nom, catégorie, client...' 
                  : 'Search projects by name, category, client...'}
              </span>
            </div>

            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-600 bg-neutral-800 px-1.5 font-mono text-[10px] font-medium text-neutral-400">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </motion.div>
        </motion.div>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput 
              placeholder={locale === 'fr' ? "Rechercher..." : "Search..."}
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>
                {locale === 'fr' 
                  ? 'Aucun résultat trouvé.' 
                  : 'No results found.'}
              </CommandEmpty>
              
              {/* Grouper par catégorie */}
              {categories.map((category) => {
                const categoryProjects = searchResults.filter(
                  project => project.category[locale] === category
                );
                
                if (categoryProjects.length === 0) return null;
                
                return (
                  <CommandGroup key={category} heading={category}>
                    {categoryProjects.map((project) => (
                      <CommandItem 
                        key={project.id}
                        className="flex items-center justify-between"
                        onSelect={() => {
                          // Simuler une navigation vers la page de détail du projet
                          console.log(`Navigating to project: ${project.id}`);
                          setOpen(false);
                        }}
                      >
                        <div>
                          <span className="font-medium">{project.title[locale]}</span>
                          <span className="ml-2 text-sm text-neutral-400">
                            {project.client}
                          </span>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-neutral-800 text-neutral-300">
                          {project.subsidiary}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
              
              <CommandSeparator />
              
              <CommandGroup heading={locale === 'fr' ? "Actions" : "Actions"}>
                <CommandItem 
                  onSelect={() => {
                    console.log('View all projects');
                    setOpen(false);
                  }}
                >
                  <span>{locale === 'fr' ? 'Voir tous les projets' : 'View all projects'}</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 text-center"
        >
          <motion.p 
            variants={itemVariants}
            className="text-sm text-gray-400 mb-6"
          >
            {locale === 'fr' 
              ? 'Explorez notre portfolio par filiale' 
              : 'Explore our portfolio by subsidiary'}
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3"
          >
            <Button 
              variant="outline" 
              className="border-blue-600 text-blue-500 hover:bg-blue-900/20"
            >
              MPS
            </Button>
            <Button 
              variant="outline" 
              className="border-red-600 text-red-500 hover:bg-red-900/20"
            >
              LABRIG'Ad
            </Button>
            <Button 
              variant="outline" 
              className="border-purple-600 text-purple-500 hover:bg-purple-900/20"
            >
              Gamius
            </Button>
            <Button 
              variant="outline" 
              className="border-green-600 text-green-500 hover:bg-green-900/20"
            >
              Mouje & Leell
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectSearchSection;
