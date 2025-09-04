'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
          <h2 className="text-xl font-bold mb-4">Une erreur est survenue</h2>
          <p className="mb-6">Nous nous excusons pour ce problème</p>
          <button
            className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors"
            onClick={() => reset()}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
} 