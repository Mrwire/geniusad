'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SubsidiaryTheme } from '../templates/SubsidiaryLayout';

interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description?: string;
}

interface WorkGridProps {
  title: string;
  subtitle?: string;
  items: WorkItem[];
  theme: SubsidiaryTheme;
  categories?: string[];
}

export default function WorkGrid({
  title,
  subtitle,
  items,
  theme,
  categories = [],
}: WorkGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const allCategories = ['all', ...new Set(categories.length ? categories : items.map(item => item.category))];
  
  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => item.category === activeCategory);
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: `var(--color-${theme})` }}>
            {title}
          </h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
        
        {/* Category filter */}
        {allCategories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allCategories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? `bg-${theme} text-white`
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                style={activeCategory === category ? { backgroundColor: `var(--color-${theme})` } : {}}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        )}
        
        {/* Work grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md bg-white h-64 md:h-80">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                  <div className="p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-1 mx-auto mb-3" style={{ backgroundColor: `var(--color-${theme})` }}></div>
                    <h3 className="text-white text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-300 text-sm">{item.category}</p>
                    {item.description && (
                      <p className="text-gray-300 mt-2 text-sm">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 