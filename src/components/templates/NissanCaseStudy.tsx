'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import Link from 'next/link';

interface GalleryImage {
  asset: {
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
  caption?: string;
}

interface NissanCaseStudyProps {
  title: string;
  client: string;
  description: string;
  coverImage: string;
  heroVideo?: string;
  gallery?: {
    images: GalleryImage[];
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
    company: string;
    avatar?: string;
  };
  awards?: string[];
  challenges?: string[];
  solutions?: string[];
  locale: string;
  translations: Record<string, string>;
}

const NissanCaseStudy: React.FC<NissanCaseStudyProps> = ({
  title,
  client,
  description,
  coverImage,
  heroVideo,
  gallery,
  stats,
  testimonial,
  awards,
  challenges,
  solutions,
  locale,
  translations,
}) => {
  const [activeGalleryImage, setActiveGalleryImage] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'challenge' | 'solution'>('challenge');
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Image lightbox handler
  const openLightbox = (index: number) => {
    setActiveGalleryImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveGalleryImage(null);
    document.body.style.overflow = '';
  };

  // Parallax effect calculation for stats section
  const { scrollYProgress: statsScrollProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"]
  });

  const statsOpacity = useTransform(statsScrollProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const statsY = useTransform(statsScrollProgress, [0, 0.3, 0.8, 1], [50, 0, 0, -50]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Parallax & Video */}
      <motion.div 
        ref={heroRef}
        className="relative h-[90vh] min-h-[600px] overflow-hidden bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div 
          className="absolute inset-0"
          style={{ 
            opacity: scrollOpacity,
            scale: scrollScale,
            y: scrollY 
          }}
        >
          {heroVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={heroVideo} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={coverImage}
              alt={title}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="opacity-70"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black"></div>
        </motion.div>

        <div className="container relative z-10 h-full mx-auto px-4 flex flex-col justify-center">
          <motion.div 
            className="max-w-4xl text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.4
            }}
          >
            <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-4">
              <Typography variant="label" className="text-sm uppercase tracking-widest text-white">
                {client}
              </Typography>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.6
              }}
            >
              <Typography variant="h1" className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                {title}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.8
              }}
            >
              <Typography variant="body" className="text-xl md:text-2xl leading-relaxed text-white/90 max-w-2xl mb-12">
                {description}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: 1
              }}
            >
              <Button variant="primary" className="mr-4">
                {translations.exploreCase}
              </Button>
              <Button variant="secondary" className="backdrop-blur-md bg-white/10 text-white border-white/20 hover:bg-white/20">
                {translations.contactUs}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Stats Section with Animated Counters */}
      {stats && stats.length > 0 && (
        <motion.section 
          ref={statsRef}
          className="py-24 bg-black text-white relative overflow-hidden"
          style={{
            opacity: statsOpacity,
            y: statsY
          }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center mb-16">
              <Typography variant="label" className="uppercase tracking-wider text-white/60 mb-4">
                {translations.impactNumbers}
              </Typography>
              <Typography variant="h2" className="text-3xl md:text-5xl font-bold">
                {translations.measurableResults}
              </Typography>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.2
                  }}
                >
                  <Typography variant="h3" className="text-4xl md:text-6xl font-bold mb-4 text-white">
                    {stat.value}
                  </Typography>
                  <Typography variant="body" className="text-lg text-white/70">
                    {stat.label}
                  </Typography>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 to-transparent"></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </motion.section>
      )}

      {/* Challenges & Solutions */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Tab Buttons */}
            <div className="flex mb-12 border-b border-gray-200">
              <button
                className={`pb-4 px-8 text-lg font-medium relative ${
                  activeTab === 'challenge' 
                    ? 'text-black' 
                    : 'text-gray-500 hover:text-black transition-colors'
                }`}
                onClick={() => setActiveTab('challenge')}
              >
                {translations.challenges}
                {activeTab === 'challenge' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-black"
                    layoutId="tabIndicator"
                  />
                )}
              </button>
              <button
                className={`pb-4 px-8 text-lg font-medium relative ${
                  activeTab === 'solution' 
                    ? 'text-black' 
                    : 'text-gray-500 hover:text-black transition-colors'
                }`}
                onClick={() => setActiveTab('solution')}
              >
                {translations.solutions}
                {activeTab === 'solution' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-1 bg-black"
                    layoutId="tabIndicator"
                  />
                )}
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'challenge' && challenges && (
                <motion.div
                  key="challenges"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <ul className="space-y-6">
                    {challenges.map((challenge, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-shrink-0 mr-4 mt-1">
                          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <Typography variant="body" className="text-lg text-gray-800">
                            {challenge}
                          </Typography>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === 'solution' && solutions && (
                <motion.div
                  key="solutions"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <ul className="space-y-6">
                    {solutions.map((solution, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-shrink-0 mr-4 mt-1">
                          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        </div>
                        <div>
                          <Typography variant="body" className="text-lg text-gray-800">
                            {solution}
                          </Typography>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Interactive Gallery with Lightbox */}
      {gallery && gallery.images && gallery.images.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center mb-16">
              <Typography variant="label" className="uppercase tracking-wider text-gray-500 mb-4">
                {translations.visualGallery}
              </Typography>
              <Typography variant="h2" className="text-3xl md:text-5xl font-bold mb-6">
                {translations.campaignShowcase}
              </Typography>
              <Typography variant="body" className="text-xl text-gray-600 max-w-3xl mx-auto">
                {translations.galleryDescription}
              </Typography>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {gallery.images.map((image, index) => (
                <motion.div 
                  key={index}
                  className="overflow-hidden rounded-xl shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openLightbox(index)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.1 % 0.3 // Cycle through delays
                  }}
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={image.asset.url}
                      alt={image.alt || `Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  {image.caption && (
                    <div className="p-4 bg-white">
                      <Typography variant="body" className="text-sm text-gray-600">
                        {image.caption}
                      </Typography>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {activeGalleryImage !== null && gallery.images[activeGalleryImage] && (
              <motion.div 
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
              >
                <button 
                  className="absolute top-4 right-4 text-white z-10 hover:opacity-70 transition-opacity"
                  onClick={closeLightbox}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white z-10 hover:opacity-70 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveGalleryImage(prev => 
                      prev === null ? null : (prev > 0 ? prev - 1 : gallery.images.length - 1)
                    );
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white z-10 hover:opacity-70 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveGalleryImage(prev => 
                      prev === null ? null : (prev < gallery.images.length - 1 ? prev + 1 : 0)
                    );
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>

                <motion.div 
                  className="relative max-w-4xl max-h-[80vh] w-full h-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={gallery.images[activeGalleryImage].asset.url}
                    alt={gallery.images[activeGalleryImage].alt || `Gallery image ${activeGalleryImage + 1}`}
                    fill
                    sizes="90vw"
                    style={{ objectFit: 'contain' }}
                    className="pointer-events-none"
                  />
                  {gallery.images[activeGalleryImage].caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4">
                      <Typography variant="body" className="text-white">
                        {gallery.images[activeGalleryImage].caption}
                      </Typography>
                    </div>
                  )}
                </motion.div>

                <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
                  {gallery.images.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        idx === activeGalleryImage ? 'bg-white' : 'bg-white/40'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveGalleryImage(idx);
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* Testimonial Section */}
      {testimonial && (
        <section className="py-24 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(31,41,55,0.5)_0%,_rgba(0,0,0,0)_70%)]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 text-white/30">
                  <path d="M10 11L8 17H11L9 22H6L8 17H5L3 11H10ZM22 11L20 17H23L21 22H18L20 17H17L15 11H22Z" fill="currentColor"/>
                </svg>
                
                <Typography variant="h3" className="text-2xl md:text-3xl font-medium mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </Typography>
                
                <div className="flex items-center justify-center">
                  {testimonial.avatar && (
                    <div className="mr-4">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div className="text-left">
                    <Typography variant="body" className="font-semibold">
                      {testimonial.author}
                    </Typography>
                    <Typography variant="body" className="text-white/70 text-sm">
                      {testimonial.position}, {testimonial.company}
                    </Typography>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Awards Section */}
      {awards && awards.length > 0 && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center mb-16">
              <Typography variant="label" className="uppercase tracking-wider text-gray-500 mb-4">
                {translations.recognition}
              </Typography>
              <Typography variant="h2" className="text-3xl md:text-5xl font-bold mb-6">
                {translations.awardWinning}
              </Typography>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {awards.map((award, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.1
                  }}
                >
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                      </svg>
                    </div>
                    <Typography variant="body" className="font-medium">
                      {award}
                    </Typography>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Case Studies Link */}
      <section className="py-16 text-center">
        <Link href={`/${locale}/case-studies`} className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2"
          >
            <path d="m15 18-6-6 6-6"/>
          </svg> 
          {translations.backToCaseStudies}
        </Link>
      </section>
    </main>
  );
};

export default NissanCaseStudy; 