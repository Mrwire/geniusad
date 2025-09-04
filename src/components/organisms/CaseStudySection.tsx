'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from '@/components/icons';

export const CaseStudySection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <h3 className="text-sm text-white uppercase tracking-wider font-medium">Étude de cas</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Nissan Juke Hybrid</h2>
            </div>
            
            <p className="text-neutral-400 text-lg">
              Nous avons conçu une expérience publicitaire immersive mettant en valeur la technologie hybride 
              du Nissan Juke, en ciblant une audience soucieuse de l'environnement et de la performance.
            </p>
            
            <ul className="space-y-3 text-neutral-300">
              <li className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-white rounded-full"></span>
                Augmentation de 32% du taux d'engagement
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-white rounded-full"></span>
                Conversion accrue de 18% vers les demandes d'essai
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-white rounded-full"></span>
                Stratégie multicanale cohérente
              </li>
            </ul>
            
            <div className="pt-4">
              <Button variant="secondary" size="lg">
                Voir l'étude de cas
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square md:aspect-[4/3] w-full overflow-hidden rounded-xl"
            style={{ position: 'relative' }}
          >
            <Image
              src="/item_images/case-nissan-hero.jpg"
              alt="Nissan Juke Hybrid case study"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 right-4 p-3 bg-black/70 backdrop-blur-sm rounded-lg shadow-lg">
              <Image 
                src="/item_images/case-nissan-1.jpg"
                alt="Nissan campaign details"
                width={120}
                height={80}
                className="rounded"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
