import React from 'react';
import { protectPage } from '@/lib/auth-helpers';
import { getTranslations } from 'next-intl/server';
import ClientSidebar from '@/components/organisms/ClientSidebar';
import { ModernNavbar } from '@/components/ui/navbar-demo';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function ClientPortalLayout({ children, params: { locale } }: LayoutProps) {
  // Protect this route - will redirect if not logged in
  const userSession = await protectPage();
  
  // Créer un objet user avec des valeurs par défaut pour les propriétés qui peuvent être nulles
  const user = {
    id: userSession.id,
    name: userSession.name || 'Client', // Valeur par défaut pour name
    email: userSession.email || 'client@example.com', // Valeur par défaut pour email
    role: userSession.role,
    company: userSession.company,
    profileImage: userSession.profileImage
  };
  
  const t = await getTranslations('clientPortal');

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <ClientSidebar 
        user={user}
        locale={locale}
        translations={{
          dashboard: t('dashboard.dashboard'),
          projects: t('projects.projects'),
          assets: t('dashboard.assets'),
          messages: t('dashboard.messages'),
          approvals: t('dashboard.approvals'),
          meetings: t('dashboard.meetings'),
          settings: t('dashboard.settings'),
          signOut: t('dashboard.signOut'),
        }}
      />

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Header */}
        <ModernNavbar currentFiliale="genius" />

        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 