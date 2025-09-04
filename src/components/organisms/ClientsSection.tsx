'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const ClientsSection: React.FC = () => {
  const clients = [
    { name: 'MPS', logo: '/item_images/logo/mps-logo.svg' },
    { name: 'LABRIG\'AD', logo: '/item_images/logo/labrigad-logo.svg' },
    { name: 'GAMIUS', logo: '/item_images/logo/gamius-logo.svg' },
    { name: 'Genius', logo: '/item_images/logo/genius-logo-small.svg' },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black to-neutral-900">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-xl text-neutral-400 uppercase tracking-wider font-medium">
              Ils nous font confiance
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
                className="w-32 h-16 relative flex items-center justify-center"
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={120}
                  height={50}
                  className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 