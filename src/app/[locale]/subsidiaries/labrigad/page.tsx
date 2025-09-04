import React from 'react';
import { getTranslations } from 'next-intl/server';
import LABRIGAdHero from '@/components/organisms/LABRIGAdHero';
import FeatureSection from '@/components/molecules/FeatureSection';
import ProcessTimeline from '@/components/molecules/ProcessTimeline';
import WorkGrid from '@/components/molecules/WorkGrid';
import TestimonialCarousel from '@/components/molecules/TestimonialCarousel';
import SubsidiaryLayout from '@/components/templates/SubsidiaryLayout';

// Sample data for LABRIG'Ad - in a real app, this would come from Sanity CMS
const labrigadFeatures = [
  {
    title: "Brand Identity Design",
    description: "We craft unique, memorable brand identities that capture your essence and resonate with your audience.",
    icon: "/item_images/image/element/labrigad/identity-icon.svg"
  },
  {
    title: "Print & Packaging",
    description: "Our print and packaging solutions blend form and function to create memorable touchpoints for your brand.",
    icon: "/item_images/image/element/labrigad/print-icon.svg"
  },
  {
    title: "Environmental Design",
    description: "We create immersive spatial experiences that bring your brand to life in physical environments.",
    icon: "/item_images/image/element/labrigad/environmental-icon.svg"
  },
  {
    title: "UI/UX Design",
    description: "Human-centered digital experiences that delight users while meeting business objectives.",
    icon: "/item_images/image/element/labrigad/ui-icon.svg"
  }
];

const designProcess = [
  {
    number: "01",
    title: "Discovery",
    description: "We research your brand, audience, and competitors to gain essential insights."
  },
  {
    number: "02",
    title: "Strategy",
    description: "Developing a strategic direction that aligns with your brand goals."
  },
  {
    number: "03",
    title: "Design",
    description: "Creating thoughtful design solutions with multiple iterations and refinements."
  },
  {
    number: "04",
    title: "Implementation",
    description: "Delivering finalized assets and supporting the launch across all channels."
  }
];

const portfolioItems = [
  {
    id: 1,
    title: "Marjane Rebrand",
    category: "branding",
    image: "/item_images/image/element/labrigad/portfolio1.jpg"
  },
  {
    id: 2,
    title: "OCP Annual Report",
    category: "print",
    image: "/item_images/image/element/labrigad/portfolio2.jpg"
  },
  {
    id: 3,
    title: "Festival Timitar",
    category: "environmental",
    image: "/item_images/image/element/labrigad/portfolio3.jpg"
  },
  {
    id: 4,
    title: "Inwi Digital Platform",
    category: "digital",
    image: "/item_images/image/element/labrigad/portfolio4.jpg"
  },
  {
    id: 5,
    title: "Moroccan Tea Packaging",
    category: "packaging",
    image: "/item_images/image/element/labrigad/portfolio5.jpg"
  },
  {
    id: 6,
    title: "Bank of Africa Signage",
    category: "environmental",
    image: "/item_images/image/element/labrigad/portfolio6.jpg"
  }
];

const testimonials = [
  {
    id: 1,
    quote: "LABRIG'Ad transformed our brand with a design that perfectly captures our values and resonates with our customers. Their creativity and strategic thinking are outstanding.",
    author: "Mehdi Tazi",
    company: "Marketing Director, BMCE Bank",
    avatar: "/item_images/image/element/labrigad/testimonial1.jpg"
  },
  {
    id: 2,
    quote: "The packaging design LABRIG'Ad created for our product line has significantly increased our shelf presence and customer engagement. True masters of their craft.",
    author: "Fatima Zahra El Othmani",
    company: "CEO, Moroccan Delights",
    avatar: "/item_images/image/element/labrigad/testimonial2.jpg"
  },
  {
    id: 3,
    quote: "Working with LABRIG'Ad on our exhibition space was a game-changer. They created an immersive brand experience that visitors are still talking about.",
    author: "Karim Bennani",
    company: "Event Manager, Casa Events",
    avatar: "/item_images/image/element/labrigad/testimonial3.jpg"
  }
];

interface PageProps {
  params: {
    locale: string;
  };
}

export default async function LABRIGAdPage({ params: { locale } }: PageProps) {
  // Get translations
  const t = await getTranslations('Subsidiary.LABRIGAD');

  return (
    <SubsidiaryLayout 
      subsidiary="labrigad"
      title={t('title')}
      description={t('description')}
    >
      <LABRIGAdHero 
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        imageSrc="/item_images/image/element/labrigad/hero-image.jpg"
      />
      
      <FeatureSection
        title={t('services.title')}
        subtitle={t('services.subtitle')}
        features={labrigadFeatures}
        theme="labrigad"
        imagePosition="left"
        imageSrc="/item_images/image/element/labrigad/services-image.jpg"
      />
      
      <ProcessTimeline
        title={t('process.title')}
        subtitle={t('process.subtitle')}
        steps={designProcess}
        theme="labrigad"
      />
      
      <WorkGrid
        title={t('work.title')}
        subtitle={t('work.subtitle')}
        items={portfolioItems}
        theme="labrigad"
        categories={['branding', 'print', 'packaging', 'environmental', 'digital']}
      />
      
      <TestimonialCarousel
        testimonials={testimonials}
        theme="labrigad"
      />
    </SubsidiaryLayout>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'Subsidiary.LABRIGAD.Meta' });
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: ['/item_images/image/element/labrigad/og-image.jpg'],
    },
  };
} 