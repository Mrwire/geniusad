'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { AccessibilityShowcase } from '@/components/organisms/AccessibilityShowcase';
import { VideoPlayer } from '@/components/molecules/VideoPlayer';
import { AudioPlayer } from '@/components/molecules/AudioPlayer';
import { AccessibleMedia } from '@/components/atoms/AccessibleMedia';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { FocusTrap } from '@/components/atoms/FocusTrap';
import { Modal } from '@/components/molecules/Modal';
import SkipNavigation from '@/components/atoms/SkipNavigation';

export default function AccessibilityTest() {
  const t = useTranslations('accessibility');
  const [modalOpen, setModalOpen] = React.useState(false);
  
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
    <div className="container mx-auto px-4 py-8">
      <SkipNavigation />
      
      <main id="main-content" className="space-y-12">
        <section className="space-y-4">
          <Typography variant="h1" className="mb-6">Accessibility Test Page</Typography>
          <Typography variant="body">
            This page demonstrates all the accessible components and features we've implemented to meet WCAG 2.1 Level AA standards.
          </Typography>
        </section>

        <section className="space-y-4">
          <Typography variant="h2" className="mb-4">Interactive Component Demo</Typography>
          
          <div className="space-y-6">
            <div>
              <Typography variant="h3" className="mb-2">Accessible Button</Typography>
              <div className="flex flex-wrap gap-4">
                <Button>Standard Button</Button>
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="tertiary">Tertiary Button</Button>
                <Button disabled>Disabled Button</Button>
                <Button aria-label="Custom action button">Action Button</Button>
              </div>
            </div>

            <div>
              <Typography variant="h3" className="mb-2">Modal with Focus Trap</Typography>
              <Button onClick={() => setModalOpen(true)}>Open Accessible Modal</Button>
              
              <Modal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)}
                title="Accessible Modal"
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
              >
                <div id="modal-description">
                  <Typography variant="body" className="mb-4">
                    This modal demonstrates keyboard accessibility features including focus trapping,
                    which prevents users from tabbing outside the modal while it's open.
                  </Typography>
                  <div className="flex justify-end">
                    <Button onClick={() => setModalOpen(false)}>Close Modal</Button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <Typography variant="h2" className="mb-4">Accessible Media Components</Typography>
          
          <div className="space-y-8">
            <div>
              <Typography variant="h3" className="mb-2">Image with Alt Text and Caption</Typography>
              <AccessibleMedia
                type="image"
                src="/item_images/image/logo/genius.png"
                alt="Genius Ad District logo"
                caption="Our brand logo with proper alt text for screen readers"
                width={300}
                height={200}
              />
            </div>

            <div>
              <Typography variant="h3" className="mb-2">Video Player with Captions and Transcript</Typography>
              <VideoPlayer
                src="/videos/sample-video.mp4"
                poster="/videos/sample-poster.jpg"
                alt="Sample accessible video demonstration"
                caption="This video includes captions and transcript options"
                captionsUrl="/videos/sample-captions.vtt"
                transcriptUrl="/videos/sample-transcript.txt"
                width={640}
                height={360}
                customControls
              />
            </div>

            <div>
              <Typography variant="h3" className="mb-2">Audio Player with Transcript</Typography>
              <AudioPlayer
                src="/videos/sample-audio.mp3"
                alt="Sample accessible audio demonstration"
                caption="This audio player includes a transcript option"
                transcriptUrl="/videos/sample-transcript.txt"
                customControls
              />
            </div>
          </div>
        </section>

        {/* Full Showcase Demo */}
        <section className="pt-8 border-t border-gray-200">
          <Typography variant="h2" className="mb-6">Complete Accessibility Showcase</Typography>
          <AccessibilityShowcase translations={showcaseTranslations} />
        </section>
      </main>
    </div>
  );
} 