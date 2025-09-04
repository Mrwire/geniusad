'use client';

import React, { useState, useEffect } from 'react';
import { Typography } from '@/components/atoms/Typography';
import ResponsiveContainer from '@/components/atoms/ResponsiveContainer';
import SkipNavigation from '@/components/atoms/SkipNavigation';
import { Button } from '@/components/atoms/Button';
import ResponsiveImage from '@/components/atoms/ResponsiveImage';
import FixedPositionImage from '@/components/atoms/FixedPositionImage';

/**
 * ImageChecker page to verify images are properly loaded
 */
export default function ImageCheckerPage() {
  const [imageLoadStatus, setImageLoadStatus] = useState<Record<string, boolean>>({});
  
  const imagesToCheck = [
    { name: 'Genius Logo (PNG)', path: '/item_images/logo/genius-logo.png' },
    { name: 'Genius Logo (SVG)', path: '/item_images/logo/genius-logo.svg' },
    { name: 'G Logo', path: '/item_images/image/G.png' },
    { name: 'Gamius Logo', path: '/item_images/logo/gamiusgroup.png' },
    { name: 'Labrigad Logo', path: '/item_images/logo/labrigad-min.png' },
    { name: 'MPS Logo', path: '/item_images/logo/MPS.png' },
    { name: 'MPS Hero Image', path: '/item_images/mps/About-Us-Hero-Image-1.webp' },
  ];
  
  // Test function to check if an image loads successfully
  const testImageLoad = (imagePath: string) => {
    return new Promise<boolean>((resolve) => {
      const img = new Image();
      img.onload = () => {
        setImageLoadStatus(prev => ({ ...prev, [imagePath]: true }));
        resolve(true);
      };
      img.onerror = () => {
        setImageLoadStatus(prev => ({ ...prev, [imagePath]: false }));
        resolve(false);
      };
      img.src = imagePath;
    });
  };
  
  useEffect(() => {
    // Auto-test all images when component mounts
    const testAllImages = async () => {
      for (const image of imagesToCheck) {
        await testImageLoad(image.path);
      }
    };
    
    testAllImages();
  }, []);
  
  return (
    <>
      <SkipNavigation />
      <main id="main-content" className="pb-20">
        <ResponsiveContainer>
          <div className="my-8">
            <Typography variant="h1" className="mb-4">Image Checker Tool</Typography>
            <Typography variant="body" className="mb-8">
              This tool verifies that images are correctly accessible from the web application.
              It tests loading images from various directories.
            </Typography>
            
            <section className="mb-10 bg-gray-50 p-6 rounded-lg">
              <Typography variant="h2" className="mb-4">Image Load Test Results</Typography>
              <div className="overflow-x-auto">
                <table className="min-w-full border rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Path
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {imagesToCheck.map((image) => (
                      <tr key={image.path}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {image.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                          {image.path}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {imageLoadStatus[image.path] === undefined ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800">
                              Checking...
                            </span>
                          ) : imageLoadStatus[image.path] ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                              Success
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-100 text-red-800">
                              Failed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="primary"
                  onClick={() => {
                    // Reset status and test again
                    setImageLoadStatus({});
                    for (const image of imagesToCheck) {
                      testImageLoad(image.path);
                    }
                  }}
                >
                  Retest All Images
                </Button>
              </div>
            </section>
            
            <section className="mb-10">
              <Typography variant="h2" className="mb-6">Image Previews</Typography>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {imagesToCheck.map((image) => (
                  <div key={image.path} className="border border-gray-200 rounded-lg p-4 bg-white">
                    <Typography variant="h3" className="mb-2 text-base">{image.name}</Typography>
                    <div className="relative h-40 w-full bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={image.path}
                        alt={image.name}
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          // Show error placeholder on image load error
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"%3E%3Ccircle cx="12" cy="12" r="10"/%3E%3Cline x1="15" y1="9" x2="9" y2="15"/%3E%3Cline x1="9" y1="9" x2="15" y2="15"/%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                    <Typography variant="caption" className="mt-2 block text-gray-500">
                      {image.path}
                    </Typography>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <Typography variant="h2" className="mb-6">Testing Components</Typography>
              
              <div className="space-y-8">
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-3">ResponsiveImage Component</Typography>
                  <div className="mb-4">
                    <Typography variant="body" className="mb-2">MPS Hero Image using ResponsiveImage:</Typography>
                    <div className="h-60 relative">
                      <ResponsiveImage
                        src="/item_images/mps/About-Us-Hero-Image-1.webp"
                        alt="MPS Hero"
                        fill={true}
                        className="object-cover rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6 bg-white">
                  <Typography variant="h3" className="mb-3">FixedPositionImage Component</Typography>
                  <div className="mb-4">
                    <Typography variant="body" className="mb-2">Genius Logo using FixedPositionImage:</Typography>
                    <FixedPositionImage
                      src="/item_images/logo/genius-logo.png"
                      altText="Genius Logo"
                      containerClassName="h-40 w-40"
                      imageClassName="object-contain"
                    />
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