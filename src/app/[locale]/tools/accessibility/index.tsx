'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Typography } from '@/components/atoms/Typography';
import { Link } from '@/navigation';
import SkipNavigation from '@/components/atoms/SkipNavigation';

interface ToolCard {
  id: string;
  title: string;
  description: string;
  href: string;
}

export default function AccessibilityToolsIndex() {
  const t = useTranslations('accessibility');
  
  const tools: ToolCard[] = [
    {
      id: 'showcase',
      title: 'Accessibility Component Showcase',
      description: 'Explore our accessible media components that ensure content is perceivable and operable for all users.',
      href: '/tools/accessibility/page'
    },
    {
      id: 'test',
      title: 'Accessibility Test Page',
      description: 'Test our accessible components and features to verify they meet WCAG 2.1 Level AA standards.',
      href: '/tools/accessibility/test'
    },
    {
      id: 'checklist',
      title: 'Accessibility Checklist',
      description: 'A comprehensive checklist for developers and content creators to ensure accessibility compliance.',
      href: '/tools/accessibility/checklist'
    },
    {
      id: 'documentation',
      title: 'Accessibility Documentation',
      description: 'Documentation of our accessibility features and implementation details.',
      href: '/tools/accessibility/documentation'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <SkipNavigation />
      
      <main id="main-content" className="space-y-8">
        <section className="text-center max-w-3xl mx-auto">
          <Typography variant="h1" className="mb-4">Accessibility Tools</Typography>
          <Typography variant="body" className="mb-8">
            These tools help us ensure our website meets WCAG 2.1 Level AA accessibility standards,
            making our content perceivable, operable, understandable, and robust for all users.
          </Typography>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.id}
              href={tool.href}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
            >
              <Typography variant="h2" className="mb-2">{tool.title}</Typography>
              <Typography variant="body">{tool.description}</Typography>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
} 