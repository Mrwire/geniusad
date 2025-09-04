'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactNode {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-black text-white">
          <div className="p-6 max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="mb-6">
              We're sorry, but there was an error loading the application.
            </p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-100 transition"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
} 