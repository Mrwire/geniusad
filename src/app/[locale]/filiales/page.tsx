'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ModernNavbar } from '@/components/ui/navbar-demo';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/button';
import { motion, Variants } from 'framer-motion';

const subsidiaries = [
  {
    id: 'mps',
    name: 'MPS',
    description: 'Marketing & Promotion Solutions focused on events, exhibitions, and activations.',
    color: 'mps',
    image: '/subsidiaries/mps-cover.jpg',
  },
  {
    id: 'labrigad',
    name: 'LABRIG\'Ad',
    description: 'Creative agency specialized in 360° campaigns, branding, and advertising.',
    color: 'labrigad',
    image: '/subsidiaries/labrigad-cover.jpg',
  },
  {
    id: 'gamius',
    name: 'Gamius',
    description: 'E-sport division dedicated to gaming events, tournaments, and content creation.',
    color: 'gamius',
    image: '/subsidiaries/gamius-cover.jpg',
  },
  {
    id: 'moujeleell',
    name: 'Mouje & Leell',
    description: 'Digital solutions provider with focus on web, mobile, and social media strategies.',
    color: 'moujeleell',
    image: '/subsidiaries/moujeleell-cover.jpg',
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

export default function FilialePage() {
  const params = useParams();
  const locale = params && typeof params === 'object' && 'locale' in params ? params.locale as string : 'fr';
  
  return (
    <div className="min-h-screen bg-black text-white" data-theme="genius">
      <ModernNavbar />
      
      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="pt-40 pb-20 md:py-40">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              >
                Nos Filiales
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-400 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                Découvrez nos entités spécialisées, chacune offrant des solutions dans leur domaine d'expertise, tout en partageant la même vision d'excellence.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Subsidiaries Grid */}
        <section className="py-20 bg-gray-900">
          <div className="container px-4 mx-auto">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {subsidiaries.map((subsidiary) => (
                <motion.div 
                  key={subsidiary.id}
                  className="relative bg-black border border-gray-800 rounded-lg overflow-hidden group"
                  variants={itemVariants}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"
                    style={{ opacity: 0.7 }}
                  />
                  
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ 
                      backgroundImage: `url(${subsidiary.image})`,
                      opacity: 0.5,
                    }}
                  />
                  
                  <div className="relative z-20 p-8 flex flex-col h-full min-h-[400px]">
                    <div>
                      <Typography 
                        variant="h3" 
                        className={`mb-4 font-bold text-${subsidiary.color}`}
                      >
                        {subsidiary.name}
                      </Typography>
                      <Typography variant="body" color="muted" className="mb-6">
                        {subsidiary.description}
                      </Typography>
                    </div>
                    
                    <div className="mt-auto">
                      <Link href={`/filiales/${subsidiary.id}`}>
                        <Button 
                          variant="secondary" 
                          className={`group-hover:bg-${subsidiary.color} group-hover:text-white transition-colors duration-300`}
                        >
                          Découvrir
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
