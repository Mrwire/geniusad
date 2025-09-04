'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ModernNavbar } from '@/components/ui/navbar-demo';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Get the subsidiary data from the filiales/genius.md file
const subsidiaryData = {
  id: 'mps',
  name: 'MPS',
  fullName: 'Marketing & Promotion Solutions',
  description: 'Services événementiels, stands, expositions et activations BTL.',
  color: 'mps',
  heroImage: '/subsidiaries/mps-hero.jpg',
  services: [
    {
      title: 'Stand Design & Fabrication',
      description: 'Conception et fabrication de stands personnalisés pour salons et expositions.',
      icon: '🏗️'
    },
    {
      title: 'Event Management',
      description: 'Organisation et gestion complète d\'événements professionnels et grand public.',
      icon: '🎪'
    },
    {
      title: 'Brand Activation',
      description: 'Activations de marque BTL pour créer des expériences mémorables avec votre audience.',
      icon: '🎯'
    },
    {
      title: 'Roadshows',
      description: 'Conception et exécution de roadshows à travers le Maroc et la région MEA.',
      icon: '🚐'
    }
  ],
  projects: [
    {
      title: 'Salon Auto Expo',
      description: 'Stand pour constructeur automobile de prestige.',
      image: '/subsidiaries/mps-project1.jpg'
    },
    {
      title: 'Festival Jazzablanca',
      description: 'Espace VIP et activation pour sponsor principal.',
      image: '/subsidiaries/mps-project2.jpg'
    },
    {
      title: 'Roadshow Technologique',
      description: 'Tournée nationale pour présentation de nouveaux produits.',
      image: '/subsidiaries/mps-project3.jpg'
    }
  ]
};

export default function MPSPage() {
  const { locale } = useParams();
  
  return (
    <div className="min-h-screen bg-white" data-theme="mps">
      <ModernNavbar currentFiliale="mps" />
      
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ 
              backgroundImage: `url(${subsidiaryData.heroImage})`,
              opacity: 0.3,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
          
          <div className="container px-4 mx-auto relative z-20">
            <div className="max-w-2xl">
              <motion.p 
                className="text-lg mb-3 text-mps"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {subsidiaryData.fullName}
              </motion.p>
              <motion.h1 
                className="text-6xl md:text-8xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {subsidiaryData.name}
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-10 text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {subsidiaryData.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link href="/contact?service=mps">
                  <Button 
                    size="lg" 
                    className="bg-mps hover:bg-mps-dark text-white"
                  >
                    Contactez-nous
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-20 bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Typography 
                variant="h2" 
                className="font-bold mb-6"
              >
                Nos Services
              </Typography>
              <Typography variant="body" color="muted" className="text-lg">
                MPS propose une gamme complète de services événementiels pour créer des expériences mémorables.
              </Typography>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {subsidiaryData.services.map((service, index) => (
                <motion.div 
                  key={index}
                  className="bg-black p-8 rounded-lg border border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <Typography variant="h4" className="mb-3">
                    {service.title}
                  </Typography>
                  <Typography variant="body" color="muted">
                    {service.description}
                  </Typography>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Projects Section */}
        <section className="py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Typography 
                variant="h2" 
                className="font-bold mb-6"
              >
                Projets Récents
              </Typography>
              <Typography variant="body" color="muted" className="text-lg">
                Découvrez nos réalisations récentes et comment nous avons aidé nos clients à atteindre leurs objectifs.
              </Typography>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {subsidiaryData.projects.map((project, index) => (
                <motion.div 
                  key={index}
                  className="group relative overflow-hidden rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div 
                    className="aspect-[4/3] bg-cover bg-center" 
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <Typography variant="h5" className="mb-2">
                      {project.title}
                    </Typography>
                    <Typography variant="body" color="muted">
                      {project.description}
                    </Typography>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-mps bg-opacity-10">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <Typography variant="h2" className="font-bold mb-6">
                Prêt à Collaborer?
              </Typography>
              <Typography variant="body" color="muted" className="text-lg mb-8">
                Contactez-nous pour discuter de votre prochain projet événementiel et découvrir comment MPS peut vous aider à créer une expérience mémorable.
              </Typography>
              <Link href="/contact?service=mps">
                <Button 
                  size="lg" 
                  className="bg-mps hover:bg-mps-dark text-white"
                >
                  Demander un Devis
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer variant="subsidiary" subsidiaryColor="mps" />
    </div>
  );
}
