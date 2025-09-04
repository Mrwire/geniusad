'use client';

import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import SkipNavigation from '@/components/atoms/SkipNavigation';

interface ChecklistItem {
  id: string;
  category: string;
  description: string;
  guidelines: string[];
  resources?: {
    title: string;
    url: string;
  }[];
}

export default function AccessibilityChecklist() {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  
  const checklistItems: ChecklistItem[] = [
    {
      id: 'keyboard',
      category: 'Keyboard Navigation',
      description: 'Ensure all interactive elements can be accessed and operated using a keyboard.',
      guidelines: [
        'All interactive elements must be focusable and operable with a keyboard',
        'Visible focus indicators must be provided for all interactive elements',
        'Logical tab order should follow the visual layout',
        'Keyboard traps must be avoided',
        'Custom keyboard shortcuts should not conflict with browser or assistive technology shortcuts'
      ],
      resources: [
        {
          title: 'WebAIM: Keyboard Accessibility',
          url: 'https://webaim.org/techniques/keyboard/'
        }
      ]
    },
    {
      id: 'screenreader',
      category: 'Screen Reader Support',
      description: 'Optimize content for screen readers to ensure users with visual impairments can access information.',
      guidelines: [
        'Use semantic HTML elements (headings, lists, buttons, etc.) appropriately',
        'Provide descriptive alt text for all informative images',
        'Implement ARIA roles, states, and properties where native HTML semantics are insufficient',
        'Ensure form inputs have associated labels',
        'Test with actual screen readers (NVDA, JAWS, VoiceOver)'
      ],
      resources: [
        {
          title: 'WebAIM: Screen Reader Testing',
          url: 'https://webaim.org/articles/screenreader_testing/'
        }
      ]
    },
    {
      id: 'contrast',
      category: 'Color and Contrast',
      description: 'Ensure sufficient color contrast for text and interactive elements to improve readability.',
      guidelines: [
        'Text should have a contrast ratio of at least 4.5:1 (or 3:1 for large text)',
        'Do not rely on color alone to convey information',
        'UI components and graphical objects should have a contrast ratio of at least 3:1',
        'Provide visual cues in addition to color differences',
        'Ensure text is readable when displayed on background images'
      ],
      resources: [
        {
          title: 'WebAIM: Contrast Checker',
          url: 'https://webaim.org/resources/contrastchecker/'
        }
      ]
    },
    {
      id: 'media',
      category: 'Media Accessibility',
      description: 'Make audio and video content accessible through captions, transcripts, and audio descriptions.',
      guidelines: [
        'Provide captions for all video content',
        'Offer transcripts for audio and video content',
        'Include audio descriptions for videos when visual information is important',
        'Ensure media players have accessible controls',
        'Avoid auto-playing media with sound'
      ],
      resources: [
        {
          title: 'WebAIM: Captions, Transcripts, and Audio Descriptions',
          url: 'https://webaim.org/techniques/captions/'
        }
      ]
    },
    {
      id: 'responsiveness',
      category: 'Responsiveness and Adaptability',
      description: 'Design interfaces that adapt to different devices, screen sizes, and user preferences.',
      guidelines: [
        'Ensure content is accessible at different viewport sizes',
        'Support text resizing up to 200% without loss of content or functionality',
        'Design for touchscreen devices with appropriate touch targets (at least 44×44 pixels)',
        'Support device orientation changes',
        'Respect user preferences for reduced motion and color schemes'
      ]
    },
    {
      id: 'forms',
      category: 'Forms and Input',
      description: 'Create accessible forms that are easy to understand and use with assistive technologies.',
      guidelines: [
        'Provide clear labels for all form controls',
        'Group related form elements with fieldset and legend',
        'Include clear error messages and validation',
        'Ensure error messages are programmatically associated with form controls',
        'Provide sufficient time to complete forms and allow users to save progress'
      ]
    },
    {
      id: 'content',
      category: 'Content Structure',
      description: 'Structure content logically with clear headings, lists, and other semantic elements.',
      guidelines: [
        'Use headings (h1-h6) to create a logical document outline',
        'Break content into manageable chunks with clear sections',
        'Use lists for groups of related items',
        'Provide a "Skip to main content" link at the top of the page',
        'Ensure all interactive elements have descriptive text that indicates their purpose'
      ]
    }
  ];
  
  const filteredItems = activeCategory 
    ? checklistItems.filter(item => item.category === activeCategory)
    : checklistItems;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <SkipNavigation />
      
      <main id="main-content" className="space-y-8">
        <section className="space-y-4">
          <Typography variant="h1">Accessibility Checklist</Typography>
          <Typography variant="body" className="max-w-3xl">
            This checklist serves as a guide for developers and content creators to ensure all features 
            meet WCAG 2.1 Level AA standards. Use this as a reference when building new features or 
            updating existing content.
          </Typography>
        </section>
        
        <section className="py-4">
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              onClick={() => setActiveCategory(null)}
              variant={!activeCategory ? "primary" : "secondary"}
              className="mr-2"
            >
              All Categories
            </Button>
            {[...new Set(checklistItems.map(item => item.category))].map(category => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "primary" : "secondary"}
                className="mr-2"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="space-y-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-6 shadow-sm">
                <Typography variant="h2" className="mb-2">{item.category}</Typography>
                <Typography variant="body" className="mb-4">{item.description}</Typography>
                
                <Typography variant="h3" className="text-lg font-semibold mb-2">Guidelines:</Typography>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  {item.guidelines.map((guideline, index) => (
                    <li key={index} className="text-gray-700">
                      <Typography variant="body">{guideline}</Typography>
                    </li>
                  ))}
                </ul>
                
                {item.resources && item.resources.length > 0 && (
                  <>
                    <Typography variant="h3" className="text-lg font-semibold mb-2">Resources:</Typography>
                    <ul className="list-disc pl-6">
                      {item.resources.map((resource, index) => (
                        <li key={index}>
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
        
        <section className="mt-8 p-6 bg-gray-50 rounded-lg">
          <Typography variant="h2" className="mb-4">Final Testing Recommendations</Typography>
          <Typography variant="body" className="mb-4">
            Before deploying new features or content, we recommend running through the following tests:
          </Typography>
          <ol className="list-decimal pl-6 space-y-2">
            <li><Typography variant="body">Keyboard navigation: Test all functionality using only a keyboard</Typography></li>
            <li><Typography variant="body">Screen reader testing: Verify content is properly announced by screen readers</Typography></li>
            <li><Typography variant="body">Color contrast: Check text and UI element contrast ratios</Typography></li>
            <li><Typography variant="body">Responsive testing: Verify content at different viewport sizes</Typography></li>
            <li><Typography variant="body">Reduced motion: Test with prefers-reduced-motion enabled</Typography></li>
            <li><Typography variant="body">Form validation: Test form inputs with assistive technologies</Typography></li>
          </ol>
        </section>
      </main>
    </div>
  );
} 