'use client';

import React, { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): React.ReactNode {
  useEffect(() => {
    // Log the error to console for debugging
    console.error('Gallery error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Gallery Error</h2>
        <p className="mb-6">
          We encountered an issue loading the gallery. This might be due to image loading problems or browser compatibility issues.
        </p>
        <div className="space-y-4">
          <button
            onClick={reset}
            className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
          <p className="text-sm opacity-70">
            Tip: Disable browser extensions if you're experiencing persistent errors.
          </p>
        </div>
      </div>
    </div>
  );
} 