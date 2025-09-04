'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ModernNavbar } from '@/components/ui/navbar-demo';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { TruckIcon, CalendarCheckIcon, MapPinIcon, BarChart3Icon, ShieldCheckIcon, TimerIcon } from 'lucide-react';

// Get the subsidiary data
const subsidiaryData = {
  id: 'labrigad',
  name: 'LABRIG\'Ad',
  fullName: 'Excellence Logistique & Déploiement',
  description: 'Déploiement de projets avec une précision militaire et une flexibilité sans égale.',
  slogan: 'L\'EXCELLENCE OPÉRATIONNELLE EN ACTION',
  color: 'labrigad',
  heroImage: '/subsidiaries/labrigad-hero.jpg',
  
  services: [
    {
      title: 'Logistique Événementielle',
      description: 'Organisation et coordination logistique de vos événements avec une précision militaire.',
      icon: <CalendarCheckIcon className="w-10 h-10 text-labrigad" />,
      benefits: [
        'Planification stratégique complète',
        'Coordination des prestataires',
        'Gestion des imprévus en temps réel',
        'Rapports post-événement détaillés'
      ]
    },
    {
      title: 'Déploiement National',
      description: 'Solutions de déploiement sur l\'ensemble du territoire avec suivi en temps réel.',
      icon: <MapPinIcon className="w-10 h-10 text-labrigad" />,
      benefits: [
        'Couverture nationale complète',
        'Équipes locales dans chaque région',
        'Plateforme de suivi en temps réel',
        'Adaptation aux spécificités régionales'
      ]
    },
    {
      title: 'Logistique Internationale',
      description: 'Gestion des opérations transfrontalières avec expertise douanière et réglementaire.',
      icon: <TruckIcon className="w-10 h-10 text-labrigad" />,
      benefits: [
        'Expertise en formalités douanières',
        'Réseau de partenaires internationaux',
        'Solutions de transport multimodal',
        'Conformité réglementaire garantie'
      ]
    },
    {
      title: 'Gestion de Parc',
      description: 'Maintenance préventive et corrective de votre parc matériel et équipements.',
      icon: <BarChart3Icon className="w-10 h-10 text-labrigad" />,
      benefits: [
        'Inventaire digital complet',
        'Maintenance préventive programmée',
        'Interventions rapides sur site',
        'Optimisation de la durée de vie'
      ]
    }
  ],
  advantages: [
    {
      title: 'Précision Opérationnelle',
      description: 'Exécution méticuleuse de chaque projet avec des processus rigoureux et éprouvés.',
      icon: <ShieldCheckIcon className="w-8 h-8 text-labrigad" />
    },
    {
      title: 'Flexibilité Tactique',
      description: 'Adaptation rapide aux changements et aux imprévus grâce à des équipes réactives.',
      icon: <TimerIcon className="w-8 h-8 text-labrigad" />
    }
  ],
  caseStudy: {
    title: 'Tournée nationale L\'Oréal Professionnel',
    description: 'Déploiement et coordination logistique d\'une tournée de formation sur 12 villes marocaines.',
    image: '/subsidiaries/labrigad-case-study.jpg',
    stats: [
      { value: '12', label: 'Villes couvertes' },
      { value: '24', label: 'Jours de tournée' },
      { value: '500+', label: 'Professionnels formés' },
      { value: '100%', label: 'Taux de satisfaction' }
    ],
    testimonial: {
      quote: 'L\'équipe de LABRIG\'Ad a démontré un professionnalisme et une précision exceptionnels tout au long de notre tournée nationale. Leur capacité à anticiper les problèmes et à proposer des solutions a été déterminante dans notre succès.',
      author: 'Directeur Marketing, L\'Oréal Professionnel Maroc'
    }
  }
};

export default function LabrigadPage() {
  const { locale } = useParams();
  const [activeSection, setActiveSection] = useState('events');
  const heroRef = useRef(null);
  
  // Parallax effect pour les éléments graphiques
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Navigation principale adaptée à LABRIG'Ad
  const mainNavItems = [
    { id: 'events', label: 'Événements' },
    { id: 'deployment', label: 'Déploiement' },
    { id: 'logistics', label: 'Logistique' },
    { id: 'management', label: 'Gestion de Parc' }
  ];
  
  return (
    <div className="min-h-screen bg-black text-white" data-subsidiary="labrigad">
      <ModernNavbar currentFiliale="labrigad" />
      
      {/* Header avec animation subtile lors du défilement */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-labrigad/20">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center items-center h-16">
            {mainNavItems.map(item => (
              <button 
                key={item.id}
                className={`px-6 py-2 mx-1 text-sm uppercase tracking-wider transition-all duration-300 ${activeSection === item.id ? 'text-labrigad font-semibold border-b-2 border-labrigad' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      
      <main className="flex flex-col">
        {/* Hero Section avec éléments graphiques évoquant la précision et la logistique */}
        <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
          {/* Fond noir avec grille technique */}
          <div className="absolute inset-0 bg-[url('/patterns/grid-pattern.png')] bg-repeat opacity-10 z-0" />
          
          {/* Éléments graphiques de précision */}
          <motion.div 
            className="absolute -right-20 top-20 w-80 h-80 border-[1px] border-labrigad/30 rounded-full z-0"
            style={{ y: y1, opacity }}
          />
          <motion.div 
            className="absolute -left-40 bottom-20 w-96 h-96 border-[1px] border-labrigad/20 rounded-full z-0"
            style={{ y: y2, opacity }}
          />

          {/* Contenu principal Hero */}
          <div className="container px-4 mx-auto relative z-20">
            <div className="max-w-3xl">
              <motion.div 
                className="inline-block mb-3 px-3 py-1 border border-labrigad/40 bg-black/80 rounded-md"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm font-medium text-labrigad tracking-widest">
                  {subsidiaryData.fullName}
                </p>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {subsidiaryData.slogan}
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-10 text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {subsidiaryData.description}
              </motion.p>
              
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <Link href="/contact?service=labrigad">
                  <Button 
                    size="lg" 
                    className="bg-labrigad hover:bg-labrigad/90 text-black font-medium tracking-wider"
                  >
                    PLANIFIER VOTRE DÉPLOIEMENT
                  </Button>
                </Link>
                <Link href="#services">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-labrigad/40 text-labrigad hover:bg-labrigad/10"
                  >
                    Découvrir nos services
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Indicateurs visuels style militaire/logistique */}
          <motion.div 
            className="absolute -bottom-5 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <div className="flex gap-2 items-center px-4 py-2 bg-black/50 backdrop-blur-sm border border-labrigad/30 rounded-md">
              <div className="h-2 w-2 rounded-full bg-labrigad animate-pulse" />
              <span className="text-xs text-labrigad font-mono">EXCELLENCE OPÉRATIONNELLE</span>
              <div className="h-2 w-2 rounded-full bg-labrigad animate-pulse" />
            </div>
          </motion.div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-20 bg-gray-900">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Typography 
                variant="h2" 
                className="font-bold mb-6"
              >
                Nos Services
              </Typography>
              <Typography variant="body" color="muted" className="text-lg">
                LABRIG'Ad propose une gamme complète de services créatifs pour donner vie à votre vision.
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
        
        {/* Nos Avantages Section */}
        <section className="py-20 bg-black">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto mb-16 text-center">
              <Typography variant="h6" className="text-labrigad mb-2 uppercase tracking-widest">
                NOS VALEURS
              </Typography>
              <Typography variant="h2" className="font-bold mb-6">
                La Précision comme Standard
              </Typography>
              <Typography variant="body" color="muted" className="text-lg max-w-3xl mx-auto">
                Notre approche repose sur la précision militaire appliquée aux opérations logistiques et de déploiement pour garantir un résultat impeccable.
              </Typography>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {subsidiaryData.advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  className="flex gap-6 p-8 border border-labrigad/20 rounded-lg bg-gradient-to-br from-black to-gray-900"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="p-4 bg-black/70 border border-labrigad/30 rounded-lg h-fit">
                    {advantage.icon}
                  </div>
                  <div>
                    <Typography variant="h4" className="mb-3">
                      {advantage.title}
                    </Typography>
                    <Typography variant="body" color="muted">
                      {advantage.description}
                    </Typography>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Métrique de performance */}
            <motion.div 
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-900/50 rounded-lg border border-labrigad/20 p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <Typography variant="h2" className="font-bold text-labrigad mb-1">98%</Typography>
                <Typography variant="body" color="muted" className="text-sm">Taux de satisfaction client</Typography>
              </div>
              <div className="text-center">
                <Typography variant="h2" className="font-bold text-labrigad mb-1">24h</Typography>
                <Typography variant="body" color="muted" className="text-sm">Délai de réponse</Typography>
              </div>
              <div className="text-center">
                <Typography variant="h2" className="font-bold text-labrigad mb-1">200+</Typography>
                <Typography variant="body" color="muted" className="text-sm">Projets déployés</Typography>
              </div>
              <div className="text-center">
                <Typography variant="h2" className="font-bold text-labrigad mb-1">16</Typography>
                <Typography variant="body" color="muted" className="text-sm">Régions couvertes</Typography>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Services Section - Dynamique selon la navigation */}
        <section id="services" className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Typography 
                variant="h6" 
                className="text-labrigad mb-4 uppercase tracking-widest"
              >
                Expertise Opérationnelle
              </Typography>
              <Typography 
                variant="h2" 
                className="font-bold mb-8"
              >
                Solutions de Déploiement Sur Mesure
              </Typography>
              <Typography variant="body" color="muted" className="text-lg max-w-3xl mx-auto">
                LABRIG'Ad développe des solutions précises et efficaces pour répondre aux défis logistiques et de déploiement les plus complexes.
              </Typography>
            </div>
            
            {/* Affichage du service actif basé sur la navigation */}
            <AnimatePresence mode="wait">
              {subsidiaryData.services.filter((service, i) => {
                if (activeSection === 'events' && i === 0) return true;
                if (activeSection === 'deployment' && i === 1) return true;
                if (activeSection === 'logistics' && i === 2) return true;
                if (activeSection === 'management' && i === 3) return true;
                return false;
              }).map((service, index) => (
                <motion.div
                  key={activeSection}
                  className="bg-black/50 backdrop-blur-md border border-labrigad/20 rounded-2xl p-8 md:p-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 bg-labrigad/10 border border-labrigad/30 rounded-xl">
                          {service.icon}
                        </div>
                        <Typography variant="h3" className="font-bold">
                          {service.title}
                        </Typography>
                      </div>
                      
                      <Typography variant="body" className="text-lg mb-8">
                        {service.description}
                      </Typography>
                      
                      <Link href="/contact?service=labrigad">
                        <Button 
                          variant="outline"
                          className="border-labrigad/30 text-labrigad hover:bg-labrigad/10 flex gap-2 items-center"
                        >
                          Demander un devis
                          <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </Button>
                      </Link>
                    </div>
                    
                    <div className="lg:col-span-3">
                      <div className="bg-gradient-to-br from-black to-gray-900 border border-gray-800 rounded-xl p-6">
                        <Typography variant="h5" className="mb-6 text-labrigad">
                          Bénéfices
                        </Typography>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {service.benefits.map((benefit, i) => (
                            <motion.div 
                              key={i}
                              className="flex items-start gap-3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.1 }}
                            >
                              <div className="h-6 w-6 rounded-full border border-labrigad/40 flex items-center justify-center flex-shrink-0">
                                <div className="h-2 w-2 rounded-full bg-labrigad"></div>
                              </div>
                              <Typography variant="body">
                                {benefit}
                              </Typography>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
        
        {/* Étude de Cas Section */}
        <section className="py-24 bg-black">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <Typography 
                variant="h6" 
                className="text-labrigad mb-4 uppercase tracking-widest"
              >
                Étude de cas
              </Typography>
              <Typography 
                variant="h2" 
                className="font-bold mb-6"
              >
                {subsidiaryData.caseStudy.title}
              </Typography>
              <Typography variant="body" color="muted" className="text-lg max-w-3xl mx-auto">
                {subsidiaryData.caseStudy.description}
              </Typography>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 relative overflow-hidden rounded-2xl">
                <motion.div
                  className="bg-gray-900 border border-labrigad/20 rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="relative aspect-[16/9]">
                    <Image 
                      src={subsidiaryData.caseStudy.image} 
                      alt={subsidiaryData.caseStudy.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                    
                    {/* Stats sur l'image */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {subsidiaryData.caseStudy.stats.map((stat, i) => (
                          <motion.div 
                            key={i}
                            className="text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                          >
                            <Typography variant="h3" className="font-bold text-labrigad">
                              {stat.value}
                            </Typography>
                            <Typography variant="body" className="text-sm text-gray-300">
                              {stat.label}
                            </Typography>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                className="bg-black/50 border border-labrigad/20 rounded-2xl p-8 flex flex-col"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-labrigad mb-6 opacity-80">
                  <path d="M10.8964 3C9.32130 3 8.03906 4.28325 8.03906 5.85938V7.59375H11.7891V12.7031C11.7891 13.7128 10.9696 14.5312 9.96094 14.5312C8.95227 14.5312 8.13281 13.7128 8.13281 12.7031V11.4844H3.60156V12.7031C3.60156 16.1842 6.47879 19.0625 9.96094 19.0625C13.4431 19.0625 16.3203 16.1842 16.3203 12.7031V5.85938C16.3203 4.28325 15.0381 3 13.4629 3H10.8964Z" fill="currentColor"/>
                </svg>
                
                <Typography variant="body" className="mb-5 text-gray-300 italic">
                  {subsidiaryData.caseStudy.testimonial.quote}
                </Typography>
                
                <Typography variant="body" className="mt-auto text-labrigad font-medium">
                  {subsidiaryData.caseStudy.testimonial.author}
                </Typography>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section - Repensée pour LABRIG'Ad */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
              <div className="md:max-w-lg">
                <Typography variant="h6" className="text-labrigad mb-4 uppercase tracking-widest">
                  Prêts à déployer l'excellence ?
                </Typography>
                <Typography variant="h2" className="font-bold mb-6">
                  Contactez notre cellule opérationnelle
                </Typography>
                <Typography variant="body" color="muted" className="text-lg">
                  Notre équipe d'experts est prête à analyser vos besoins et à proposer des solutions logistiques et de déploiement adaptées à votre contexte.
                </Typography>
              </div>
              
              <div className="flex flex-col space-y-4 w-full md:w-auto">
                <Link href="/contact?service=labrigad">
                  <Button 
                    size="lg" 
                    className="bg-labrigad hover:bg-labrigad/90 text-black font-medium tracking-wider w-full md:w-auto"
                  >
                    PLANIFIER UN BRIEFING
                  </Button>
                </Link>
                
                <Link href="tel:+212522334455">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-labrigad/40 text-labrigad hover:bg-labrigad/10 w-full md:w-auto"
                  >
                    +212 522 33 44 55
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer variant="subsidiary" subsidiaryColor="labrigad" />
    </div>
  );
}
