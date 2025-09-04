'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';

export const MindsetSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });
  
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  
  const pillars = [
    {
      title: "Innovation",
      description: "Nous repoussons constamment les limites de la créativité pour concevoir des expériences publicitaires uniques et mémorables.",
      color: "from-blue-500/20 to-transparent"
    },
    {
      title: "Stratégie",
      description: "Chaque campagne est guidée par une stratégie solide, façonnée par la data et orientée vers des résultats mesurables.",
      color: "from-purple-500/20 to-transparent"
    },
    {
      title: "Collaboration",
      description: "Nous travaillons en étroite collaboration avec nos clients, en intégrant leurs valeurs et objectifs à chaque étape du processus.",
      color: "from-cyan-500/20 to-transparent"
    }
  ];

  // Animation variants Apple-like
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        ease: [0.25, 0.1, 0.25, 1.0], // Courbe d'accélération Apple
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.23, 1, 0.32, 1] // Courbe d'accélération Apple
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };
  
  const pillarVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        delay: 0.2 + (i * 0.1),
        ease: [0.23, 1, 0.32, 1]
      }
    }),
    hover: { 
      y: -5,
      transition: { 
        duration: 0.2, 
        ease: [0.34, 1.56, 0.64, 1] // Rebond léger à la Apple
      }
    },
    tap: { 
      scale: 0.98,
      transition: { 
        duration: 0.1, 
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-neutral-950 overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={imageVariants}
            className="relative w-full overflow-hidden rounded-2xl"
          >
            <Image
              src="/item_images/element/aimable.png"
              alt="Notre mindset chez Genius"
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>

          <div className="space-y-12">
            <motion.div
              variants={textVariants}
              className="space-y-4"
            >
              <motion.h3 
                className="text-sm text-white uppercase tracking-wider font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Notre approche
              </motion.h3>
              <h2 className="text-3xl md:text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Un mindset qui fait la différence
              </h2>
              <p className="text-neutral-300 text-lg">
                Chez Genius, notre philosophie est ancrée dans la conviction que la publicité 
                doit non seulement captiver, mais aussi créer une connexion authentique avec le public.
              </p>
            </motion.div>

            <motion.div className="space-y-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  custom={index}
                  variants={pillarVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onHoverStart={() => setHoveredPillar(index)}
                  onHoverEnd={() => setHoveredPillar(null)}
                  className="bg-neutral-900/70 backdrop-blur-sm p-6 rounded-2xl border border-neutral-800/50 hover:border-neutral-700/70 transition-colors duration-300 relative overflow-hidden group cursor-default"
                >
                  {/* Gradient d'arrière-plan */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-r ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredPillar === index ? 0.3 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                      <motion.span 
                        className="inline-block"
                        animate={hoveredPillar === index ? { x: 5 } : { x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {pillar.title}
                      </motion.span>
                    </h3>
                    <p className="text-neutral-300 group-hover:text-white/90 transition-colors duration-300">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};