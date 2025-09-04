'use client';

import React from 'react';
import { Button, Typography, Card } from '@/components/atoms/shadcn-adapters';
import ResponsiveContainer from '@/components/atoms/ResponsiveContainer';
import SkipNavigation from '@/components/atoms/SkipNavigation';

/**
 * Example page that demonstrates the use of adapter components with themes
 * 
 * This page will automatically use the current theme from the ThemeProvider.
 * When placed under a specific subsidiary path like /subsidiaries/mps/,
 * it will adopt the MPS theme.
 */
export default function ExampleThemePage() {
  return (
    <>
      <SkipNavigation />
      <main id="main-content">
        <ResponsiveContainer>
          <div className="py-12">
            <div className="mb-10">
              <Typography variant="h1" className="mb-4">
                Theme System Example
              </Typography>
              <Typography variant="lead" className="max-w-3xl">
                This page demonstrates Shadcn UI components with our theme system. 
                When you view this page under different subsidiaries, it will automatically
                adopt their respective themes.
              </Typography>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <Typography variant="h2" className="mb-6">
                  UI Components
                </Typography>
                <Card 
                  variant="default"
                  title="Card Component"
                  description="This is our adapter card component"
                  className="mb-6"
                  footer={<Button variant="primary">Action</Button>}
                >
                  <Typography variant="body">
                    This card uses our adapter component which wraps Shadcn Card components.
                    It will reflect the current theme colors automatically.
                  </Typography>
                </Card>
                
                <div className="bg-muted rounded-lg p-6">
                  <Typography variant="h3" className="mb-4">
                    Button Variants
                  </Typography>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="success">Success</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <Typography variant="h2" className="mb-6">
                  Typography
                </Typography>
                <div className="bg-card rounded-lg p-6 border">
                  <Typography variant="h1">Heading 1</Typography>
                  <Typography variant="h2">Heading 2</Typography>
                  <Typography variant="h3">Heading 3</Typography>
                  <Typography variant="h4">Heading 4</Typography>
                  <Typography variant="h5">Heading 5</Typography>
                  <Typography variant="h6">Heading 6</Typography>
                  <Typography variant="body">
                    This is a body text paragraph that uses the theme's foreground color.
                  </Typography>
                  <Typography variant="lead">
                    This is a lead paragraph with slightly larger text.
                  </Typography>
                  <Typography variant="large">
                    Large text element for emphasis.
                  </Typography>
                  <Typography variant="small">
                    Small text for secondary information.
                  </Typography>
                  <Typography variant="muted">
                    Muted text for less important content.
                  </Typography>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border p-6 mb-8">
              <Typography variant="h3" className="mb-4">
                Theme Color Samples
              </Typography>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-md bg-primary p-4 text-primary-foreground">
                  <Typography variant="label">Primary</Typography>
                </div>
                <div className="rounded-md bg-secondary p-4 text-secondary-foreground">
                  <Typography variant="label">Secondary</Typography>
                </div>
                <div className="rounded-md bg-accent p-4 text-accent-foreground">
                  <Typography variant="label">Accent</Typography>
                </div>
                <div className="rounded-md bg-muted p-4 text-muted-foreground">
                  <Typography variant="label">Muted</Typography>
                </div>
              </div>
            </div>
            
            <Typography variant="body">
              Note: This is a demonstration of the Shadcn UI adapter components. To make this work:
            </Typography>
            <ol className="list-decimal list-inside my-4 space-y-2">
              <li>Install Shadcn UI with MCP registry using <code className="bg-muted px-1 py-0.5 rounded">npx -y shadcn@canary registry:mcp</code></li>
              <li>Run the initialization script <code className="bg-muted px-1 py-0.5 rounded">node src/scripts/initialize-shadcn.js</code></li>
              <li>Wrap your app with the ThemeProvider in the root layout</li>
            </ol>
          </div>
        </ResponsiveContainer>
      </main>
    </>
  );
} 