'use client';

import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import ResponsiveContainer from '@/components/atoms/ResponsiveContainer';
import SkipNavigation from '@/components/atoms/SkipNavigation';
import { Button } from '@/components/atoms/Button';

/**
 * ResponsiveAuditPage checks for common responsive design issues
 */
export default function ResponsiveAuditPage() {
  return (
    <>
      <SkipNavigation />
      <main id="main-content" className="pb-20">
        <ResponsiveContainer>
          <div className="my-8">
            <Typography variant="h1" className="mb-4">Responsive Design Audit</Typography>
            <Typography variant="body" className="mb-8">
              This tool helps you identify potential responsive design issues in your Genius Ad District website.
              It can detect problems with layout, images, typography, and more.
            </Typography>
            
            <section className="mb-10 bg-gray-50 p-6 rounded-lg">
              <Typography variant="h2" className="mb-4">Run Audit</Typography>
              <Typography variant="body" className="mb-4">
                Click the button below to scan your site for responsive design issues. The tool will check the current page and report any problems it finds.
              </Typography>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="primary"
                  onClick={() => {
                    // In a real implementation, this would trigger a site scan
                    window.alert('Audit would run here. This is just a demo.');
                  }}
                >
                  Run Audit Now
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    // In a real implementation, this would generate a report
                    window.alert('Full site audit would run here. This is just a demo.');
                  }}
                >
                  Audit Entire Site
                </Button>
              </div>
            </section>
            
            <section className="mb-10">
              <Typography variant="h2" className="mb-4">Common Responsive Issues</Typography>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-2 text-red-600">Overflow Issues</Typography>
                  <Typography variant="body" className="mb-2">
                    Content that extends beyond the viewport can create horizontal scrollbars and poor mobile experiences.
                  </Typography>
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <Typography variant="label" className="font-mono text-sm">
                      Fix: Add <code className="bg-gray-100 px-1">max-width: 100%</code> and <code className="bg-gray-100 px-1">overflow-x: hidden</code> to problematic containers.
                    </Typography>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-2 text-red-600">Touch Targets Too Small</Typography>
                  <Typography variant="body" className="mb-2">
                    Interactive elements like buttons and links should be at least 44×44px on mobile to ensure they're easy to tap.
                  </Typography>
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <Typography variant="label" className="font-mono text-sm">
                      Fix: Use min-width/height or padding to ensure adequate touch target size.
                    </Typography>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-2 text-red-600">Non-Responsive Images</Typography>
                  <Typography variant="body" className="mb-2">
                    Images without proper responsive attributes can overflow containers or load unnecessarily large files on mobile.
                  </Typography>
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <Typography variant="label" className="font-mono text-sm">
                      Fix: Use the <code className="bg-gray-100 px-1">ResponsiveImage</code> component with appropriate settings.
                    </Typography>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-2 text-red-600">Fixed Positioning Issues</Typography>
                  <Typography variant="body" className="mb-2">
                    Elements with fixed positioning can cause layout problems on mobile, especially with virtual keyboards.
                  </Typography>
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <Typography variant="label" className="font-mono text-sm">
                      Fix: Use sticky positioning with fallbacks or adjust behavior on smaller screens.
                    </Typography>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-2 text-red-600">Font Size Too Small</Typography>
                  <Typography variant="body" className="mb-2">
                    Text smaller than 16px can be difficult to read on mobile devices, causing accessibility issues.
                  </Typography>
                  <div className="mt-4 bg-gray-50 p-4 rounded-md">
                    <Typography variant="label" className="font-mono text-sm">
                      Fix: Use relative units (rem/em) and ensure minimum font sizes on mobile.
                    </Typography>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="mb-10">
              <Typography variant="h2" className="mb-4">Responsive Best Practices</Typography>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-2 text-green-600">Mobile-First Approach</Typography>
                  <Typography variant="body">
                    Design for mobile first, then enhance for larger screens. This ensures core functionality works on all devices.
                  </Typography>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-2 text-green-600">Fluid Typography</Typography>
                  <Typography variant="body">
                    Use viewport units and clamp() for text that scales smoothly between screen sizes.
                  </Typography>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-2 text-green-600">Breakpoint Consistency</Typography>
                  <Typography variant="body">
                    Use consistent breakpoints throughout your application to maintain predictable layouts.
                  </Typography>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-2 text-green-600">Responsive Images</Typography>
                  <Typography variant="body">
                    Use srcset and sizes attributes to serve different image sizes to different devices.
                  </Typography>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-2 text-green-600">Touch-Friendly UI</Typography>
                  <Typography variant="body">
                    Ensure all interactive elements are large enough for touch (min 44×44px) with adequate spacing.
                  </Typography>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-2 text-green-600">Content Prioritization</Typography>
                  <Typography variant="body">
                    Reorganize content on smaller screens to prioritize the most important information.
                  </Typography>
                </div>
              </div>
            </section>
          </div>
        </ResponsiveContainer>
      </main>
    </>
  );
} 