'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import SubsidiaryHeader from '@/components/organisms/SubsidiaryHeader';
import { Footer } from '@/components/organisms/Footer';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Import du composant FloatingFurniture avec dynamic pour éviter les erreurs SSR
const FloatingFurniture = dynamic(
  () => import('@/components/moujeleell/FloatingFurniture'),
  { ssr: false }
);

// Get the subsidiary data
const subsidiaryData = {
  id: 'moujeleell',
  name: 'Mouje & Leell',
  fullName: 'Mobilier de Luxe & Solutions Architecturales',
  description: 'Mobilier sur mesure et solutions de design innovantes pour architectes et professionnels.',
  color: 'moujeleell',
  heroImage: '/subsidiaries/moujeleell-hero.jpg',
  services: [
    {
      title: 'Mobilier Sur Mesure',
      description: 'Création de mobilier personnalisé selon vos spécifications et besoins uniques.',
      icon: '🪑'
    },
    {
      title: 'Solutions pour Architectes',
      description: 'Outils de conception et visualisation 3D pour vos projets architecturaux.',
      icon: '🏗️'
    },
    {
      title: 'Design d\'Intérieur',
      description: 'Services de conseil en design d\'intérieur pour espaces résidentiels et commerciaux.',
      icon: '🎨'
    },
    {
      title: 'Matériaux Durables',
      description: 'Sélection de matériaux éco-responsables pour un design durable et respectueux de l\'environnement.',
      icon: '🌱'
    }
  ],
  projects: [
    {
      title: 'Collection Hôtellerie',
      description: 'Mobilier sur mesure pour un complexe hôtelier 5 étoiles à Marrakech.',
      image: '/subsidiaries/moujeleell-project1.jpg'
    },
    {
      title: 'Bureaux Corporatifs',
      description: 'Aménagement complet des espaces de travail pour siège social multinational.',
      image: '/subsidiaries/moujeleell-project2.jpg'
    },
    {
      title: 'Résidence Privée',
      description: 'Conception et réalisation de mobilier exclusif pour villa de luxe.',
      image: '/subsidiaries/moujeleell-project3.jpg'
    }
  ],
  materials: [
    'Bois Massif', 'Marbre', 'Métal', 'Verre Trempé',
    'Cuir', 'Textiles Haut de Gamme', 'Matériaux Recyclés', 'Finitions Écologiques'
  ],
  softwareFeatures: [
    'Modélisation 3D', 'Visualisation en Réalité Augmentée', 'Personnalisation en Temps Réel',
    'Simulation de Matériaux', 'Devis Automatisés', 'Collaboration Multi-utilisateurs'
  ]
};

export default function MoujeleellPage() {
  const { locale } = useParams();
  
  return (
    <div className="min-h-screen bg-black text-white" data-subsidiary="moujeleell">
      <SubsidiaryHeader subsidiarySlug="moujeleell" transparent={true} />
      
      <main className="flex flex-col">
        {/* Hero Section - Style inspiré d'Apple avec meubles flottants */}
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#F5F5F7]">
          {/* Fond minimaliste style Apple */}
          <div className="absolute inset-0 bg-gradient-to-b from-white to-[#F5F5F7] z-0" />
          
          {/* Bannière "Bientôt disponible" style Apple */}
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute top-32 w-full text-center z-10"
          >
            <div className="inline-block bg-black text-white text-sm font-medium px-4 py-1 rounded-full">
              BIENTÔT DISPONIBLE
            </div>
          </motion.div>
          
          <div className="container px-4 mx-auto relative z-20 flex flex-col items-center">
            {/* Logo principal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-6 relative w-64 h-24"
            >
              <Image
                src="/item_images/logo_filiale_rectangulaire/logo_mooj&leel.png"
                alt="Mouje & Leell"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </motion.div>
            
            {/* Titre principal - Style Steve Jobs */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-black text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              L'ESPACE COMME LANGAGE,<br/>LE DESIGN COMME SIGNATURE
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-black/80 mb-8 max-w-2xl mx-auto text-center font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Une nouvelle façon de concevoir votre espace avec nos outils architecturaux 3D.
            </motion.p>
            
            {/* Meubles flottants intégrés dans la hero section */}
            <motion.div 
              className="w-full h-[500px] relative my-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <FloatingFurniture />
            </motion.div>
            
            {/* Boutons d'action */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Link href="/contact?service=moujeleell">
                <Button 
                  className="bg-black hover:bg-black/90 text-white w-full sm:w-auto px-8 rounded-full"
                  size="lg"
                >
                  Explorer l'outil 3D
                </Button>
              </Link>
              
              <Link href="/contact?notify=moujeleell">
                <Button 
                  variant="outline"
                  className="border-black/30 text-black hover:bg-black/5 w-full sm:w-auto px-8 rounded-full"
                  size="lg"
                >
                  Être notifié au lancement
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <span className="text-black/50 text-sm mb-2">Découvrir</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="black" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 12L12 19L5 12" stroke="black" strokeOpacity="0.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </section>
        
        {/* Outil 3D pour Architectes - Style Apple */}
        <section className="py-24 bg-white text-black">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto">
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="md:w-1/2">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    Outil d'Architecture 3D<br/><span className="text-black/50">Transformez votre vision</span>
                  </h2>
                  <p className="text-lg md:text-xl text-black/70 mb-8">
                    Notre plateforme révolutionnaire permet aux architectes et designers de visualiser leurs projets en temps réel avec une précision inégalée. Concevez, modifiez et présentez vos créations en quelques clics.
                  </p>
                  <div className="inline-block px-3 py-1 bg-black/5 text-black/60 rounded-md mb-8 text-sm">
                    Bientôt disponible
                  </div>
                  <div>
                    <Button 
                      className="bg-black hover:bg-black/90 text-white px-8 rounded-full"
                      size="lg"
                    >
                      Rejoindre la liste d'attente
                    </Button>
                  </div>
                </div>
                <div className="md:w-1/2 relative h-80 md:h-96 w-full overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                    <Image 
                      src="/subsidiaries/3d-tool-preview.jpg" 
                      alt="Outil 3D Architecture" 
                      fill
                      style={{objectFit: 'cover', opacity: 0.9}}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="1.5"/>
                          <path d="M9.5 8.96533C9.5 8.48805 9.5 8.24941 9.59974 8.11618C9.68666 8.00007 9.81971 7.92744 9.96438 7.9171C10.1304 7.90525 10.3311 8.03429 10.7326 8.29238L15.4532 11.3271C15.8016 11.551 15.9758 11.663 16.0359 11.8054C16.0885 11.9298 16.0885 12.0702 16.0359 12.1946C15.9758 12.337 15.8016 12.449 15.4532 12.6729L10.7326 15.7076C10.3311 15.9657 10.1304 16.0948 9.96438 16.0829C9.81971 16.0726 9.68666 15.9999 9.59974 15.8838C9.5 15.7506 9.5 15.512 9.5 15.0347V8.96533Z" stroke="black" strokeWidth="1.5"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Matériaux et Technologies - Style Apple */}
        <section className="py-24 bg-[#F5F5F7] text-black">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-20">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                Matériaux d'exception.<br/>
                <span className="text-black/50">Design intemporel.</span>
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl text-black/70 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Chaque pièce est conçue à partir de matériaux soigneusement sélectionnés pour leur qualité exceptionnelle et leur durabilité.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-3xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-6">Matériaux Premium</h3>
                <div className="flex flex-wrap gap-2">
                  {subsidiaryData.materials.map((material: string, index: number) => (
                    <span 
                      key={index}
                      className="text-sm bg-black/5 text-black/70 px-3 py-1 rounded-full"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-3xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold mb-6">Technologies Avancées</h3>
                <div className="flex flex-wrap gap-2">
                  {subsidiaryData.softwareFeatures.map((feature: string, index: number) => (
                    <span 
                      key={index}
                      className="text-sm bg-black/5 text-black/70 px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Digital Approach Section */}
        <section className="py-20 bg-black">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Typography variant="h6" className="text-moujeleell mb-4">
                  NOTRE APPROCHE
                </Typography>
                <Typography variant="h3" className="font-bold mb-6">
                  L'Innovation Digitale au Service de vos Objectifs
                </Typography>
                <Typography variant="body" color="muted" className="mb-6 text-lg">
                  Mouje & Leell allie expertise technique et vision stratégique pour développer des solutions digitales qui répondent précisément à vos objectifs business.
                </Typography>
                <Typography variant="body" color="muted" className="text-lg mb-6">
                  Notre équipe multidisciplinaire analyse vos besoins, conçoit des architectures robustes et développe des solutions scalables avec une attention particulière à l'expérience utilisateur.
                </Typography>
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="flex flex-col items-center text-center p-4 bg-moujeleell bg-opacity-5 rounded-lg">
                    <span className="text-4xl mb-3">🔍</span>
                    <Typography variant="h6" className="mb-2">
                      Analyse
                    </Typography>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-moujeleell bg-opacity-5 rounded-lg">
                    <span className="text-4xl mb-3">🎨</span>
                    <Typography variant="h6" className="mb-2">
                      Design
                    </Typography>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-moujeleell bg-opacity-5 rounded-lg">
                    <span className="text-4xl mb-3">⚙️</span>
                    <Typography variant="h6" className="mb-2">
                      Développement
                    </Typography>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-moujeleell bg-opacity-5 rounded-lg">
                    <span className="text-4xl mb-3">📊</span>
                    <Typography variant="h6" className="mb-2">
                      Optimisation
                    </Typography>
                  </div>
                </div>
              </motion.div>
              <div className="relative">
                <motion.div 
                  className="relative rounded-lg overflow-hidden shadow-2xl border border-moujeleell/20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <img
                    src="/subsidiaries/moujeleell-approach.jpg"
                    alt="Digital Approach"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  {/* Design elements */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-moujeleell/20 to-transparent opacity-70" />
                </motion.div>
                {/* Decorative code elements */}
                <div className="absolute -top-5 -right-5 bg-black text-moujeleell p-3 rounded-lg text-xs font-mono rotate-3 shadow-xl">
                  &lt;code&gt;
                </div>
                <div className="absolute -bottom-5 -left-5 bg-black text-moujeleell p-3 rounded-lg text-xs font-mono -rotate-3 shadow-xl">
                  &lt;/code&gt;
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section - Style Apple */}
        <section className="py-24 bg-white text-black">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Questions fréquentes
              </motion.h2>
            </div>
            
            <motion.div 
              className="max-w-4xl mx-auto divide-y divide-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="py-8">
                <h3 className="text-xl font-semibold mb-4">Quand votre outil 3D pour architectes sera-t-il disponible?</h3>
                <p className="text-black/70">
                  Notre outil 3D pour architectes est actuellement en phase finale de développement et sera disponible au cours du prochain trimestre. Inscrivez-vous à notre liste d'attente pour recevoir un accès anticipé.
                </p>
              </div>
              
              <div className="py-8">
                <h3 className="text-xl font-semibold mb-4">Comment fonctionne la technologie de visualisation 3D?</h3>
                <p className="text-black/70">
                  Notre plateforme utilise des technologies de pointe pour permettre aux architectes et designers de visualiser leurs projets avec une précision inégalée, de les modifier en temps réel et de les explorer sous tous les angles pour une expérience immersive complète.
                </p>
              </div>
              
              <div className="py-8">
                <h3 className="text-xl font-semibold mb-4">Proposez-vous des services de design sur mesure?</h3>
                <p className="text-black/70">
                  Oui, notre équipe de designers travaille en étroite collaboration avec les architectes et professionnels pour créer des solutions entièrement personnalisées et adaptées à chaque projet, qu'il s'agisse d'espaces résidentiels ou commerciaux.
                </p>
              </div>
              
              <div className="py-8">
                <h3 className="text-xl font-semibold mb-4">L'outil sera-t-il compatible avec d'autres logiciels d'architecture?</h3>
                <p className="text-black/70">
                  Absolument. Notre outil 3D est conçu pour s'intégrer parfaitement avec les principaux logiciels d'architecture du marché, permettant une transition fluide entre vos outils habituels et notre plateforme de visualisation avancée.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Newsletter - Style Apple */}
        <section className="py-24 bg-[#F5F5F7] text-black">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div 
                className="bg-white p-12 rounded-3xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Restez informé
                </h2>
                <p className="text-lg text-black/70 mb-8 max-w-xl mx-auto">
                  Inscrivez-vous pour être parmi les premiers à découvrir nos nouveaux outils et designs, et recevoir un accès anticipé à notre outil d'architecture 3D.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                  <input 
                    type="email" 
                    placeholder="Votre adresse email" 
                    className="flex-grow px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <Button 
                    className="bg-black hover:bg-black/90 text-white rounded-full px-6"
                    size="lg"
                  >
                    S'inscrire
                  </Button>
                </div>
                <p className="text-xs text-black/50 mt-4">
                  En vous inscrivant, vous acceptez de recevoir des emails de MOOJ & LEEL. Vous pouvez vous désinscrire à tout moment.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Contact CTA - Style Apple */}
        <section className="py-24 bg-black text-white">
          <div className="container px-4 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Prêt à transformer votre vision en réalité?
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-xl mx-auto">
                Notre équipe est à votre disposition pour vous guider et répondre à toutes vos questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact?service=moujeleell">
                  <Button className="bg-white hover:bg-white/90 text-black w-full sm:w-auto px-8 rounded-full" size="lg">
                    Nous contacter
                  </Button>
                </Link>
              </div>
              
              <div className="mt-16 flex items-center justify-center">
                <div className="relative w-20 h-20 opacity-80">
                  <Image
                    src="/item_images/logo_filiale_rectangulaire/logo_mooj&leel.png"
                    alt="Mouje & Leell"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        

      </main>
      
      <Footer variant="subsidiary" subsidiaryColor="moujeleell" />
    </div>
  );
}
