import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { ResponsiveTypography } from '@/components/atoms/ResponsiveTypography';
import ResponsiveGrid from '@/components/atoms/ResponsiveGrid';
import ResponsiveContainer from '@/components/atoms/ResponsiveContainer';
import ResponsiveHelper from '@/components/atoms/ResponsiveHelper';
import SkipNavigation from '@/components/atoms/SkipNavigation';
import { Button } from '@/components/atoms/Button';

/**
 * Showcase page for responsive design components
 */
export default function ResponsiveShowcasePage() {
  // Sample nav items for demo
  const mockNavItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ];

  // Sample card for grid demo
  const Card = ({ number }: { number: number }) => (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Card {number}</h3>
      <p>This is a sample card component to demonstrate responsive layouts.</p>
    </div>
  );

  return (
    <>
      <SkipNavigation />
      <ResponsiveHelper />
      
      <main id="main-content" className="pb-20">
        <ResponsiveContainer>
          <div className="my-8">
            <Typography variant="h1" className="mb-4">Responsive Design Components</Typography>
            <Typography variant="body" className="mb-8">
              This page showcases the responsive components available in the Genius Ad District design system. 
              Resize your browser window to see how these components adapt to different screen sizes.
            </Typography>
            
            <section className="mb-12 border-b pb-10">
              <Typography variant="h2" className="mb-4">ResponsiveContainer</Typography>
              <Typography variant="body" className="mb-4">
                The ResponsiveContainer component provides consistent container behavior across breakpoints.
                It automatically adjusts padding and max-width based on screen size.
              </Typography>
              
              <div className="space-y-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">Default Container:</p>
                  <ResponsiveContainer className="bg-white border border-gray-200 rounded-md p-4">
                    <div className="h-20 flex items-center justify-center border border-dashed border-gray-300 rounded">
                      <Typography>Default Container Width</Typography>
                    </div>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">Narrow Container:</p>
                  <ResponsiveContainer narrow className="bg-white border border-gray-200 rounded-md p-4">
                    <div className="h-20 flex items-center justify-center border border-dashed border-gray-300 rounded">
                      <Typography>Narrow Container Width</Typography>
                    </div>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">Wide Container:</p>
                  <ResponsiveContainer wide className="bg-white border border-gray-200 rounded-md p-4">
                    <div className="h-20 flex items-center justify-center border border-dashed border-gray-300 rounded">
                      <Typography>Wide Container Width</Typography>
                    </div>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
            
            <section className="mb-12 border-b pb-10">
              <Typography variant="h2" className="mb-4">ResponsiveTypography</Typography>
              <Typography variant="body" className="mb-4">
                The ResponsiveTypography component automatically adjusts its size and style based on screen size.
              </Typography>
              
              <div className="space-y-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">Standard Typography:</p>
                  <Typography variant="h1">Standard H1 Heading</Typography>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">Responsive Typography (different variants by breakpoint):</p>
                  <ResponsiveTypography 
                    mobileVariant="h3" 
                    tabletVariant="h2" 
                    desktopVariant="h1"
                  >
                    Responsive Heading (h3 → h2 → h1)
                  </ResponsiveTypography>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">Fluid Typography (scales smoothly):</p>
                  <ResponsiveTypography variant="h2" fluid>
                    Fluid Typography Example
                  </ResponsiveTypography>
                </div>
              </div>
            </section>
            
            <section className="mb-12 border-b pb-10">
              <Typography variant="h2" className="mb-4">ResponsiveGrid</Typography>
              <Typography variant="body" className="mb-4">
                The ResponsiveGrid component provides a grid layout that adapts to different screen sizes.
              </Typography>
              
              <div className="space-y-8">
                <div>
                  <p className="text-gray-500 mb-4">Basic responsive grid (1→2→3→4 columns):</p>
                  <ResponsiveGrid columns={4} gap="md">
                    {[1, 2, 3, 4].map((num) => (
                      <Card key={num} number={num} />
                    ))}
                  </ResponsiveGrid>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-4">Custom columns at each breakpoint:</p>
                  <ResponsiveGrid 
                    columns={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }}
                    gap="lg"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <Card key={num} number={num} />
                    ))}
                  </ResponsiveGrid>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-4">Grid with different gap sizes:</p>
                  <div className="space-y-6">
                    <ResponsiveGrid columns={3} gap="xs">
                      {[1, 2, 3].map((num) => (
                        <Card key={num} number={num} />
                      ))}
                    </ResponsiveGrid>
                    <ResponsiveGrid columns={3} gap="lg">
                      {[4, 5, 6].map((num) => (
                        <Card key={num} number={num} />
                      ))}
                    </ResponsiveGrid>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="mb-12">
              <Typography variant="h2" className="mb-4">Tailwind Responsive Utilities</Typography>
              <Typography variant="body" className="mb-4">
                Examples of custom responsive utilities added to the Tailwind configuration.
              </Typography>
              
              <div className="space-y-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">Responsive fluid text:</p>
                  <p className="responsive-fluid-text">
                    This text uses the responsive-fluid-text utility class to automatically scale based on viewport width.
                    Try resizing your browser to see how it adapts.
                  </p>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">Responsive touch targets:</p>
                  <div className="flex flex-wrap gap-4">
                    <Button 
                      variant="primary"
                      className="responsive-touch-target"
                    >
                      Touch-friendly Button
                    </Button>
                    <div className="responsive-touch-target bg-blue-100 flex items-center justify-center rounded">
                      Touch Area
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-gray-500 mb-2">Responsive visibility:</p>
                  <div className="space-y-2">
                    <div className="responsive-only-xs p-2 bg-red-100 rounded">
                      Visible only on extra small screens (moins de 640px)
                    </div>
                    <div className="responsive-hidden-xs p-2 bg-green-100 rounded">
                      Hidden on extra small screens, visible on larger screens
                    </div>
                    <div className="hidden sm:block md:hidden p-2 bg-blue-100 rounded">
                      Visible only on small screens (640px - 767px)
                    </div>
                    <div className="hidden md:block lg:hidden p-2 bg-purple-100 rounded">
                      Visible only on medium screens (768px - 1023px)
                    </div>
                    <div className="hidden lg:block p-2 bg-yellow-100 rounded">
                      Visible only on large screens (≥ 1024px)
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </ResponsiveContainer>
      </main>
    </>
  );
} 