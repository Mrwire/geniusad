'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/navigation';
import Image from 'next/image';

interface NavLink {
  href: string;
  label: string;
}

interface SubMenu {
  title: string;
  links: NavLink[];
}

interface MainNavigationProps {
  locale: string;
}

export default function MainNavigation({ locale }: MainNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Listen for scroll to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const subsidiaryLinks: NavLink[] = [
    { href: `/filiales/mps`, label: 'MPS' },
    { href: `/filiales/labrigad`, label: 'LABRIG\'Ad' },
    { href: `/filiales/gamius`, label: 'Gamius' },
    { href: `/filiales/moujeleell`, label: 'Mouje-Leell' }
  ];

  const toolsLinks: NavLink[] = [
    { href: `/tools/ui-showcase`, label: 'UI Components' },
    { href: `/tools/accessibility`, label: 'Accessibility' },
    { href: `/tools/component-generator`, label: 'Component Generator' }
  ];

  const menus: Record<string, SubMenu> = {
    subsidiaries: {
      title: 'Our Subsidiaries',
      links: subsidiaryLinks
    },
    tools: {
      title: 'Developer Tools',
      links: toolsLinks
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveSubmenu(null);
    }
  };

  const toggleSubmenu = (key: string) => {
    if (activeSubmenu === key) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(key);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-5">
        <div className="flex justify-between items-center">
          <Link href="/" locale={locale} className="flex items-center">
            <div className="relative w-40 h-12">
              <Image 
                src="/item_images/image/logo/genius-logo.png" 
                alt="Genius Ad District" 
                fill
                style={{ objectFit: 'contain' }}
                priority
                className="brightness-110"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" locale={locale} className="text-silver hover:text-white transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-silver after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 hover:after:w-full after:transition-all after:duration-300">
              Home
            </Link>
            <Link href="/about" locale={locale} className="text-silver hover:text-white transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-silver after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 hover:after:w-full after:transition-all after:duration-300">
              About
            </Link>
            <Link href="/a-propos/notre-histoire" locale={locale} className="text-silver hover:text-white transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-silver after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 hover:after:w-full after:transition-all after:duration-300">
              Our History
            </Link>
            <Link href="/notre-ecosysteme" locale={locale} className="text-silver hover:text-white transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-silver after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 hover:after:w-full after:transition-all after:duration-300">
              Notre Écosystème
            </Link>
            
            <div className="relative group">
              <button 
                className="text-silver hover:text-white transition-all duration-300 font-medium flex items-center gap-1 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-silver after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 group-hover:after:w-full after:transition-all after:duration-300"
                onClick={() => toggleSubmenu('subsidiaries')}
              >
                Subsidiaries
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:rotate-180">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              
              <div className="absolute left-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-silver/20 rounded-md shadow-2xl overflow-hidden z-20 opacity-0 transform -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
                <div className="py-2">
                  {subsidiaryLinks.map((link, i) => (
                    <Link 
                      key={i} 
                      href={link.href} 
                      locale={locale}
                      className="block px-4 py-2 text-silver hover:bg-silver/10 hover:text-white transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <Link href="/gallery" locale={locale} className="text-silver hover:text-white transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-silver after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 hover:after:w-full after:transition-all after:duration-300">
              Work
            </Link>

            <div className="relative group">
              <button 
                className="text-silver hover:text-white transition-all duration-300 font-medium flex items-center gap-1 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-silver after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 group-hover:after:w-full after:transition-all after:duration-300"
                onClick={() => toggleSubmenu('tools')}
                aria-expanded={activeSubmenu === 'tools'}
                aria-controls="tools-menu"
              >
                Tools
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:rotate-180">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              
              <div 
                id="tools-menu"
                className="absolute left-0 mt-2 w-52 bg-black/90 backdrop-blur-md border border-silver/20 rounded-md shadow-2xl overflow-hidden z-20 opacity-0 transform -translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300"
              >
                <div className="py-2">
                  {toolsLinks.map((link, i) => (
                    <Link 
                      key={i} 
                      href={link.href} 
                      locale={locale}
                      className="block px-4 py-2 text-silver hover:bg-silver/10 hover:text-white transition-all duration-300"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/contact" locale={locale} className="bg-silver/10 border border-silver/30 text-silver px-5 py-2 rounded-md hover:bg-silver hover:text-black hover:border-transparent transition-all duration-300 font-medium backdrop-blur-sm">
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-silver hover:text-white transition-all duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link href="/" locale={locale} className="text-silver hover:text-white transition-all duration-300 font-medium py-2 border-b border-silver/10">
                  Home
                </Link>
                <Link href="/about" locale={locale} className="text-silver hover:text-white transition-all duration-300 font-medium py-2 border-b border-silver/10">
                  About
                </Link>
                <Link href="/a-propos/notre-histoire" locale={locale} className="text-silver hover:text-white transition-all duration-300 font-medium py-2 border-b border-silver/10">
                  Our History
                </Link>
                <Link href="/notre-ecosysteme" locale={locale} className="text-silver hover:text-white transition-all duration-300 font-medium py-2 border-b border-silver/10">
                  Notre Écosystème
                </Link>
                
                <div className="border-b border-silver/10">
                  <button 
                    className="text-silver hover:text-white transition-all duration-300 font-medium flex items-center justify-between w-full py-2"
                    onClick={() => toggleSubmenu('subsidiaries')}
                    aria-expanded={activeSubmenu === 'subsidiaries'}
                    aria-controls="mobile-subsidiaries-menu"
                  >
                    Subsidiaries
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${activeSubmenu === 'subsidiaries' ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {activeSubmenu === 'subsidiaries' && (
                      <motion.div
                        id="mobile-subsidiaries-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 border-l border-silver/20 mt-2 space-y-2 mb-2"
                      >
                        {subsidiaryLinks.map((link, i) => (
                          <Link 
                            key={i} 
                            href={link.href} 
                            locale={locale}
                            className="block py-2 text-silver/70 hover:text-white transition-all duration-300"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <Link href="/gallery" locale={locale} className="text-silver hover:text-white transition-all duration-300 font-medium py-2 border-b border-silver/10">
                  Work
                </Link>

                <div className="border-b border-silver/10">
                  <button 
                    className="text-silver hover:text-white transition-all duration-300 font-medium flex items-center justify-between w-full py-2"
                    onClick={() => toggleSubmenu('tools')}
                    aria-expanded={activeSubmenu === 'tools'}
                    aria-controls="mobile-tools-menu"
                  >
                    Tools
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className={`transition-transform duration-200 ${activeSubmenu === 'tools' ? 'rotate-180' : ''}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {activeSubmenu === 'tools' && (
                      <motion.div
                        id="mobile-tools-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 border-l border-silver/20 mt-2 space-y-2 mb-2"
                      >
                        {toolsLinks.map((link, i) => (
                          <Link 
                            key={i} 
                            href={link.href} 
                            locale={locale}
                            className="block py-2 text-silver/70 hover:text-white transition-all duration-300"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="/contact" locale={locale} className="bg-silver/10 border border-silver/30 text-silver px-5 py-3 rounded-md hover:bg-silver hover:text-black hover:border-transparent transition-all duration-300 font-medium text-center mt-2 backdrop-blur-sm">
                  Contact
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
} 