'use client';

import React from 'react';
import { Typography, Button, Card } from '@/components/atoms/shadcn-adapters';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Preview component showing how the homepage could look with Shadcn UI components
 */
export default function HomeShadcnPreview() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background color with gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background"></div>
        
        {/* Animated G logo would be implemented with WebGL */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <div className="w-[600px] h-[600px] rounded-full border-[40px] border-primary animate-pulse"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <Typography variant="h1" className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 animate-in">
            Genius <span className="text-primary">Ad</span> District
          </Typography>
          <Typography variant="lead" className="mb-8 max-w-2xl mx-auto">
            Votre partenaire créatif pour des solutions de communication innovantes et impactantes
          </Typography>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="primary" size="large">
              Découvrir nos services
            </Button>
            <Button variant="outline" size="large">
              Nos réalisations
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-20 bg-muted">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <Typography variant="h2" className="mb-4">
              Nos Expertises
            </Typography>
            <Typography variant="lead" className="max-w-2xl mx-auto">
              Découvrez notre gamme complète de services créatifs et stratégiques
            </Typography>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Branding',
                icon: '🎨',
                description: 'Créez une identité de marque distinctive et mémorable'
              },
              {
                title: 'Digital & Web',
                icon: '💻',
                description: 'Solutions numériques innovantes et expériences web immersives'
              },
              {
                title: 'Événementiel',
                icon: '🎭',
                description: 'Organisation d\'événements marquants et impactants'
              },
              {
                title: 'Production & Impression',
                icon: '🖨️',
                description: 'Services d\'impression de haute qualité pour tous vos besoins'
              },
              {
                title: 'Marketing & Stratégie',
                icon: '📊',
                description: 'Stratégies marketing efficaces pour atteindre vos objectifs'
              },
              {
                title: 'Design d\'Espace',
                icon: '🏢',
                description: 'Conception d\'espaces qui racontent votre histoire'
              }
            ].map((service, index) => (
              <Card
                key={index}
                variant={index % 2 === 0 ? 'default' : 'elevated'}
                className="group hover:shadow-lg transition-all duration-300"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <Typography variant="h3" className="mb-2">
                    {service.title}
                  </Typography>
                  <Typography variant="body">
                    {service.description}
                  </Typography>
                  <div className="mt-4 pt-4 border-t">
                    <Link href="#" className="text-primary font-medium hover:underline inline-flex items-center">
                      En savoir plus
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Filiales Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <Typography variant="h2" className="mb-4">
              Nos Filiales
            </Typography>
            <Typography variant="lead" className="max-w-2xl mx-auto">
              Découvrez notre écosystème de marques spécialisées
            </Typography>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'MPS',
                color: '#3B82F6',
                description: 'Production & Fabrication',
                logo: '/item_images/logo/MPS.png'
              },
              {
                name: 'LABRIG\'AD',
                color: '#EC4899',
                description: 'Activation & Événementiel',
                logo: '/item_images/logo/labrigad-min.png'
              },
              {
                name: 'GAMIUS',
                color: '#10B981',
                description: 'E-Sport & Gaming',
                logo: '/item_images/logo/gamiusgroup.png'
              },
              {
                name: 'MOUJE-LEELL',
                color: '#6366F1',
                description: 'Design & Mobilier',
                logo: '/item_images/logo/genius-logo.png' // Placeholder, replace with actual logo
              }
            ].map((filiale, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor: `${filiale.color}10` }}
              >
                <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: filiale.color }}></div>
                <div className="p-6">
                  <div className="h-16 flex items-center mb-4">
                    <div className="relative w-full h-10">
                      <Image
                        src={filiale.logo}
                        alt={filiale.name}
                        fill
                        style={{ objectFit: 'contain', objectPosition: 'left' }}
                      />
                    </div>
                  </div>
                  <Typography variant="h3" className="mb-2">
                    {filiale.name}
                  </Typography>
                  <Typography variant="body" className="mb-4">
                    {filiale.description}
                  </Typography>
                  <Button
                    variant="outline"
                    className="mt-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Visiter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Studies Preview */}
      <section className="py-20 bg-secondary/5">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16">
            <div>
              <Typography variant="h2" className="mb-4">
                Nos Réalisations
              </Typography>
              <Typography variant="lead">
                Découvrez nos projets récents et les résultats obtenus
              </Typography>
            </div>
            <Button variant="secondary" className="mt-4 md:mt-0">
              Toutes nos réalisations
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Campagne Nissan',
                category: 'Événementiel',
                image: '/item_images/image/element/element/event-placeholder.jpg'
              },
              {
                title: 'Refonte Orange Business',
                category: 'Digital & Branding',
                image: '/item_images/image/element/element/digital-placeholder.jpg'
              },
              {
                title: 'Showroom Interactif',
                category: 'Design d\'Espace',
                image: '/item_images/image/element/element/design-placeholder.jpg'
              }
            ].map((project, index) => (
              <Card
                key={index}
                variant="default"
                className="group overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="inline-block px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full mb-2">
                      {project.category}
                    </span>
                    <Typography variant="h4" className="text-white">
                      {project.title}
                    </Typography>
                  </div>
                  <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-105">
                    {/* Placeholder image - in a real implementation, you'd use actual case study images */}
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">Image du projet</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 mx-auto text-center">
          <Typography variant="h2" className="mb-6 text-primary-foreground">
            Prêt à concrétiser votre prochain projet ?
          </Typography>
          <Typography variant="lead" className="mb-8 max-w-2xl mx-auto text-primary-foreground/80">
            Contactez-nous dès aujourd'hui pour discuter de vos idées et besoins
          </Typography>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="secondary" size="large">
              Demander un devis
            </Button>
            <Button
              variant="outline"
              size="large"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 