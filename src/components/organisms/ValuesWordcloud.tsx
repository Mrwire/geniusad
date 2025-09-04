'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Container } from '@/components/atoms/Container';

interface ValuesWordcloudProps {
  className?: string;
}

export const ValuesWordcloud: React.FC<ValuesWordcloudProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordCloudRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const wordVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.5,
        delay: i * 0.1
      }
    }),
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1
      }
    })
  };
  
  const paragraphVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.6
      }
    }
  };
  
  // Values for the word cloud
  const values = [
    { text: "SAVOIR-FAIRE", size: "text-4xl md:text-5xl lg:text-6xl", position: "top-1/2 left-[10%] -translate-y-1/2", opacity: 1, delay: 0 },
    { text: "TECHNOLOGIE", size: "text-3xl md:text-4xl lg:text-5xl", position: "top-[30%] right-[15%] -translate-y-1/2", opacity: 0.8, delay: 1 },
    { text: "INNOVATION", size: "text-4xl md:text-5xl lg:text-6xl", position: "top-[70%] left-[30%] -translate-y-1/2", opacity: 0.9, delay: 2 },
    { text: "CRÉATIVITÉ", size: "text-5xl md:text-6xl lg:text-7xl", position: "top-[20%] left-[35%] -translate-y-1/2", opacity: 1, delay: 3 },
    { text: "PASSION", size: "text-4xl md:text-5xl lg:text-6xl", position: "top-[60%] right-[25%] -translate-y-1/2", opacity: 0.8, delay: 4 }
  ];
  
  return (
    <section 
      ref={containerRef} 
      className={`py-24 md:py-32 bg-black text-white ${className}`}
      data-theme="genius"
    >
      <Container>
        <motion.h2 
          className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold mb-16 tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          NOS VALEURS
        </motion.h2>
        
        <div ref={wordCloudRef} className="relative mb-16 h-80 sm:h-96 md:h-[500px]">
          {values.map((value, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={wordVariants}
              initial="hidden"
              animate={controls}
              className={`word absolute ${value.size} font-extrabold ${value.position} transform`}
              style={{ 
                color: `rgba(217, 217, 217, ${value.opacity})`,
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
              }}
            >
              {value.text}
            </motion.div>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto">
          <motion.p 
            ref={paragraphRef}
            className="text-xl text-white/80 text-center"
            variants={paragraphVariants}
            initial="hidden"
            animate={controls}
          >
            Chez Genius Ad District, nous cultivons un ensemble de valeurs qui définissent notre approche et nourrissent notre créativité. Notre savoir-faire technique se combine à notre passion pour l'innovation, créant un environnement où les idées les plus ambitieuses prennent vie grâce à des technologies de pointe. Nous croyons que la créativité sans limites, associée à une exécution rigoureuse, est la clé pour transformer les défis de nos clients en opportunités remarquables.
          </motion.p>
        </div>
      </Container>
    </section>
  );
}; 