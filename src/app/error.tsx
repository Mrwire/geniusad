'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLocale } from '@/i18n/config';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactNode {
  const router = useRouter();

  useEffect(() => {
    // Log the error to the console
    console.error('Root error occurred:', error);

    // Auto-redirect to default locale after an error
    const redirectTimeout = setTimeout(() => {
      router.push(`/${defaultLocale}`);
    }, 2000);

    return () => clearTimeout(redirectTimeout);
  }, [error, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="p-6 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="mb-4">
          We're sorry, but there was an error loading the page.
        </p>
        <p className="mb-6 text-gray-400">
          You will be redirected to the homepage shortly...
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => router.push(`/${defaultLocale}`)}
            className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-100 transition"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => reset()}
            className="px-4 py-2 border border-white text-white font-bold rounded hover:bg-white/10 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
} 