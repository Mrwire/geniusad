'use client';

import React from 'react';

export default function Loading(): React.ReactNode {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="text-center">
        <div className="inline-block relative w-20 h-20">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-white rounded-full opacity-30"></div>
          <div className="absolute top-0 left-0 w-full h-full border-t-4 border-white rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-white font-medium">Loading Gallery...</p>
      </div>
    </div>
  );
} 