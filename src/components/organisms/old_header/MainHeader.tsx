"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Header, 
  HeaderContainer, 
  HeaderContent, 
  HeaderLogo, 
  HeaderNav, 
  HeaderActions, 
  HeaderMobileMenu 
} from "@/components/ui/header"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'Services', href: '#services', scroll: true },
  { name: 'Portfolio', href: '#portfolio', scroll: true },
  { name: 'Blog', href: '/blog' },
  { name: 'À propos', href: '#about', scroll: true }, // Changé en ancre sur la page d'accueil
  { name: 'Contact', href: '/contact' },
]

// Les filiales ne redirigent plus vers des pages mais affichent des infos sur la page d'accueil
const subsidiaryItems = [
  { name: 'MPS', href: '/#subsidiaries-mps', color: 'mps', scroll: true },
  { name: 'LABRIG\'Ad', href: '/#subsidiaries-labrigad', color: 'labrigad', scroll: true },
  { name: 'Gamius', href: '/#subsidiaries-gamiusgroup', color: 'gamius', scroll: true },
  { name: 'Mouje-Leell', href: '/#subsidiaries-moujeleell', color: 'moujeleell', scroll: true },
]

export interface MainHeaderProps {
  transparent?: boolean;
  variant?: 'default' | 'transparent' | 'subsidiary';
  subsidiaryColor?: 'mps' | 'labrigad' | 'gamius' | 'gamiusgroup' | 'moujeleell';
}

export function MainHeader({ 
  transparent = false, 
  variant = 'default',
  subsidiaryColor 
}: MainHeaderProps) {
  const [scrolled, setScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  
  // Change header style on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <>
      <Header 
        variant={transparent && !scrolled ? 'transparent' : variant} 
        scrolled={scrolled}
        subsidiaryColor={subsidiaryColor}
      >
        <HeaderContainer>
          <HeaderContent>
            <HeaderLogo>
              <Link href="/" className="flex items-center">
                <Image 
                  src="/logo.svg" 
                  alt="Genius Ad District" 
                  width={40} 
                  height={40} 
                  className="mr-3"
                />
                <span className="font-heading font-bold text-xl">
                  Genius Ad District
                </span>
              </Link>
            </HeaderLogo>
            
            <HeaderNav>
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className="font-medium text-sm hover:text-cyan transition-colors"
                  scroll={item.scroll}
                >
                  {item.name}
                </Link>
              ))}
            </HeaderNav>
            
            <HeaderActions>
              <Link href="/client-portal">
                <Button variant="outline" size="sm" className="hidden md:inline-flex">
                  Client Portal
                </Button>
              </Link>
              
              <HeaderMobileMenu>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </HeaderMobileMenu>
            </HeaderActions>
          </HeaderContent>
        </HeaderContainer>
      </Header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-black lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex flex-col h-full px-6 pt-24 pb-6 overflow-y-auto">
              <nav className="space-y-6 mb-8">
                {navItems.map((item) => (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className="block font-heading text-xl font-semibold hover:text-cyan transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                    scroll={item.scroll}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              <div className="border-t border-gray-800 pt-6 mt-auto">
                <h3 className="text-sm text-gray-400 mb-4">Nos filiales</h3>
                <div className="space-y-4">
                  {subsidiaryItems.map((item) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className={`block font-medium hover:opacity-80 transition-opacity text-${item.color}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      scroll={item.scroll}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/client-portal" className="w-full">
                  <Button variant="outline" className="w-full">
                    Client Portal
                  </Button>
                </Link>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-6 right-6"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <span className="sr-only">Close</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
