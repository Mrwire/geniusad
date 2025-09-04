import React from 'react';
import { getTranslations } from 'next-intl/server';
import MoujeLeellHero from '@/components/organisms/MoujeLeellHero';
import FeatureSection from '@/components/molecules/FeatureSection';
import ProcessTimeline from '@/components/molecules/ProcessTimeline';
import WorkGrid from '@/components/molecules/WorkGrid';
import TestimonialCarousel from '@/components/molecules/TestimonialCarousel';
import SubsidiaryLayout from '@/components/templates/SubsidiaryLayout';

// Sample data for Mouje-Leell - in a real app, this would come from Sanity CMS
const moujeleellFeatures = [
  {
    title: "Creative Event Production",
    description: "We conceptualize and produce unforgettable experiences that captivate audiences and create lasting impressions.",
    icon: "/item_images/image/element/moujeleell/event-icon.svg"
  },
  {
    title: "Audiovisual Production",
    description: "Professional audiovisual content creation including films, commercials, and documentary projects.",
    icon: "/item_images/image/element/moujeleell/av-icon.svg"
  },
  {
    title: "Live Performance Production",
    description: "Staging and production of live performances from concerts to theatrical productions.",
    icon: "/item_images/image/element/moujeleell/performance-icon.svg"
  },
  {
    title: "Creative Concept Development",
    description: "Crafting innovative creative concepts for brands, events, and entertainment projects.",
    icon: "/item_images/image/element/moujeleell/concept-icon.svg"
  }
];

const creativeProcess = [
  {
    number: "01",
    title: "Inspiration",
    description: "Gathering insights and creative inspiration from diverse sources to inform the project."
  },
  {
    number: "02",
    title: "Conceptualization",
    description: "Developing unique creative concepts that translate ideas into concrete plans."
  },
  {
    number: "03",
    title: "Production",
    description: "Bringing concepts to life through meticulous planning and professional execution."
  },
  {
    number: "04",
    title: "Experience",
    description: "Delivering memorable experiences that resonate with audiences and achieve objectives."
  }
];

const portfolioItems = [
  {
    id: 1,
    title: "Festival Mawazine",
    category: "events",
    image: "/item_images/image/element/moujeleell/portfolio1.jpg"
  },
  {
    id: 2,
    title: "Moroccan Short Film Festival",
    category: "festivals",
    image: "/item_images/image/element/moujeleell/portfolio2.jpg"
  },
  {
    id: 3,
    title: "CIH Bank Anniversary Celebration",
    category: "corporate",
    image: "/item_images/image/element/moujeleell/portfolio3.jpg"
  },
  {
    id: 4,
    title: "Tangier Jazz Festival",
    category: "music",
    image: "/item_images/image/element/moujeleell/portfolio4.jpg"
  },
  {
    id: 5,
    title: "African Contemporary Art Exhibition",
    category: "exhibitions",
    image: "/item_images/image/element/moujeleell/portfolio5.jpg"
  },
  {
    id: 6,
    title: "Moroccan Tourism Campaign",
    category: "campaigns",
    image: "/item_images/image/element/moujeleell/portfolio6.jpg"
  }
];

const testimonials = [
  {
    id: 1,
    quote: "Mouje-Leell created an extraordinary experience for our corporate event. Their attention to creative detail and flawless execution left a lasting impression on all attendees.",
    author: "Nadia Berrada",
    company: "Events Director, Royal Air Maroc",
    avatar: "/item_images/image/element/moujeleell/testimonial1.jpg"
  },
  {
    id: 2,
    quote: "Working with Mouje-Leell on our festival was a revelation. Their creative vision and technical expertise transformed our event into something truly magical.",
    author: "Karim El Allam",
    company: "Festival Director, Essaouira Gnaoua Festival",
    avatar: "/item_images/image/element/moujeleell/testimonial2.jpg"
  },
  {
    id: 3,
    quote: "Mouje-Leell's audiovisual production elevated our brand campaign to international standards. Their creativity and professionalism are unmatched in the industry.",
    author: "Samira Kadiri",
    company: "Marketing Manager, Attijariwafa Bank",
    avatar: "/item_images/image/element/moujeleell/testimonial3.jpg"
  }
];

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function MoujeLeellPage({ params: { locale } }: PageProps) {
  // Get translations
  const t = await getTranslations('Subsidiary.MOUJELEELL');

  return (
    <SubsidiaryLayout 
      subsidiary="moujeleell"
      title={t('title')}
      description={t('description')}
    >
      <MoujeLeellHero 
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        imageSrc="/item_images/image/element/moujeleell/hero-image.jpg"
      />
      
      <FeatureSection
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        features={moujeleellFeatures}
        theme="moujeleell"
        imagePosition="left"
        imageSrc="/item_images/image/element/moujeleell/services-image.jpg"
      />
      
      <ProcessTimeline
        title={t('process.title')}
        subtitle={t('process.subtitle')}
        steps={creativeProcess}
        theme="moujeleell"
      />
      
      <WorkGrid
        title={t('work.title')}
        subtitle={t('work.subtitle')}
        items={portfolioItems}
        theme="moujeleell"
        categories={['events', 'festivals', 'music', 'exhibitions', 'corporate', 'campaigns']}
      />
      
      <TestimonialCarousel
        testimonials={testimonials}
        theme="moujeleell"
      />
    </SubsidiaryLayout>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'Subsidiary.MOUJELEELL.Meta' });
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/item_images/image/element/moujeleell/og-image.jpg'],
    },
  };
} 