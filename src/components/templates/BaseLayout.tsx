'use client';

import React from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { usePathname, useParams } from 'next/navigation';
import { ModernNavbar } from '@/components/ui/navbar-demo';
import ModernFooter from '@/components/organisms/ModernFooter';

interface BaseLayoutProps {
  children: React.ReactNode;
  includeFooter?: boolean;
  includeHeader?: boolean;
}

export default function BaseLayout({
  children,
  includeFooter = true,
  includeHeader = true,
}: BaseLayoutProps) {
  const { themeName } = useTheme();
  const pathname = usePathname();
  const params = useParams();
  const locale = params && typeof params === 'object' && 'locale' in params ? params.locale as string : 'fr';
  
  // Désactiver automatiquement le header sur modern-ui-preview et sur la page d'accueil
  const isSpecialPage = pathname?.includes('/modern-ui-preview') || pathname === `/${locale}` || pathname === `/${locale}/`;
  const shouldShowHeader = includeHeader && !isSpecialPage;

  return (
    <div className={`min-h-screen flex flex-col ${themeName ? `theme-${themeName}` : ''}`}>
      {shouldShowHeader && <ModernNavbar />}
      <main className={`flex-1 ${shouldShowHeader ? 'pt-20' : 'pt-0'}`}>{children}</main>
      {includeFooter && <ModernFooter />}
    </div>
  );
}