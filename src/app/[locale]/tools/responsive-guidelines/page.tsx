import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import ResponsiveContainer from '@/components/atoms/ResponsiveContainer';
import SkipNavigation from '@/components/atoms/SkipNavigation';
import ResponsiveGrid from '@/components/atoms/ResponsiveGrid';

/**
 * Responsive Design Guidelines
 * This page provides best practices and code examples for implementing
 * responsive design across the Genius Ad District site
 */
export default function ResponsiveGuidelinesPage() {
  return (
    <>
      <SkipNavigation />
      <main id="main-content" className="pb-20">
        <ResponsiveContainer>
          <div className="my-8">
            <Typography variant="h1" className="mb-4">Responsive Design Guidelines</Typography>
            <Typography variant="body" className="mb-8">
              This guide outlines the responsive design patterns, components, and best practices 
              for creating a consistent experience across all devices in the Genius Ad District website.
            </Typography>
            
            <section className="mb-12 border-b pb-8">
              <Typography variant="h2" className="mb-4">Breakpoints</Typography>
              <Typography variant="body" className="mb-4">
                Our site uses the following standard Tailwind CSS breakpoints. Always design with a mobile-first approach.
              </Typography>
              
              <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Breakpoint</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size (pixels)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tailwind Prefix</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Example Devices</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Default (xs)</td>
                      <td className="px-6 py-4 whitespace-nowrap">&lt; 640px</td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">none</td>
                      <td className="px-6 py-4 whitespace-nowrap">Small mobile devices</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Small (sm)</td>
                      <td className="px-6 py-4 whitespace-nowrap">≥ 640px</td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">sm:</td>
                      <td className="px-6 py-4 whitespace-nowrap">Large mobile devices</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Medium (md)</td>
                      <td className="px-6 py-4 whitespace-nowrap">≥ 768px</td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">md:</td>
                      <td className="px-6 py-4 whitespace-nowrap">Tablets, small laptops</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Large (lg)</td>
                      <td className="px-6 py-4 whitespace-nowrap">≥ 1024px</td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">lg:</td>
                      <td className="px-6 py-4 whitespace-nowrap">Laptops, small desktops</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">Extra Large (xl)</td>
                      <td className="px-6 py-4 whitespace-nowrap">≥ 1280px</td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">xl:</td>
                      <td className="px-6 py-4 whitespace-nowrap">Large desktops</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">2XL (2xl)</td>
                      <td className="px-6 py-4 whitespace-nowrap">≥ 1536px</td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">2xl:</td>
                      <td className="px-6 py-4 whitespace-nowrap">Very large displays</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            
            <section className="mb-12 border-b pb-8">
              <Typography variant="h2" className="mb-4">Responsive Components</Typography>
              <Typography variant="body" className="mb-4">
                Always use our responsive components to ensure consistent behavior across different devices.
              </Typography>
              
              <ResponsiveGrid columns={{ xs: 1, md: 2 }} gap="lg" className="mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Typography variant="h3" className="mb-3">ResponsiveContainer</Typography>
                  <Typography variant="body" className="mb-3">
                    Provides consistent container behavior with appropriate max-widths and padding at each breakpoint.
                  </Typography>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      <code>{`<ResponsiveContainer>
  {/* Your content here */}
</ResponsiveContainer>

// For a narrower container
<ResponsiveContainer narrow>
  {/* Content */}
</ResponsiveContainer>

// For a wider container
<ResponsiveContainer wide>
  {/* Content */}
</ResponsiveContainer>`}</code>
                    </pre>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Typography variant="h3" className="mb-3">ResponsiveGrid</Typography>
                  <Typography variant="body" className="mb-3">
                    Creates grid layouts that adapt to different screen sizes automatically.
                  </Typography>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      <code>{`// Simple responsive grid
<ResponsiveGrid columns={4} gap="md">
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</ResponsiveGrid>

// Custom columns at each breakpoint
<ResponsiveGrid 
  columns={{ 
    xs: 1, 
    sm: 2, 
    md: 3, 
    lg: 4 
  }} 
  gap="lg"
>
  {/* Grid items */}
</ResponsiveGrid>`}</code>
                    </pre>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Typography variant="h3" className="mb-3">ResponsiveImage</Typography>
                  <Typography variant="body" className="mb-3">
                    Optimizes images for different device sizes and supports art direction.
                  </Typography>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      <code>{`// Basic responsive image
<ResponsiveImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// With different sources for breakpoints
<ResponsiveImage
  src="/images/desktop.jpg"
  mobileSrc="/images/mobile.jpg"
  tabletSrc="/images/tablet.jpg"
  alt="Hero image"
  fill
/>`}</code>
                    </pre>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <Typography variant="h3" className="mb-3">ResponsiveTypography</Typography>
                  <Typography variant="body" className="mb-3">
                    Typography that adapts its size and style based on the viewport.
                  </Typography>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      <code>{`// Different variants at different breakpoints
<ResponsiveTypography
  mobileVariant="h3"
  tabletVariant="h2"
  desktopVariant="h1"
>
  Adaptive Heading
</ResponsiveTypography>

// Fluid typography that scales smoothly
<ResponsiveTypography
  variant="h2"
  fluid
>
  Smooth Scaling Heading
</ResponsiveTypography>`}</code>
                    </pre>
                  </div>
                </div>
              </ResponsiveGrid>
            </section>
            
            <section className="mb-12 border-b pb-8">
              <Typography variant="h2" className="mb-4">Mobile-First Best Practices</Typography>
              
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Typography variant="h3" className="mb-3">1. Start With Mobile Layout</Typography>
                  <Typography variant="body" className="mb-3">
                    Always design and implement for mobile first, then enhance for larger screens.
                    This ensures core functionality is accessible on all devices.
                  </Typography>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      <code>{`// Good: Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* Content */}
</div>

// Avoid: Desktop-first approach
<div className="grid grid-cols-4 md:grid-cols-2 xs:grid-cols-1">
  {/* Content */}
</div>`}</code>
                    </pre>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Typography variant="h3" className="mb-3">2. Optimize Touch Targets</Typography>
                  <Typography variant="body" className="mb-3">
                    Interactive elements should be at least 44×44px on touch screens with adequate spacing between them.
                  </Typography>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      <code>{`// Good: Touch-friendly button
<button className="min-h-[44px] min-w-[44px] p-3">
  Click Me
</button>

// Good: Adequate spacing
<div className="space-y-4 md:space-y-2">
  <button>Option 1</button>
  <button>Option 2</button>
</div>`}</code>
                    </pre>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Typography variant="h3" className="mb-3">3. Use Relative Units</Typography>
                  <Typography variant="body" className="mb-3">
                    Prefer relative units (rem, em, %) over fixed units (px) for better scaling across devices.
                  </Typography>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      <code>{`// Good: Responsive sizing
.heading {
  font-size: 1.5rem; /* 24px at 16px base */
  margin-bottom: 1.25rem; /* 20px at 16px base */
  max-width: 100%;
}

// Avoid: Fixed sizing
.heading {
  font-size: 24px;
  margin-bottom: 20px;
  max-width: 600px;
}`}</code>
                    </pre>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Typography variant="h3" className="mb-3">4. Content Prioritization</Typography>
                  <Typography variant="body" className="mb-3">
                    Reprioritize content on smaller screens to ensure the most important information is seen first.
                  </Typography>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      <code>{`// Good: Reprioritizing content
<div className="flex flex-col lg:flex-row">
  <div className="order-2 lg:order-1">
    {/* Secondary content on mobile, primary on desktop */}
  </div>
  <div className="order-1 lg:order-2">
    {/* Primary content on mobile, secondary on desktop */}
  </div>
</div>`}</code>
                    </pre>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Typography variant="h3" className="mb-3">5. Progressive Enhancement</Typography>
                  <Typography variant="body" className="mb-3">
                    Start with a minimal viable experience for all devices, then enhance for larger screens or more capable browsers.
                  </Typography>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <pre className="text-xs overflow-x-auto">
                      <code>{`// Base style for all devices
.card {
  padding: 1rem;
  margin-bottom: 1rem;
}

// Enhanced styles for larger screens
@media (min-width: 768px) {
  .card {
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
  }
  
  .card:hover {
    transform: translateY(-5px);
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="mb-12">
              <Typography variant="h2" className="mb-4">Testing Methodology</Typography>
              <Typography variant="body" className="mb-4">
                Use these testing methods to ensure your pages respond properly across different devices:
              </Typography>
              
              <ResponsiveGrid columns={{ xs: 1, md: 2 }} gap="md">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Typography variant="h3" className="mb-3">Browser Dev Tools</Typography>
                  <Typography variant="body">
                    Use Chrome/Firefox/Safari device emulation to test different screen sizes and device types.
                    Test with both portrait and landscape orientations.
                  </Typography>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Typography variant="h3" className="mb-3">Real Device Testing</Typography>
                  <Typography variant="body">
                    Always test on actual devices when possible, especially for critical user flows.
                    At minimum, test on a small mobile device, tablet, and desktop.
                  </Typography>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Typography variant="h3" className="mb-3">Responsive Audit Tool</Typography>
                  <Typography variant="body">
                    Use our <a href="/tools/responsive-audit" className="text-primary-600 hover:underline">Responsive Audit Tool</a> to check for common issues 
                    like overflow problems, touch target sizes, and responsive image implementation.
                  </Typography>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <Typography variant="h3" className="mb-3">Responsive Helper</Typography>
                  <Typography variant="body">
                    Enable the responsive helper component in development to see the current breakpoint
                    while working on responsive layouts.
                  </Typography>
                </div>
              </ResponsiveGrid>
            </section>
          </div>
        </ResponsiveContainer>
      </main>
    </>
  );
} 