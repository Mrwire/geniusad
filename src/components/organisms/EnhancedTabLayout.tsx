'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/ui/button';

interface TabContentItem {
  id: string;
  title: string;
  description: string;
  image: string;
  logo?: string;
  cta?: {
    text: string;
    link: string;
  };
}

export default function EnhancedTabLayout() {
  const [activeTab, setActiveTab] = useState(0);
  const [animating, setAnimating] = useState(false);
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  // Tab content data for Genius Ad District services
  const tabContent: TabContentItem[] = [
    {
      id: "strategy",
      title: "Stratégie Marketing",
      description: "Des stratégies de marketing basées sur les données qui connectent votre marque avec votre audience cible. Notre approche combine intelligence de marché et créativité pour développer des campagnes percutantes.",
      image: "/item_images/image/element/mps/About-Us-Hero-Image-1.webp",
      logo: "/item_images/logo/mps-logo.svg",
      cta: {
        text: "Découvrir MPS",
        link: "/filiales/mps"
      }
    },
    {
      id: "creative",
      title: "Direction Créative",
      description: "Une vision créative qui transforme votre marque à travers des expériences visuelles saisissantes. Notre équipe de directeurs artistiques et designers crée des identités de marque distinctives qui captivent votre audience.",
      image: "/item_images/image/element/pres Genius 2025 Folder/Links/1.JPG",
      logo: "/item_images/logo/labrigad-logo.svg",
      cta: {
        text: "Découvrir LABRIG'Ad",
        link: "/filiales/labrigad"
      }
    },
    {
      id: "gaming",
      title: "E-Sport & Gaming",
      description: "Solutions gaming innovantes pour atteindre de nouvelles audiences. Nous organisons des tournois e-sport, créons des activations de marque dans l'univers gaming et développons des stratégies d'engagement pour la génération gaming.",
      image: "/item_images/image/inwi_event_gaming.jfif",
      logo: "/item_images/logo/gamius-logo.svg",
      cta: {
        text: "Découvrir Gamius",
        link: "/filiales/gamius"
      }
    },
    {
      id: "digital",
      title: "Solutions Digitales",
      description: "Expertise en développement web, mobile et stratégies digitales pour une présence en ligne impactante. Nous créons des expériences numériques qui transforment votre présence digitale et captent l'attention de votre audience.",
      image: "/item_images/image/element/pres Genius 2025 Folder/Links/12.jpg",
      logo: "/item_images/logo/logo_simplified.png",
      cta: {
        text: "Découvrir Mouje & Leell",
        link: "/filiales/moujeleell"
      }
    }
  ];

  // Handle tab change with smooth animation
  const handleTabChange = (index: number) => {
    if (animating || index === activeTab) return;
    
    setAnimating(true);
    setActiveTab(index);
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setAnimating(false);
    }, 600);
  };

  // Update indicator position when tab changes
  useEffect(() => {
    if (indicatorRef.current) {
      const tabButtons = document.querySelectorAll('.tab-button');
      if (tabButtons[activeTab]) {
        const activeTabButton = tabButtons[activeTab] as HTMLElement;
        const buttonWidth = activeTabButton.offsetWidth;
        const buttonLeft = activeTabButton.offsetLeft;
        
        indicatorRef.current.style.width = `${buttonWidth}px`;
        indicatorRef.current.style.transform = `translateX(${buttonLeft}px)`;
      }
    }
  }, [activeTab]);

  // Animation variants for content transitions
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  return (
    <section className="bg-black text-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col mb-16">
          <Typography variant="h2" className="text-center mb-2">NOS EXPERTISES</Typography>
          <Typography variant="body" color="muted" className="text-center mb-10 max-w-3xl mx-auto">
            Notre maîtrise s'étend à tous les aspects de l'expérience de marque moderne
          </Typography>
        
          {/* Tab navigation */}
          <div className="relative flex flex-wrap justify-center mb-16">
            <div className="flex flex-wrap justify-center gap-1 md:gap-2 relative">
              {tabContent.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(index)}
                  className={`tab-button px-4 py-2 relative z-10 transition-all duration-300 ${
                    activeTab === index 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  disabled={animating}
                  aria-selected={activeTab === index}
                >
                  {tab.title}
                </button>
              ))}
              {/* Animated indicator */}
              <div 
                ref={indicatorRef}
                className="absolute bottom-0 h-0.5 bg-white transition-all duration-300 ease-apple-spring"
                style={{ 
                  bottom: '-4px',
                  height: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)'
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content side */}
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={contentVariants}
                className="flex flex-col h-full"
              >
                {tabContent[activeTab].logo && (
                  <div className="mb-6 h-12 md:h-16 relative">
                    <Image
                      src={tabContent[activeTab].logo}
                      alt={`${tabContent[activeTab].title} logo`}
                      width={180}
                      height={64}
                      style={{ objectFit: 'contain', objectPosition: 'left' }}
                      className="dark:filter dark:invert opacity-80"
                    />
                  </div>
                )}
                
                <Typography variant="h3" className="mb-6">
                  {tabContent[activeTab].title}
                </Typography>
                
                <Typography variant="body" color="muted" className="mb-8 text-lg">
                  {tabContent[activeTab].description}
                </Typography>
                
                {tabContent[activeTab].cta && (
                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className="border border-white/20 hover:bg-white/10 transition-all duration-300"
                      asChild
                    >
                      <a href={tabContent[activeTab].cta.link}>
                        {tabContent[activeTab].cta.text}
                      </a>
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Image side */}
          <div className="relative overflow-hidden rounded-lg aspect-[4/3] border border-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={imageVariants}
                className="absolute inset-0"
              >
                <Image
                  src={tabContent[activeTab].image}
                  alt={tabContent[activeTab].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                  className="transition-opacity duration-500"
                  priority={activeTab === 0}
                />
                <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
