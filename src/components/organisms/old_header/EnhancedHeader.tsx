'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link as IntlLink } from '@/navigation';

interface EnhancedHeaderProps {
  transparent?: boolean;
}

const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({ transparent = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key for closing menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      window.addEventListener('keydown', handleEscKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Navigation links
  const navLinks = [
    { name: locale === 'fr' ? 'Accueilp' : 'Home', path: '/' },
    { name: locale === 'fr' ? 'À proposp' : 'About', path: '/about' },
    { name: locale === 'fr' ? 'Filiales' : 'Subsidiaries', path: '/filiales' },
    { name: locale === 'fr' ? 'Services' : 'Services', path: '/services' },
    { name: locale === 'fr' ? 'Galerie' : 'Gallery', path: '/gallery' },
    { name: locale === 'fr' ? 'Contact' : 'Contact', path: '/contact' },
  ];

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 25
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: [0, 0, 0.2, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !transparent || isMenuOpen
          ? 'backdrop-blur-md bg-black/80'
          : 'bg-transparent'
      }`}
    >
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="container mx-auto px-4"
      >
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div className="flex items-center">
              <div className="relative w-10 h-10 mr-2">
                <Image 
                  src="/item_images/logo/logo_simplified.png" 
                  alt="Genius Ad District"
                  fill
                  style={{ objectFit: "contain" }}
                  className="dark:invert"
                />
              </div>
              <span className="font-bold text-xl">Genius Ad</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path || 
                (pathname?.startsWith(link.path) && link.path !== '/');
              return (
                <Link 
                  key={link.path}
                  href={link.path}
                  className={`relative py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive 
                      ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white' 
                      : 'text-gray-300 hover:text-white hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-white/50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <IntlLink href={pathname || '/'} locale={locale === 'fr' ? 'en' : 'fr'}>
                <button className="px-2 py-1 text-sm text-gray-300 hover:text-white bg-transparent hover:bg-white/10 rounded transition-colors">
                  {locale === 'fr' ? 'EN' : 'FR'}
                </button>
              </IntlLink>
            </div>
            
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-6 h-5">
                <span 
                  className="absolute left-0 w-full h-0.5 bg-white transform transition-all duration-300" 
                  style={{ 
                    top: isMenuOpen ? '10px' : '0',
                    transform: isMenuOpen ? 'rotate(45deg)' : 'none' 
                  }} 
                />
                <span 
                  className="absolute left-0 w-full h-0.5 bg-white transform transition-all duration-300" 
                  style={{ 
                    top: '10px',
                    opacity: isMenuOpen ? 0 : 1 
                  }} 
                />
                <span 
                  className="absolute left-0 w-full h-0.5 bg-white transform transition-all duration-300" 
                  style={{ 
                    top: isMenuOpen ? '10px' : '20px',
                    transform: isMenuOpen ? 'rotate(-45deg)' : 'none' 
                  }} 
                />
              </div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden fixed inset-0 top-20 z-40 bg-black/95 backdrop-blur-md"
            style={{ height: 'calc(100vh - 5rem)' }}
          >
            <div className="container mx-auto px-4 py-8 flex flex-col h-full">
              <nav className="flex flex-col space-y-6 text-center mb-auto">
                {navLinks.map((link) => {
                  const isActive = pathname === link.path || 
                    (pathname?.startsWith(link.path) && link.path !== '/');
                  
                  return (
                    <motion.div key={link.path} variants={itemVariants}>
                      <Link 
                        href={link.path}
                        className={`block text-xl font-medium transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              
              {/* Mobile Language Switcher */}
              <motion.div variants={itemVariants} className="pt-4 border-t border-gray-800">
                <IntlLink href={pathname || '/'} locale={locale === 'fr' ? 'en' : 'fr'}>
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded transition-colors">
                    {locale === 'fr' ? 'Switch to English' : 'Passer en Français'}
                  </button>
                </IntlLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default EnhancedHeader;
