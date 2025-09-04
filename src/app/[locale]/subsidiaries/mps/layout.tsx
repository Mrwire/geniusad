'use client';

import React, { useEffect } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';

interface MPSLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout for the MPS subsidiary section
 * Automatically sets the MPS theme when entering this section
 * and resets back to the default theme when leaving
 */
export default function MPSLayout({ children }: MPSLayoutProps) {
  const { setTheme } = useTheme();
  
  useEffect(() => {
    // Set MPS theme when the component mounts
    setTheme('mps');
    
    // Reset to default theme when component unmounts
    return () => {
      setTheme('genius');
    };
  }, [setTheme]);
  
  return <>{children}</>;
} 