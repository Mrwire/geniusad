'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText as SanityPortableText } from '@portabletext/react';
import { Typography } from '@/components/atoms/Typography';

interface PortableTextProps {
  value: any;
  className?: string;
}

export const PortableText: React.FC<PortableTextProps> = ({ value, className = '' }) => {
  if (!value) {
    return null;
  }

  const components = {
    types: {
      image: ({ value }: { value: any }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <div className="my-8 relative rounded-lg overflow-hidden">
            <Image
              src={value}
              alt={value.alt || ''}
              width={800}
              height={value.height || 600}
              className="w-full h-auto object-contain"
            />
            {value.caption && (
              <div className="mt-2 text-sm text-gray-500 italic">
                {value.caption}
              </div>
            )}
          </div>
        );
      },
      code: ({ value }: { value: any }) => {
        return (
          <pre className="bg-gray-800 text-gray-100 p-4 my-6 rounded-lg overflow-x-auto">
            {value.filename && (
              <div className="text-xs text-gray-400 mb-2 pb-2 border-b border-gray-700">
                {value.filename}
              </div>
            )}
            <code className="text-sm font-mono">{value.code}</code>
          </pre>
        );
      },
    },
    block: {
      h1: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h1" className="mt-8 mb-4">
          {children}
        </Typography>
      ),
      h2: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h2" className="mt-8 mb-4">
          {children}
        </Typography>
      ),
      h3: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h3" className="mt-6 mb-3">
          {children}
        </Typography>
      ),
      h4: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h4" className="mt-6 mb-2">
          {children}
        </Typography>
      ),
      h5: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h5" className="mt-4 mb-2">
          {children}
        </Typography>
      ),
      h6: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h6" className="mt-4 mb-2">
          {children}
        </Typography>
      ),
      normal: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="body" className="mb-4">
          {children}
        </Typography>
      ),
      blockquote: ({ children }: { children: React.ReactNode }) => (
        <blockquote className="border-l-4 border-silver pl-4 my-6 italic text-gray-600">
          <Typography variant="body">
            {children}
          </Typography>
        </blockquote>
      ),
    },
    marks: {
      link: ({ value, children }: { value: any; children: React.ReactNode }) => {
        const target = (value?.blank || value?.href?.startsWith('http')) ? '_blank' : undefined;
        return (
          <Link 
            href={value?.href || '#'} 
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            className="text-silver-dark hover:underline transition-colors"
          >
            {children}
          </Link>
        );
      },
    },
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => (
        <ul className="list-disc ml-6 my-4 space-y-1">{children}</ul>
      ),
      number: ({ children }: { children: React.ReactNode }) => (
        <ol className="list-decimal ml-6 my-4 space-y-1">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: { children: React.ReactNode }) => (
        <li className="mb-1">{children}</li>
      ),
      number: ({ children }: { children: React.ReactNode }) => (
        <li className="mb-1">{children}</li>
      ),
    },
  };

  return (
    <div className={className}>
      <SanityPortableText value={value} components={components} />
    </div>
  );
};

export default PortableText; 