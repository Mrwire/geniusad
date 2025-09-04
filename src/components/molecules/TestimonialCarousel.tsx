'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SubsidiaryTheme } from '../templates/SubsidiaryLayout';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  company: string;
  avatar?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  theme: SubsidiaryTheme;
  autoPlayInterval?: number;
}

export default function TestimonialCarousel({ 
  testimonials, 
  theme, 
  autoPlayInterval = 5000 
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const length = testimonials.length;

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current => (current === length - 1 ? 0 : current + 1));
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [length, autoPlayInterval]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900 p-8 md:p-12">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full" style={{ backgroundColor: `var(--color-${theme})`, filter: 'blur(100px)' }}></div>
            <div className="absolute left-0 top-0 w-64 h-64 rounded-full" style={{ backgroundColor: `var(--color-${theme})`, filter: 'blur(80px)' }}></div>
          </div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Client Testimonials</h2>
            
            <div className="relative h-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <div className="mb-6 text-7xl text-white opacity-20">"</div>
                  <p className="text-xl md:text-2xl italic text-white mb-8">{testimonials[current].quote}</p>
                  
                  <div className="flex items-center justify-center">
                    {testimonials[current].avatar && (
                      <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden border-2" style={{ borderColor: `var(--color-${theme})` }}>
                        <Image 
                          src={testimonials[current].avatar} 
                          alt={testimonials[current].author}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div className="text-left">
                      <p className="font-semibold text-lg text-white">{testimonials[current].author}</p>
                      <p className="text-gray-400">{testimonials[current].company}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-center gap-3 mt-8">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`h-2 rounded-full transition-all ${index === current ? 'w-8' : 'w-2 bg-opacity-50'}`}
                    style={{ backgroundColor: `var(--color-${theme})` }}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 