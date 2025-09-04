'use client';

import React, { Suspense } from 'react';
import { Typography } from '@/components/atoms/Typography';
import ResponsiveContainer from '@/components/atoms/ResponsiveContainer';
import SkipNavigation from '@/components/atoms/SkipNavigation';

export default function UIShowcasePage() {
  return (
    <>
      <SkipNavigation />
      <main id="main-content" className="pb-20">
        <ResponsiveContainer>
          <div className="my-8">
            <Typography variant="h1" className="mb-4">UI Showcase with Shadcn</Typography>
            <Typography variant="body" className="mb-8">
              This page demonstrates the unified UI system using Shadcn components with theme variations for each subsidiary.
            </Typography>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6">
              <Typography variant="h2" className="mb-4">Theme Installation</Typography>
              <Typography variant="body" className="mb-2">
                Install Shadcn UI with the MCP registry using:
              </Typography>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
                <code>npx -y shadcn@canary registry:mcp</code>
              </pre>
              
              <Typography variant="body" className="mb-2">
                Then run the initialization script:
              </Typography>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>node src/scripts/initialize-shadcn.js</code>
              </pre>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <Typography variant="h2" className="mb-2">Shadcn UI Components</Typography>
                <Typography variant="body">
                  Select different subsidiary themes to see how components adapt while maintaining consistent UI patterns.
                </Typography>
              </div>
              
              <div className="p-6">
                <Suspense fallback={<div>Loading theme preview...</div>}>
                  {/* 
                    We can't directly import the ThemePreview component here because it depends on
                    the theme provider and Shadcn components that aren't actually installed yet.
                    
                    In a real implementation, this would be:
                    <ThemePreview />
                    
                    For now, we'll show a placeholder message.
                  */}
                  <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
                    <Typography variant="h3" className="mb-4">Theme Preview Placeholder</Typography>
                    <Typography variant="body" className="mb-4">
                      After installing Shadcn UI and the theme system, the ThemePreview component will be displayed here.
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
                      {['genius', 'mps', 'labrigad', 'gamius', 'moujeleell'].map(theme => (
                        <div 
                          key={theme}
                          className="h-24 rounded-lg flex items-center justify-center font-medium capitalize"
                          style={{
                            backgroundColor: 
                              theme === 'genius' ? '#FF0050' :
                              theme === 'mps' ? '#3B82F6' :
                              theme === 'labrigad' ? '#EC4899' :
                              theme === 'gamius' ? '#10B981' :
                              '#6366F1', // moujeleell
                            color: '#FFFFFF'
                          }}
                        >
                          {theme}
                        </div>
                      ))}
                    </div>
                  </div>
                </Suspense>
              </div>
            </div>
            
            <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <Typography variant="h2" className="mb-4">Next Steps for Implementation</Typography>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                <li>Run the Shadcn installation command</li>
                <li>Execute the initialization script</li>
                <li>Wrap your app with the ThemeProvider in src/app/layout.tsx</li>
                <li>Begin migrating existing components to use Shadcn components</li>
                <li>Use the useTheme() hook to access the current theme in your components</li>
              </ol>
              <Typography variant="body" className="text-sm text-gray-500 mt-4">
                This approach ensures a unified UI while preserving each subsidiary's unique brand identity.
              </Typography>
            </div>
          </div>
        </ResponsiveContainer>
      </main>
    </>
  );
} 