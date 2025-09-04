import React from 'react';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { client } from '@/lib/sanity';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { PortableText } from '@portabletext/react';
import CaseStudyCard from '@/components/organisms/CaseStudyCard';
import Link from 'next/link';
import NissanCaseStudy from '@/components/templates/NissanCaseStudy';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

interface CaseStudyDetail {
  _id: string;
  title: string;
  client: string;
  description: string;
  coverImage: string;
  industry: string[];
  services: string[];
  content?: any;
  gallery?: {
    images: {
      asset: {
        url: string;
        metadata: {
          dimensions: {
            width: number;
            height: number;
          };
        };
      };
      alt?: string;
      caption?: string;
    }[];
  };
  subsidiary?: {
    _id: string;
    name: string;
    slug: string;
    color?: string;
  };
  relatedCaseStudies?: Array<{
    _id: string;
    title: string;
    client: string;
    description: string;
    coverImage: string;
    slug: string;
    industry: string[];
    services: string[];
    subsidiary?: {
      _id: string;
      name: string;
      slug: string;
    };
  }>;
  publishedAt: string;
  seo?: {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
}

async function getCaseStudyData(slug: string): Promise<CaseStudyDetail | null> {
  const caseStudy = await client.fetch(`*[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    client,
    description,
    coverImage,
    content,
    gallery,
    industry,
    services,
    publishedAt,
    subsidiary-> {
      _id,
      name,
      "slug": slug.current,
      "color": color.hex
    },
    "relatedCaseStudies": relatedCaseStudies[]-> {
      _id,
      title,
      client,
      description,
      coverImage,
      "slug": slug.current,
      industry,
      services,
      subsidiary-> {
        _id,
        name,
        "slug": slug.current
      }
    },
    seo
  }`, { slug });

  return caseStudy;
}

// Helper function to convert subsidiary slug to appropriate type for CaseStudyCard
function getSubsidiaryTheme(slug?: string): 'default' | 'mps' | 'labrigad' | 'gamius' | 'moujeleell' {
  if (!slug) return 'default';
  
  switch (slug) {
    case 'mps':
      return 'mps';
    case 'labrigad':
      return 'labrigad';
    case 'gamius':
      return 'gamius';
    case 'moujeleell':
      return 'moujeleell';
    default:
      return 'default';
  }
}

// Custom components for the PortableText renderer
import { PortableTextComponents } from '@portabletext/react';

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <div className="my-8 relative rounded-lg overflow-hidden">
          <Image
            src={value.asset.url}
            alt={value.alt || ''}
            width={value.asset.metadata.dimensions.width}
            height={value.asset.metadata.dimensions.height}
            className="object-cover"
          />
          {value.caption && (
            <div className="mt-2 text-sm text-gray-500 italic">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <Typography variant="h2" className="text-3xl font-bold mt-12 mb-6">
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography variant="h3" className="text-2xl font-semibold mt-8 mb-4">
        {children}
      </Typography>
    ),
    normal: ({ children }) => (
      <Typography variant="body" className="mb-6 text-gray-700 leading-relaxed">
        {children}
      </Typography>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-200 pl-4 my-6 italic text-gray-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = value?.href?.startsWith('/') ? undefined : 'noreferrer noopener';
      return (
        <a 
          href={value?.href || '#'} 
          rel={rel} 
          className="text-blue-500 hover:underline transition-colors"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700">{children}</ol>
    ),
  },
};

export default async function CaseStudyPage({ params: { locale, slug } }: PageProps) {
  const caseStudy = await getCaseStudyData(slug);
  const t = await getTranslations('CaseStudy');
  
  if (!caseStudy) {
    notFound();
  }

  // Format the date
  const publishDate = new Date(caseStudy.publishedAt);
  const formattedDate = new Intl.DateTimeFormat(locale, { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(publishDate);

  // Determine subsidiary theme
  const subsidiaryTheme = getSubsidiaryTheme(caseStudy.subsidiary?.slug);
  const subsidiaryColor = caseStudy.subsidiary?.color || '#000000';
  
  // Check if this is the Nissan case study
  const isNissanCaseStudy = caseStudy.client.toLowerCase().includes('nissan');
  
  // If this is the Nissan case study, use the specialized component
  if (isNissanCaseStudy) {
    // Map translations for the Nissan component
    const nissanTranslations = {
      exploreCase: t('exploreCase'),
      contactUs: t('contactUs'),
      impactNumbers: t('impactNumbers'),
      measurableResults: t('measurableResults'),
      visualGallery: t('visualGallery'),
      campaignShowcase: t('campaignShowcase'),
      galleryDescription: t('galleryDescription'),
      challengesSolutions: t('challengesSolutions'),
      theChallenge: t('theChallenge'),
      theSolution: t('theSolution'),
      testimonialHeading: t('testimonialHeading'),
      recognition: t('recognition'),
      awardWinning: t('awardWinning'),
      backToCaseStudies: t('backToCaseStudies')
    };
    
    // Extract challenges and solutions from content if available
    let challenges: string[] = [];
    let solutions: string[] = [];
    
    // Extract stats if available (example format)
    const stats = [
      { value: '+120%', label: t('engagementIncrease') },
      { value: '2.8M', label: t('impressions') },
      { value: '15%', label: t('salesIncrease') }
    ];
    
    // Example testimonial
    const testimonial = {
      quote: "The campaign delivered exceptional results and exceeded our expectations in terms of engagement and brand perception.",
      author: "John Smith",
      position: "Marketing Director",
      company: "Nissan",
    };
    
    // Example awards
    const awards = [
      "Best Automotive Campaign 2023",
      "Digital Innovation Award",
      "Creative Excellence Award"
    ];
    
    return (
      <NissanCaseStudy
        title={caseStudy.title}
        client={caseStudy.client}
        description={caseStudy.description}
        coverImage={caseStudy.coverImage}
        heroVideo="/videos/nissan-hero.mp4"
        gallery={caseStudy.gallery}
        stats={stats}
        testimonial={testimonial}
        awards={awards}
        challenges={challenges}
        solutions={solutions}
        locale={locale}
        translations={nissanTranslations}
      />
    );
  }
  
  // Regular case study template for non-Nissan case studies
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] bg-black">
        {caseStudy.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={caseStudy.coverImage}
              alt={caseStudy.title}
              fill
              sizes="100vw"
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="opacity-70"
            />
            <div 
              className="absolute inset-0" 
              style={{ 
                background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)${
                  subsidiaryTheme !== 'default' ? `, linear-gradient(45deg, transparent 0%, ${subsidiaryColor}40 100%)` : ''
                }`
              }}
            ></div>
          </div>
        )}

        <div className="container relative z-10 h-full mx-auto px-4 flex flex-col justify-end pb-16">
          <div className="max-w-4xl text-white">
            <Typography variant="label" className="text-sm md:text-base uppercase tracking-wider mb-3 opacity-80">
              {caseStudy.client}
            </Typography>

            <Typography variant="h1" className="text-4xl md:text-6xl font-bold mb-6">
              {caseStudy.title}
            </Typography>

            <div className="flex flex-wrap gap-2 mb-8">
              {caseStudy.industry.map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Sidebar */}
            <div className="md:col-span-3 order-2 md:order-1">
              <div className="sticky top-24 bg-gray-50 rounded-xl p-6 shadow-sm">
                <Typography variant="h4" className="text-xl font-semibold mb-6">
                  {t('projectDetails')}
                </Typography>

                <div className="space-y-4">
                  <div>
                    <Typography variant="label" className="text-sm text-gray-500 mb-1">
                      {t('client')}
                    </Typography>
                    <Typography variant="body" className="font-medium">
                      {caseStudy.client}
                    </Typography>
                  </div>

                  <div>
                    <Typography variant="label" className="text-sm text-gray-500 mb-1">
                      {t('date')}
                    </Typography>
                    <Typography variant="body" className="font-medium">
                      {formattedDate}
                    </Typography>
                  </div>

                  {caseStudy.subsidiary && (
                    <div>
                      <Typography variant="label" className="text-sm text-gray-500 mb-1">
                        {t('subsidiary')}
                      </Typography>
                      <Typography variant="body" className="font-medium">
                        {caseStudy.subsidiary.name}
                      </Typography>
                    </div>
                  )}

                  {caseStudy.services && caseStudy.services.length > 0 && (
                    <div>
                      <Typography variant="label" className="text-sm text-gray-500 mb-1">
                        {t('services')}
                      </Typography>
                      <ul className="space-y-1">
                        {caseStudy.services.map((service) => (
                          <li key={service} className="font-medium">
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Button 
                    variant="primary" 
                    subsidiary={subsidiaryTheme !== 'default' ? subsidiaryTheme : undefined}
                    className="w-full justify-center"
                  >
                    {t('contactForSimilarProject')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-9 order-1 md:order-2">
              <div className="max-w-3xl">
                <Typography variant="body" className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-12">
                  {caseStudy.description}
                </Typography>

                {caseStudy.content && (
                  <div className="prose prose-lg max-w-none">
                    <PortableText 
                      value={caseStudy.content} 
                      components={portableTextComponents} 
                    />
                  </div>
                )}
              </div>

              {/* Gallery */}
              {caseStudy.gallery && caseStudy.gallery.images && caseStudy.gallery.images.length > 0 && (
                <div className="mt-16">
                  <Typography variant="h2" className="text-3xl font-bold mb-8">
                    {t('gallery')}
                  </Typography>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caseStudy.gallery.images.map((image, index) => (
                      <div 
                        key={index} 
                        className="relative aspect-square overflow-hidden rounded-lg shadow-md transition-transform hover:scale-[1.02] cursor-pointer"
                      >
                        <Image
                          src={image.asset.url}
                          alt={image.alt || `Gallery image ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform hover:scale-110 duration-500"
                        />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-sm">
                            {image.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      {caseStudy.relatedCaseStudies && caseStudy.relatedCaseStudies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <Typography variant="h2" className="text-3xl font-bold mb-12">
              {t('relatedCaseStudies')}
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudy.relatedCaseStudies.map((relatedCase) => (
                <CaseStudyCard
                  key={relatedCase._id}
                  id={relatedCase._id}
                  title={relatedCase.title}
                  client={relatedCase.client}
                  description={relatedCase.description}
                  coverImage={relatedCase.coverImage}
                  industry={relatedCase.industry || []}
                  services={relatedCase.services || []}
                  slug={relatedCase.slug}
                  subsidiary={getSubsidiaryTheme(relatedCase.subsidiary?.slug)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to Case Studies Link */}
      <section className="py-16 text-center">
        <Link href={`/${locale}/case-studies`} className="inline-flex items-center text-gray-600 hover:text-black transition-colors">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="mr-2"
          >
            <path d="m15 18-6-6 6-6"/>
          </svg> 
          {t('backToCaseStudies')}
        </Link>
      </section>
    </main>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params: { locale, slug } }: PageProps) {
  const caseStudy = await getCaseStudyData(slug);
  const t = await getTranslations({ locale, namespace: 'CaseStudy.Meta' });
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }
  
  return {
    title: caseStudy.seo?.title || caseStudy.title,
    description: caseStudy.seo?.description || caseStudy.description,
    openGraph: {
      title: caseStudy.seo?.ogTitle || caseStudy.title,
      description: caseStudy.seo?.ogDescription || caseStudy.description,
      images: caseStudy.seo?.ogImage ? [caseStudy.seo.ogImage] : [caseStudy.coverImage],
    },
  };
}

// Generate static params for all case studies
export async function generateStaticParams() {
  try {
    const caseStudies = await client.fetch(`*[_type == "caseStudy"] {
      "slug": slug.current,
    }`);
    if (!Array.isArray(caseStudies)) return [];
    return caseStudies.map((caseStudy: { slug: string }) => ({
      slug: caseStudy.slug,
    }));
  } catch {
    return [];
  }
}
