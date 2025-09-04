'use client';

import React, { useState } from 'react';
import { AccessibleMedia } from '../atoms/AccessibleMedia';
import { VideoPlayer } from '../molecules/VideoPlayer';
import { AudioPlayer } from '../molecules/AudioPlayer';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';

interface AccessibilityShowcaseProps {
  translations: {
    title: string;
    description: string;
    imageAlt: string;
    videoAlt: string;
    audioAlt: string;
    imageCaption: string;
    videoCaption: string;
    audioCaption: string;
    tabs: {
      images: string;
      videos: string;
      audio: string;
    }
  }
}

/**
 * Component showcasing the various accessible media components
 * with examples of proper usage for accessibility
 */
export const AccessibilityShowcase: React.FC<AccessibilityShowcaseProps> = ({
  translations,
}) => {
  const [activeTab, setActiveTab] = useState<'images' | 'videos' | 'audio'>('images');
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'images':
        return (
          <div className="space-y-8">
            <div>
              <Typography variant="h3" className="mb-4">
                {translations.tabs.images}
              </Typography>
              <Typography variant="body" className="mb-4">
                Images with proper alternative text and captions for screen readers.
              </Typography>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Example 1: Basic accessible image */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <Typography variant="h4" className="mb-2">Standard Image</Typography>
                  <AccessibleMedia
                    type="image"
                    src="/item_images/image/element/element/example-1.jpg"
                    alt={translations.imageAlt}
                    caption={translations.imageCaption}
                    width={500}
                    height={300}
                  />
                </div>
                
                {/* Example 2: Image with complex description */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <Typography variant="h4" className="mb-2">Infographic with Detailed Alt Text</Typography>
                  <AccessibleMedia
                    type="image"
                    src="/item_images/image/element/element/example-2.jpg"
                    alt="Infographic showing the 7 principles of accessibility: Perceivable, Operable, Understandable, Robust, Equitable, Flexible, and Tolerant"
                    caption="The 7 principles of digital accessibility visualized"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'videos':
        return (
          <div className="space-y-8">
            <div>
              <Typography variant="h3" className="mb-4">
                {translations.tabs.videos}
              </Typography>
              <Typography variant="body" className="mb-4">
                Videos with captions, transcripts, and accessible controls.
              </Typography>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Example 1: Standard video with captions */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <Typography variant="h4" className="mb-2">Video with Captions</Typography>
                  <VideoPlayer
                    src="/videos/sample-video.mp4"
                    alt={translations.videoAlt}
                    caption={translations.videoCaption}
                    captionsUrl="/videos/sample-captions.vtt"
                    transcriptUrl="/videos/sample-transcript.txt"
                    poster="/videos/sample-poster.jpg"
                    width={500}
                    height={280}
                  />
                </div>
                
                {/* Example 2: Video with standard HTML5 controls */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <Typography variant="h4" className="mb-2">Video with Native Controls</Typography>
                  <AccessibleMedia
                    type="video"
                    src="/videos/sample-video.mp4"
                    alt="Product demonstration showing features of our design system"
                    caption="Overview of our design system components and principles"
                    captionsUrl="/videos/sample-captions.vtt"
                    width={500}
                    height={280}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'audio':
        return (
          <div className="space-y-8">
            <div>
              <Typography variant="h3" className="mb-4">
                {translations.tabs.audio}
              </Typography>
              <Typography variant="body" className="mb-4">
                Audio content with transcripts and accessible controls.
              </Typography>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Example 1: Custom audio player */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <Typography variant="h4" className="mb-2">Audio with Custom Controls</Typography>
                  <AudioPlayer
                    src="/videos/sample-audio.mp3"
                    alt={translations.audioAlt}
                    caption={translations.audioCaption}
                    transcriptUrl="/videos/sample-transcript.txt"
                  />
                </div>
                
                {/* Example 2: Standard audio player */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <Typography variant="h4" className="mb-2">Audio with Native Controls</Typography>
                  <AccessibleMedia
                    type="audio"
                    src="/videos/sample-audio.mp3"
                    alt="Podcast episode discussing latest design trends"
                    caption="Design Talk Podcast - Episode 42: Accessibility First Design"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="accessibility-showcase my-8">
      <Typography variant="h2" className="mb-4">
        {translations.title}
      </Typography>
      <Typography variant="body" className="mb-6">
        {translations.description}
      </Typography>
      
      {/* Tabs navigation */}
      <div className="border-b border-gray-200 mb-6" role="tablist" aria-label="Media types">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('images')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'images'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            role="tab"
            aria-selected={activeTab === 'images'}
            aria-controls="panel-images"
            id="tab-images"
          >
            {translations.tabs.images}
          </button>
          
          <button
            onClick={() => setActiveTab('videos')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'videos'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            role="tab"
            aria-selected={activeTab === 'videos'}
            aria-controls="panel-videos"
            id="tab-videos"
          >
            {translations.tabs.videos}
          </button>
          
          <button
            onClick={() => setActiveTab('audio')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'audio'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            role="tab"
            aria-selected={activeTab === 'audio'}
            aria-controls="panel-audio"
            id="tab-audio"
          >
            {translations.tabs.audio}
          </button>
        </div>
      </div>
      
      {/* Tab content */}
      <div 
        role="tabpanel" 
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AccessibilityShowcase; 