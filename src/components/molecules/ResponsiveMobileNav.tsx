import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/atoms/Button';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

interface ResponsiveMobileNavProps {
  /**
   * Navigation items to display
   */
  items: NavItem[];
  /**
   * Logo component or element
   */
  logo?: React.ReactNode;
  /**
   * Additional class names for the container
   */
  className?: string;
  /**
   * Whether to use a transparent background when not expanded
   */
  transparent?: boolean;
}

/**
 * ResponsiveMobileNav provides a responsive navigation component
 * that collapses into a hamburger menu on mobile screens
 */
export default function ResponsiveMobileNav({ 
  items, 
  logo, 
  className = '',
  transparent = false
}: ResponsiveMobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  
  // Handle escape key to close the menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    // Close menu when clicking outside
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Close the menu when the pathname changes (navigation occurs)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  
  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const renderNavItems = (navItems: NavItem[], level = 0) => {
    return (
      <ul className={`flex flex-col gap-2 ${level > 0 ? 'pl-4 mt-2' : ''}`}>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link 
              href={item.href}
              className={`block py-2 text-lg font-medium ${pathname === item.href ? 'text-primary-600' : 'text-gray-800 hover:text-primary-500'}`}
            >
              {item.label}
            </Link>
            {item.children && renderNavItems(item.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <nav 
      ref={navRef}
      className={`
        lg:hidden
        ${transparent && !isOpen ? 'bg-transparent' : 'bg-white/95 backdrop-blur-sm'}
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease-apple
        ${className}
      `}
      aria-label="Mobile navigation"
    >
      <div className="flex justify-between items-center px-4 py-3">
        {/* Logo */}
        {logo && (
          <div className="z-10">
            {typeof logo === 'string' ? (
              <Link href="/" className="block">
                <img src={logo} alt="Site logo" className="h-10 w-auto" />
              </Link>
            ) : (
              logo
            )}
          </div>
        )}
        
        {/* Hamburger Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="z-10 responsive-touch-target flex flex-col justify-center items-center p-2"
          variant="icon"
        >
          <span className={`
            block w-6 h-0.5 bg-current mb-1.5 transition-transform duration-300
            ${isOpen ? 'rotate-45 translate-y-2' : ''}
          `}></span>
          <span className={`
            block w-6 h-0.5 bg-current mb-1.5 transition-opacity duration-300
            ${isOpen ? 'opacity-0' : 'opacity-100'}
          `}></span>
          <span className={`
            block w-6 h-0.5 bg-current transition-transform duration-300
            ${isOpen ? '-rotate-45 -translate-y-2' : ''}
          `}></span>
        </Button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`
          fixed inset-0 bg-white z-0 pt-20 px-6 pb-10 overflow-y-auto
          transition-transform duration-500 ease-apple-spring
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
        aria-hidden={!isOpen}
      >
        {renderNavItems(items)}
      </div>
    </nav>
  );
} 