import React from 'react';
import { getTranslations } from 'next-intl/server';
import MPSHero from '@/components/organisms/MPSHero';
import FeatureSection from '@/components/molecules/FeatureSection';
import TestimonialCarousel from '@/components/molecules/TestimonialCarousel';
import SubsidiaryLayout from '@/components/templates/SubsidiaryLayout';
import CaseStudyHighlight from '@/components/molecules/CaseStudyHighlight';

// Hardcoded sample data - in a real app this would come from Sanity CMS
const mpsFeatures = [
  {
    title: "Brand Strategy Development",
    description: "We create comprehensive brand strategies that position your business for success in the modern marketplace.",
    icon: "/item_images/image/element/mps/strategy-icon.svg"
  },
  {
    title: "Creative Content Production",
    description: "Professional photography, videography, and graphic design services that elevate your brand's visual presence.",
    icon: "/item_images/image/element/mps/content-icon.svg"
  },
  {
    title: "Marketing Campaign Management",
    description: "End-to-end campaign planning, execution, and analysis to maximize your marketing ROI.",
    icon: "/item_images/image/element/mps/campaign-icon.svg"
  },
  {
    title: "Digital Media Optimization",
    description: "Data-driven approach to optimizing your digital media spend across platforms.",
    icon: "/item_images/image/element/mps/media-icon.svg"
  }
];

const mpsTestimonials = [
  {
    id: 1,
    quote: "MPS transformed our marketing approach completely. Their strategic insights and creative execution delivered remarkable results for our brand.",
    author: "Sarah Johnson",
    company: "Marketing Director, Marjane",
    avatar: "/item_images/image/element/mps/testimonial1.jpg"
  },
  {
    id: 2,
    quote: "Working with MPS has been a game-changer for our business. Their team's creativity and attention to detail are unmatched in the industry.",
    author: "Mohammed Al-Fasi",
    company: "CEO, Al-Fasi Group",
    avatar: "/item_images/image/element/mps/testimonial2.jpg"
  },
  {
    id: 3,
    quote: "The team at MPS delivered beyond our expectations. Their market insights helped us position our brand perfectly in a competitive landscape.",
    author: "Leila Benali",
    company: "Brand Manager, Nissan Morocco",
    avatar: "/item_images/image/element/mps/testimonial3.jpg"
  }
];

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function MPSPage({ params: { locale } }: PageProps) {
  // Get translations
  const t = await getTranslations('Subsidiary.MPS');

  // Format features based on translations
  const mpsFeatures = [
    {
      title: t('services.feature1.title'),
      description: t('services.feature1.description'),
      icon: "/item_images/image/element/mps/fabrication-icon.svg"
    },
    {
      title: t('services.feature2.title'),
      description: t('services.feature2.description'),
      icon: "/item_images/image/element/mps/printing-icon.svg"
    },
    {
      title: t('services.feature3.title'),
      description: t('services.feature3.description'),
      icon: "/item_images/image/element/mps/stands-icon.svg"
    }
  ];

  // Sample testimonials - in a real app this would come from Sanity CMS
  const mpsTestimonials = [
    {
      id: 1,
      quote: "MPS transformed our exhibition presence completely. Their precision manufacturing and creative execution delivered remarkable results for our brand.",
      author: "Sarah Johnson",
      company: "Marketing Director, Samsung Morocco",
      avatar: "/item_images/image/element/mps/testimonial1.jpg"
    },
    {
      id: 2,
      quote: "Working with MPS has been a game-changer for our physical marketing materials. Their attention to detail is unmatched in the industry.",
      author: "Mohammed Al-Fasi",
      company: "CEO, Al-Fasi Group",
      avatar: "/item_images/image/element/mps/testimonial2.jpg"
    },
    {
      id: 3,
      quote: "The team at MPS delivered beyond our expectations. Their manufacturing quality helped us position our brand perfectly in a competitive landscape.",
      author: "Leila Benali",
      company: "Brand Manager, Nissan Morocco",
      avatar: "/item_images/image/element/mps/testimonial3.jpg"
    }
  ];

  // Case study stats
  const caseStudyStats = [
    { label: 'Hours of CNC machining', value: '350+' },
    { label: 'LED light points', value: '64' },
    { label: 'Launch attendees', value: '500+' }
  ];

  return (
    <SubsidiaryLayout 
      subsidiary="mps"
      title={t('title')}
      description={t('description')}
    >
      <MPSHero 
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        imageSrc="/item_images/image/element/mps/hero-image.jpg"
      />
      
      <FeatureSection
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        features={mpsFeatures}
        theme="mps"
        imagePosition="right"
        imageSrc="/item_images/image/element/mps/services-image.jpg"
      />
      
      <CaseStudyHighlight
        title={t('caseStudy.title')}
        subtitle="Samsung Galaxy Unpacked Launch"
        clientName="Samsung Electronics"
        description={t('caseStudy.description')}
        imageSrc="/item_images/image/element/mps/samsung-case-study.jpg"
        stats={caseStudyStats}
        theme="mps"
      />
      
      <TestimonialCarousel
        testimonials={mpsTestimonials}
        theme="mps"
      />
      
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">{t('microCta.title')}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t('microCta.subtitle')}</p>
          <a 
            href="#contact" 
            className="bg-mps text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors inline-block"
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
  const t = await getTranslations({ locale, namespace: 'Subsidiary.MPS.Meta' });
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/item_images/image/element/mps/og-image.jpg'],
    },
  };
} 