'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export function useLocaleSwitcher() {
  const router = useRouter();
  const { locale = 'fr' } = useParams();
  const [currentLocale, setCurrentLocale] = useState<string>(locale as string);

  useEffect(() => {
    setCurrentLocale(locale as string);
  }, [locale]);

  const switchLocale = (newLocale: string) => {
    if (newLocale === currentLocale) return;

    const currentPath = window.location.pathname;
    // Remove current locale from path
    let newPath = currentPath;
    
    if (currentPath.startsWith(`/${currentLocale}`)) {
      newPath = currentPath.replace(`/${currentLocale}`, '');
    }
    
    // Add new locale to path
    newPath = `/${newLocale}${newPath}`;
    
    // Navigate to new localized path
    router.push(newPath);
    setCurrentLocale(newLocale);
  };

  return {
    currentLocale,
    switchLocale,
  };
}

export default useLocaleSwitcher;
