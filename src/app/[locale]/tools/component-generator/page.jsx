'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';

// Import dynamique du composant ModernComponentGenerator
const ModernComponentGenerator = dynamic(
  () => import('@/components/mcp/ModernComponentGenerator'),
  { 
    loading: () => <ComponentLoaderSkeleton />,
    ssr: false // Désactive le SSR car le composant utilise des API côté client uniquement
  }
);

// Skeleton loader pendant le chargement du composant
function ComponentLoaderSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-5xl mx-auto my-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-2/3 mb-6"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-full"></div>
        </div>

        <div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-md p-3">
              <div className="h-20 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="border border-gray-200 rounded-md p-3">
              <div className="h-20 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComponentGeneratorPage() {
  const t = useTranslations('Tools.ComponentGenerator');

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
          <div className="mt-4 inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-sm">
            <span className="mr-2 rounded-full bg-black h-2 w-2"></span>
            <span>
              {t('poweredBy')} <b>React Hook Form + Zod</b> <span className="text-xs text-gray-500">avec validation de schéma</span>
            </span>
          </div>
        </header>

        <Suspense fallback={<ComponentLoaderSkeleton />}>
          <ModernComponentGenerator />
        </Suspense>

        <div className="mt-16 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-heading font-semibold mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-gray-600 mb-6">
            {t('howItWorks.description')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold mb-3">1</div>
              <h3 className="font-heading font-semibold text-lg mb-2">{t('howItWorks.step1.title')}</h3>
              <p className="text-gray-600 text-sm">{t('howItWorks.step1.description')}</p>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold mb-3">2</div>
              <h3 className="font-heading font-semibold text-lg mb-2">{t('howItWorks.step2.title')}</h3>
              <p className="text-gray-600 text-sm">{t('howItWorks.step2.description')}</p>
            </div>
            
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold mb-3">3</div>
              <h3 className="font-heading font-semibold text-lg mb-2">{t('howItWorks.step3.title')}</h3>
              <p className="text-gray-600 text-sm">{t('howItWorks.step3.description')}</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <a 
              href="https://react-hook-form.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:underline inline-flex items-center font-medium"
            >
              {t('learnMore')}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 