'use client';

import { useTranslations } from 'next-intl';
import { AccessibilityShowcase } from '@/components/organisms/AccessibilityShowcase';
import { Typography } from '@/components/atoms/Typography';

export default function AccessibilityPage() {
  const t = useTranslations('accessibility');
  
  // Prepare translations for the showcase component
  const showcaseTranslations = {
    title: t('showcase.title'),
    description: t('showcase.description'),
    imageAlt: t('showcase.imageAlt'),
    videoAlt: t('showcase.videoAlt'),
    audioAlt: t('showcase.audioAlt'),
    imageCaption: t('showcase.imageCaption'),
    videoCaption: t('showcase.videoCaption'),
    audioCaption: t('showcase.audioCaption'),
    tabs: {
      images: t('showcase.tabs.images'),
      videos: t('showcase.tabs.videos'),
      audio: t('showcase.tabs.audio')
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Typography variant="h1" className="mb-6">
          {t('documentation.title')}
        </Typography>
        
        <div className="mb-12">
          <Typography variant="body" className="mb-6">
            {t('documentation.introduction')}
          </Typography>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {/* Keyboard Navigation */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Typography variant="h3" className="mb-3">
                {t('documentation.keyboard.title')}
              </Typography>
              <Typography variant="body">
                {t('documentation.keyboard.description')}
              </Typography>
            </div>
            
            {/* Screen Reader Support */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Typography variant="h3" className="mb-3">
                {t('documentation.screenReaders.title')}
              </Typography>
              <Typography variant="body">
                {t('documentation.screenReaders.description')}
              </Typography>
            </div>
            
            {/* Color Contrast */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Typography variant="h3" className="mb-3">
                {t('documentation.contrast.title')}
              </Typography>
              <Typography variant="body">
                {t('documentation.contrast.description')}
              </Typography>
            </div>
            
            {/* Accessible Media */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <Typography variant="h3" className="mb-3">
                {t('documentation.media.title')}
              </Typography>
              <Typography variant="body">
                {t('documentation.media.description')}
              </Typography>
            </div>
            
            {/* Responsive Design */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 md:col-span-2">
              <Typography variant="h3" className="mb-3">
                {t('documentation.responsive.title')}
              </Typography>
              <Typography variant="body">
                {t('documentation.responsive.description')}
              </Typography>
            </div>
          </div>
        </div>
        
        {/* Accessible Media Components Showcase */}
        <AccessibilityShowcase translations={showcaseTranslations} />
      </div>
    </div>
  );
} 