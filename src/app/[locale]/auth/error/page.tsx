import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface PageProps {
  params: {
    locale: string;
  };
  searchParams?: {
    error?: string;
  };
}

export default async function AuthErrorPage({ params: { locale }, searchParams }: PageProps) {
  const t = await getTranslations('clientPortal.error');
  
  // Get error message based on error code
  const errorCode = searchParams?.error || 'default';
  let title = t('defaultTitle');
  let message = t('defaultMessage');
  
  // Map error codes to messages
  switch (errorCode) {
    case 'CredentialsSignin':
      title = t('invalidCredentialsTitle');
      message = t('invalidCredentialsMessage');
      break;
    case 'AccessDenied':
      title = t('accessDeniedTitle');
      message = t('accessDeniedMessage');
      break;
    case 'SessionRequired':
      title = t('sessionRequiredTitle');
      message = t('sessionRequiredMessage');
      break;
    default:
      break;
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
        <div className="mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-red-100">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-12 w-12 text-red-600" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        <div>
          <Typography variant="h1" className="text-3xl font-bold text-gray-900">
            {title}
          </Typography>
          <Typography variant="body" className="mt-2 text-gray-600">
            {message}
          </Typography>
        </div>
        
        <div className="flex flex-col space-y-4">
          <Link href={`/${locale}/auth/login`} className="w-full">
            <Button
              variant="primary"
              className="w-full justify-center"
            >
              {t('tryAgain')}
            </Button>
          </Link>
          
          <Link href={`/${locale}`} className="w-full">
            <Button
              variant="secondary"
              className="w-full justify-center"
            >
              {t('backToHome')}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
} 