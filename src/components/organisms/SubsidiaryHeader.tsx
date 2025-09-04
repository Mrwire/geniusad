'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link as IntlLink } from '@/navigation';
import { filiales } from '@/components/ui/navbar-demo';
import { AlertCircle } from 'lucide-react';

interface SubsidiaryHeaderProps {
  subsidiarySlug: string;
  transparent?: boolean;
}

const SubsidiaryHeader: React.FC<SubsidiaryHeaderProps> = ({ 
  subsidiarySlug, 
  transparent = false 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showReturnBanner, setShowReturnBanner] = useState(true);
  const pathname = usePathname();
  const locale = useLocale();
  
  const subsidiaryData = filiales[subsidiarySlug] || filiales.genius;

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

  // Navigation links - these can be customized per subsidiary
  const localeSegment = locale === 'fr' ? 'filiales' : 'subsidiaries';
  const navLinks = [
    { name: locale === 'fr' ? 'Accueil' : 'Home', path: `/${locale}/${localeSegment}/${subsidiarySlug}` },
    { name: locale === 'fr' ? 'Services' : 'Services', path: `/${locale}/${localeSegment}/${subsidiarySlug}/services` },
    { name: locale === 'fr' ? 'Projets' : 'Projects', path: `/${locale}/${localeSegment}/${subsidiarySlug}/projects` },
    { name: locale === 'fr' ? 'Contact' : 'Contact', path: `/${locale}/contact` },
  ];

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
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
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        ease: [0, 0, 0.2, 1] as [number, number, number, number],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  // Get the banner styling based on subsidiary
  const getBannerStyle = () => {
    switch(subsidiarySlug) {
      case 'gamiusgroup':
        return 'bg-gamius/20 border-gamius';
      case 'mps':
        return 'bg-blue-900/20 border-blue-600';
      case 'labrigad':
        return 'bg-red-900/20 border-red-600';
      case 'moujeleell':
        return 'bg-green-900/20 border-green-600';
      default:
        return 'bg-black/20 border-white/20';
    }
  };

  // Determine if the current path is active
  const isActivePath = (path: string) => {
    const homePathPattern = new RegExp(`/${locale}/(filiales|subsidiaries)/${subsidiarySlug}$`);
    if (homePathPattern.test(path) && pathname && homePathPattern.test(pathname)) {
      return true;
    }
    return pathname === path || (pathname && pathname.startsWith(path) && !homePathPattern.test(path));
  };

  return (
    <>
      {/* Return to Genius Banner */}
      {showReturnBanner && (
        <div className={`fixed top-0 left-0 right-0 z-[100] px-4 py-2 border-b ${getBannerStyle()} backdrop-blur-md transition-all duration-300`}>
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>
                {locale === 'fr' 
                  ? 'Vous êtes sur le site de ' 
                  : 'You are on the '} 
                <strong>{subsidiaryData.name}</strong> 
                {locale === 'fr' ? '. ' : ' website. '}
                <Link href="/" className="underline hover:text-white">
                  {locale === 'fr' ? 'Retourner à Genius AD District' : 'Return to Genius AD District'}
                </Link>
              </span>
            </div>
            <button 
              onClick={() => setShowReturnBanner(false)}
              className="text-white/70 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <header 
        className={`fixed ${showReturnBanner ? 'top-10' : 'top-0'} left-0 right-0 z-50 transition-all duration-300 ${
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
            {/* Logo - now links to subsidiary homepage */}
            <Link href={`/filiales/${subsidiarySlug}`} className="relative z-10">
              <div className="flex items-center">
                <div className="relative w-10 h-10 mr-2">
                  <Image 
                    src={subsidiaryData.logoPath} 
                    alt={subsidiaryData.name}
                    fill
                    style={{ objectFit: "contain" }}
                    className={subsidiarySlug === 'genius' ? "dark:invert" : ""}
                  />
                </div>
                <span className="font-bold text-xl">{subsidiaryData.name}</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = isActivePath(link.path);
                return (
                  <Link 
                    key={link.path} 
                    href={link.path}
                    className={`py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive 
                        ? 'text-white border-b-2 border-white' 
                        : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-white/50'
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
                    const isActive = isActivePath(link.path);
                    
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
                  
                  {/* Return to Genius Link in Mobile Menu */}
                  <motion.div variants={itemVariants}>
                    <Link 
                      href="/"
                      className="block text-xl font-medium text-gray-400 hover:text-white transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {locale === 'fr' ? 'Genius AD District' : 'Genius AD District'}
                    </Link>
                  </motion.div>
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
    </>
  );
};

export default SubsidiaryHeader;
