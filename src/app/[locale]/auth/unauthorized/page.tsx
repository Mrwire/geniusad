import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { getCurrentUser } from '@/lib/auth-helpers';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function UnauthorizedPage({ params: { locale } }: PageProps) {
  const t = await getTranslations('clientPortal.unauthorized');
  const user = await getCurrentUser();
  
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
        <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-yellow-100">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-yellow-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
            />
          </svg>
        </div>
        
        <div>
          <Typography variant="h1" className="text-3xl font-bold text-gray-900">
            {t('title')}
          </Typography>
          <Typography variant="body" className="mt-2 text-gray-600">
            {t('message')}
          </Typography>
        </div>
        
        <div className="flex flex-col space-y-4">
          {user ? (
            <Link href={`/${locale}/client-portal/dashboard`} className="w-full">
              <Button
                variant="primary"
                className="w-full justify-center"
              >
                {t('dashboard')}
              </Button>
            </Link>
          ) : (
            <Link href={`/${locale}/auth/login`} className="w-full">
              <Button
                variant="primary"
                className="w-full justify-center"
              >
                {t('login')}
              </Button>
            </Link>
          )}
          
          <Link href={`/${locale}`} className="w-full">
            <Button
              variant="secondary"
              className="w-full justify-center"
            >
              {t('backToHome')}
            </Button>
          </Link>
          
          <Link href={`/${locale}/contact`} className="w-full">
            <Button
              variant="tertiary"
              className="w-full justify-center"
            >
              {t('contactSupport')}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
} 