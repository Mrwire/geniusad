'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { safeLocalStorage } from '../../utils/safeStorage';

// Available themes
export type ThemeName = 'genius' | 'mps' | 'labrigad' | 'gamius' | 'moujeleell';

interface ThemeContextType {
  themeName: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  defaultTheme?: ThemeName;
  children: React.ReactNode;
}

export function ThemeProvider({
  defaultTheme = 'genius',
  children,
}: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<ThemeName>(defaultTheme);

  // Apply theme by adding appropriate class to body
  useEffect(() => {
    // First remove all theme classes
    const themeClasses = ['theme-genius', 'theme-mps', 'theme-labrigad', 'theme-gamius', 'theme-moujeleell'];
    document.body.classList.remove(...themeClasses);
    
    // Then add the new theme class
    document.body.classList.add(`theme-${themeName}`);
    
    // Also store in local storage for persistence using our safe utility
    safeLocalStorage.setItem('genius-ad-theme', themeName);
    
    // Update CSS variables based on the selected theme
    // This will be handled by the CSS-in-JS implementation or CSS variables
  }, [themeName]);
  
  // Check for saved theme in localStorage on initial load
  useEffect(() => {
    const savedTheme = safeLocalStorage.getItem('genius-ad-theme') as ThemeName | null;
    if (savedTheme && ['genius', 'mps', 'labrigad', 'gamius', 'moujeleell'].includes(savedTheme)) {
      setThemeName(savedTheme);
    }
  }, []);
  
  const setTheme = (theme: ThemeName) => {
    setThemeName(theme);
  };
  
  return (
    <ThemeContext.Provider value={{ themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 