#!/usr/bin/env node

/**
 * Initialization script for Shadcn UI with MCP registry
 * 
 * This script installs shadcn components and sets up a theme system
 * for the Genius Ad District project with different subsidiary themes.
 * 
 * Usage:
 * node initialize-shadcn.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Colors for each subsidiary
const subsidiaryThemes = {
  // Main Genius Ad District theme
  genius: {
    primary: '#FF0050', // Genius signature red
    secondary: '#2563EB', // Blue
    accent: '#FFB800', // Yellow/Gold accent
    background: '#FFFFFF',
    foreground: '#0A0A0A',
    muted: '#F5F5F5',
  },
  
  // MPS - Production & Fabrication
  mps: {
    primary: '#3B82F6', // Blue primary
    secondary: '#6366F1', // Indigo
    accent: '#FF4800', // Orange accent
    background: '#FFFFFF',
    foreground: '#0A0A0A',
    muted: '#F0F9FF',
  },
  
  // LABRIG'AD - Activation & Événementiel
  labrigad: {
    primary: '#EC4899', // Pink primary
    secondary: '#8B5CF6', // Purple
    accent: '#22D3EE', // Cyan accent
    background: '#FFFFFF',
    foreground: '#0A0A0A',
    muted: '#FDF2F8',
  },
  
  // GAMIUS - E-Sport & Gaming
  gamius: {
    primary: '#10B981', // Emerald/green
    secondary: '#6366F1', // Indigo
    accent: '#F59E0B', // Amber accent
    background: '#0F172A', // Dark blue background
    foreground: '#F8FAFC',
    muted: '#1E293B',
  },
  
  // MOUJE-LEELL - Design & Mobilier
  moujeleell: {
    primary: '#6366F1', // Indigo primary
    secondary: '#8B5CF6', // Purple
    accent: '#F59E0B', // Amber accent
    background: '#FFFFFF',
    foreground: '#0A0A0A',
    muted: '#EEF2FF',
  },
};

console.log('🚀 Initializing Shadcn UI with MCP registry for Genius Ad District...');

try {
  // Step 1: Install Shadcn UI with MCP registry
  console.log('\n📦 Installing Shadcn UI with MCP registry...');
  execSync('npx -y shadcn@canary registry:mcp init', { stdio: 'inherit' });
  
  // Step 2: Create theme configuration
  console.log('\n🎨 Creating theme configuration...');
  
  // Create themes directory if it doesn't exist
  const themesDir = path.join(process.cwd(), 'src/styles/themes');
  if (!fs.existsSync(themesDir)) {
    fs.mkdirSync(themesDir, { recursive: true });
  }
  
  // Create theme files for each subsidiary
  Object.entries(subsidiaryThemes).forEach(([name, colors]) => {
    const themeContent = `/**
 * ${name.charAt(0).toUpperCase() + name.slice(1)} theme
 */
export const ${name}Theme = {
  colors: {
    primary: '${colors.primary}',
    secondary: '${colors.secondary}',
    accent: '${colors.accent}',
    background: '${colors.background}',
    foreground: '${colors.foreground}',
    muted: '${colors.muted}',
  },
};
`;
    
    fs.writeFileSync(
      path.join(themesDir, `${name}.ts`),
      themeContent
    );
    console.log(`✅ Created theme for ${name}`);
  });
  
  // Create index file to export all themes
  const indexContent = `/**
 * Theme exports
 */
${Object.keys(subsidiaryThemes)
  .map(name => `import { ${name}Theme } from './${name}';`)
  .join('\n')}

export {
  ${Object.keys(subsidiaryThemes).map(name => `${name}Theme`).join(',\n  ')}
};

// Default theme
export const defaultTheme = geniusTheme;
`;
  
  fs.writeFileSync(
    path.join(themesDir, 'index.ts'),
    indexContent
  );
  
  // Step 3: Create theme provider component
  console.log('\n🧩 Creating ThemeProvider component...');
  
  const themeProviderDir = path.join(process.cwd(), 'src/components/theme');
  if (!fs.existsSync(themeProviderDir)) {
    fs.mkdirSync(themeProviderDir, { recursive: true });
  }
  
  const themeProviderContent = `'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultTheme, geniusTheme, mpsTheme, labrigadTheme, gamiusTheme, moujeleellTheme } from '@/styles/themes';

// Types
type ThemeName = 'genius' | 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
type Theme = typeof defaultTheme;

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

// Create context
const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  themeName: 'genius',
  setTheme: () => null,
});

// Create hooks for using the theme
export const useTheme = () => useContext(ThemeContext);

// Create provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('genius');
  const [theme, setThemeObject] = useState<Theme>(defaultTheme);
  
  // Update theme when themeName changes
  useEffect(() => {
    switch (themeName) {
      case 'mps':
        setThemeObject(mpsTheme);
        break;
      case 'labrigad':
        setThemeObject(labrigadTheme);
        break;
      case 'gamius':
        setThemeObject(gamiusTheme);
        break;
      case 'moujeleell':
        setThemeObject(moujeleellTheme);
        break;
      default:
        setThemeObject(geniusTheme);
    }
    
    // Apply theme CSS variables to root
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(\`--\${key}\`, value);
    });
    
    // Add theme class to body
    document.body.className = \`theme-\${themeName}\`;
    
  }, [themeName, theme]);
  
  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeName,
        setTheme: setThemeName,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
`;
  
  fs.writeFileSync(
    path.join(themeProviderDir, 'theme-provider.tsx'),
    themeProviderContent
  );
  
  const themeIndexContent = `export * from './theme-provider';
`;
  
  fs.writeFileSync(
    path.join(themeProviderDir, 'index.tsx'),
    themeIndexContent
  );
  
  // Step 4: Install commonly used Shadcn components
  console.log('\n🧱 Installing commonly used Shadcn components...');
  
  const components = [
    'button',
    'card',
    'input',
    'typography',
    'form',
    'select',
    'checkbox',
    'dropdown-menu',
    'navigation-menu',
    'sheet',
    'tabs',
    'toast',
    'accordion',
    'dialog',
  ];
  
  components.forEach(component => {
    try {
      console.log(`Installing ${component}...`);
      execSync(`npx shadcn@canary registry:mcp add ${component}`, { stdio: 'inherit' });
    } catch (err) {
      console.error(`Error installing ${component}:`, err);
    }
  });
  
  console.log('\n✅ Shadcn UI initialization completed successfully!');
  console.log('\n📚 Next steps:');
  console.log('1. Wrap your app with the ThemeProvider in src/app/layout.tsx');
  console.log('2. Begin migrating existing components to use Shadcn components');
  console.log('3. Use the useTheme() hook to access the current theme in your components');
  
} catch (error) {
  console.error('\n❌ Error initializing Shadcn UI:', error);
  process.exit(1);
} 