import React from 'react';
import { getTranslations } from 'next-intl/server';
import GamiusHero from '@/components/organisms/GamiusHero';
import FeatureSection from '@/components/molecules/FeatureSection';
import ProcessTimeline from '@/components/molecules/ProcessTimeline';
import WorkGrid from '@/components/molecules/WorkGrid';
import TestimonialCarousel from '@/components/molecules/TestimonialCarousel';
import SubsidiaryLayout from '@/components/templates/SubsidiaryLayout';
import CaseStudyHighlight from '@/components/molecules/CaseStudyHighlight';

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function GamiusPage({ params: { locale } }: PageProps) {
  // Get translations
  const t = await getTranslations('Subsidiary.GAMIUS');

  // Format features based on translations
  const gamiusFeatures = [
    {
      title: t('services.feature1.title'),
      description: t('services.feature1.description'),
      icon: "/item_images/image/element/gamius/gaming-icon.svg"
    },
    {
      title: t('services.feature2.title'),
      description: t('services.feature2.description'),
      icon: "/item_images/image/element/gamius/vr-icon.svg"
    },
    {
      title: t('services.feature3.title'),
      description: t('services.feature3.description'),
      icon: "/item_images/image/element/gamius/gamification-icon.svg"
    }
  ];

  // Create process steps using translations
  const gamingProcess = [
    {
      number: "01",
      title: t.raw('process.steps.0.title'),
      description: t.raw('process.steps.0.description')
    },
    {
      number: "02",
      title: t.raw('process.steps.1.title'),
      description: t.raw('process.steps.1.description')
    },
    {
      number: "03",
      title: t.raw('process.steps.2.title'),
      description: t.raw('process.steps.2.description')
    },
    {
      number: "04",
      title: t.raw('process.steps.3.title'),
      description: t.raw('process.steps.3.description')
    }
  ];

  const portfolioItems = [
    {
      id: 1,
      title: "Morocco Gaming Expo",
      category: "events",
      image: "/item_images/image/element/gamius/portfolio1.jpg"
    },
    {
      id: 2,
      title: "INWI Gaming Cup",
      category: "tournaments",
      image: "/item_images/image/element/gamius/portfolio2.jpg"
    },
    {
      id: 3,
      title: "Orange Esports Series",
      category: "tournaments",
      image: "/item_images/image/element/gamius/portfolio3.jpg"
    },
    {
      id: 4,
      title: "Moroccan Gaming Awards",
      category: "events",
      image: "/item_images/image/element/gamius/portfolio4.jpg"
    },
    {
      id: 5,
      title: "Call of Duty Mobile Championships",
      category: "tournaments",
      image: "/item_images/image/element/gamius/portfolio5.jpg"
    },
    {
      id: 6,
      title: "FIFA Pro League Morocco",
      category: "competitions",
      image: "/item_images/image/element/gamius/portfolio6.jpg"
    }
  ];

  const testimonials = [
    {
      id: 1,
      quote: "Gamius transformed our brand's perception among younger audiences through their expertly managed gaming tournaments. The results exceeded all expectations.",
      author: "Yasmine El Aouni",
      company: "Marketing Director, Maroc Telecom",
      avatar: "/item_images/image/element/gamius/testimonial1.jpg"
    },
    {
      id: 2,
      quote: "The esports event organized by Gamius was a massive success, generating unprecedented engagement with our target demographic and significant social media buzz.",
      author: "Hassan Bennani",
      company: "CEO, TechMorocco",
      avatar: "/item_images/image/element/gamius/testimonial2.jpg"
    },
    {
      id: 3,
      quote: "Gamius' understanding of the gaming culture and their ability to authentically integrate our brand into gaming content provided us with incredible ROI.",
      author: "Salma Kabbaj",
      company: "Brand Manager, Coca-Cola Morocco",
      avatar: "/item_images/image/element/gamius/testimonial3.jpg"
    }
  ];

  // Case study stats
  const caseStudyStats = [
    { label: 'App downloads', value: '87K' },
    { label: 'Games played', value: '1.3M+' },
    { label: 'Sales increase', value: '23%' },
    { label: 'Live viewers', value: '340K' }
  ];

  return (
    <SubsidiaryLayout 
      subsidiary="gamius"
      title={t('title')}
      description={t('description')}
    >
      <GamiusHero 
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        imageSrc="/item_images/image/element/gamius/hero-image.jpg"
      />
      
      <FeatureSection
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        features={gamiusFeatures}
        theme="gamius"
        imagePosition="right"
        imageSrc="/item_images/image/element/gamius/services-image.jpg"
      />
      
      <CaseStudyHighlight
        title={t('caseStudy.title')}
        subtitle="Sprite Gaming Experience"
        clientName="The Coca-Cola Company"
        description={t('caseStudy.description')}
        imageSrc="/item_images/image/element/gamius/sprite-case-study.jpg"
        stats={caseStudyStats}
        theme="gamius"
      />
      
      <ProcessTimeline
        title={t('process.title')}
        subtitle={t('process.subtitle')}
        steps={gamingProcess}
        theme="gamius"
      />
      
      <WorkGrid
        title={t('games.title')}
        subtitle={t('games.subtitle')}
        items={portfolioItems}
        theme="gamius"
        categories={['events', 'tournaments', 'competitions', 'content']}
      />
      
      <TestimonialCarousel
        testimonials={testimonials}
        theme="gamius"
      />

      {/* Added basic CTA section at the end */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">{t('microCta.title')}</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{t('microCta.subtitle')}</p>
          <a 
            href="#contact" 
            className="bg-gamius text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors inline-block"
          >
            {t('cta')}
          </a>
        </div>
      </section>
    </SubsidiaryLayout>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'Subsidiary.GAMIUS.Meta' });
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/item_images/image/element/gamius/og-image.jpg'],
    },
  };
} 