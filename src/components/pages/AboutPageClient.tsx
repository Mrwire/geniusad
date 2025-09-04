'use client';

import { useTranslations } from 'next-intl';
import BaseLayout from '@/components/templates/BaseLayout';
import { Typography } from '@/components/atoms/Typography';

export default function AboutPageClient() {
  const about = useTranslations('about');
  
  return (
    <BaseLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="h1" className="mb-6">
              {about('hero.title')}
            </Typography>
            <Typography variant="body" color="muted" className="text-lg">
              {about('hero.subtitle')}
            </Typography>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <Typography variant="h3" className="mb-6">
                {about('mission.title')}
              </Typography>
              <Typography variant="body">
                {about('mission.content')}
              </Typography>
            </div>
            <div>
              <Typography variant="h3" className="mb-6">
                {about('vision.title')}
              </Typography>
              <Typography variant="body">
                {about('vision.content')}
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Typography variant="h2" className="mb-12 text-center">
            {about('values.title')}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-white rounded-lg shadow-sm">
              <Typography variant="h4" className="mb-4 text-silver">
                {about('values.innovation.title')}
              </Typography>
              <Typography variant="body">
                {about('values.innovation.description')}
              </Typography>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-sm">
              <Typography variant="h4" className="mb-4 text-silver">
                {about('values.excellence.title')}
              </Typography>
              <Typography variant="body">
                {about('values.excellence.description')}
              </Typography>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-sm">
              <Typography variant="h4" className="mb-4 text-silver">
                {about('values.collaboration.title')}
              </Typography>
              <Typography variant="body">
                {about('values.collaboration.description')}
              </Typography>
            </div>
            <div className="p-8 bg-white rounded-lg shadow-sm">
              <Typography variant="h4" className="mb-4 text-silver">
                {about('values.integrity.title')}
              </Typography>
              <Typography variant="body">
                {about('values.integrity.description')}
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <Typography variant="h2" className="mb-4">
              {about('history.title')}
            </Typography>
            <Typography variant="body" color="muted">
              {about('history.subtitle')}
            </Typography>
          </div>
          
          <div className="relative border-l border-gray-200 ml-6 md:ml-0 md:mx-auto md:max-w-3xl">
            {/* This would be a loop in a real implementation */}
            <div className="mb-12 relative pl-8 md:pl-0 md:ml-[50%] md:pr-8">
              <div className="absolute top-0 -left-4 md:-left-4 w-8 h-8 rounded-full bg-silver flex items-center justify-center text-white font-bold">
                1
              </div>
              <Typography variant="h5" className="mb-2">
                2015: {about('history.milestones.0.title')}
              </Typography>
              <Typography variant="body" color="muted">
                {about('history.milestones.0.description')}
              </Typography>
            </div>
            <div className="mb-12 relative pl-8 md:pl-8 md:ml-0 md:mr-[50%]">
              <div className="absolute top-0 -left-4 md:-right-4 w-8 h-8 rounded-full bg-silver flex items-center justify-center text-white font-bold">
                2
              </div>
              <Typography variant="h5" className="mb-2">
                2017: {about('history.milestones.1.title')}
              </Typography>
              <Typography variant="body" color="muted">
                {about('history.milestones.1.description')}
              </Typography>
            </div>
            <div className="mb-12 relative pl-8 md:pl-0 md:ml-[50%] md:pr-8">
              <div className="absolute top-0 -left-4 md:-left-4 w-8 h-8 rounded-full bg-silver flex items-center justify-center text-white font-bold">
                3
              </div>
              <Typography variant="h5" className="mb-2">
                2019: {about('history.milestones.2.title')}
              </Typography>
              <Typography variant="body" color="muted">
                {about('history.milestones.2.description')}
              </Typography>
            </div>
            <div className="mb-12 relative pl-8 md:pl-8 md:ml-0 md:mr-[50%]">
              <div className="absolute top-0 -left-4 md:-right-4 w-8 h-8 rounded-full bg-silver flex items-center justify-center text-white font-bold">
                4
              </div>
              <Typography variant="h5" className="mb-2">
                2021: {about('history.milestones.3.title')}
              </Typography>
              <Typography variant="body" color="muted">
                {about('history.milestones.3.description')}
              </Typography>
            </div>
            <div className="relative pl-8 md:pl-0 md:ml-[50%] md:pr-8">
              <div className="absolute top-0 -left-4 md:-left-4 w-8 h-8 rounded-full bg-silver flex items-center justify-center text-white font-bold">
                5
              </div>
              <Typography variant="h5" className="mb-2">
                2023: {about('history.milestones.4.title')}
              </Typography>
              <Typography variant="body" color="muted">
                {about('history.milestones.4.description')}
              </Typography>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}
