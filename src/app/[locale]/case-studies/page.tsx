import React from 'react';
import { getTranslations } from 'next-intl/server';
import { client } from '@/lib/sanity';
import { Button } from '@/components/atoms/Button';
import CaseStudyCard from '@/components/organisms/CaseStudyCard';
import { Typography } from '@/components/atoms/Typography';
import Image from 'next/image';

interface PageProps {
  params: {
    locale: string;
  };
}

interface CaseStudy {
  _id: string;
  title: string;
  client: string;
  description: string;
  coverImage: string;
  slug: string;
  industry: string[];
  services: string[];
  featured: boolean;
  subsidiary?: {
    _id: string;
    name: string;
    slug: string;
  };
}

interface PageData {
  title?: string;
  subtitle?: string;
  introduction?: string;
  heroImage?: string;
  filters?: {
    showIndustryFilter?: boolean;
    showCategoryFilter?: boolean;
    showSubsidiaryFilter?: boolean;
  };
  featuredCaseStudy?: CaseStudy;
  seo?: {
    title?: string;
    description?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
}

async function getCaseStudiesData(): Promise<{ pageData: PageData; caseStudies: CaseStudy[] }> {
  const pageData = await client.fetch(`*[_type == "caseStudiesPage"][0] {
    title,
    subtitle,
    introduction,
    heroImage,
    filters,
    featuredCaseStudy-> {
      _id,
      title,
      client,
      description,
      coverImage,
      slug,
      industry,
      services,
      featured,
      subsidiary-> {
        _id,
        name,
        slug
      }
    },
    seo
  }`);

  const caseStudies = await client.fetch(`*[_type == "caseStudy"] | order(featured desc, publishedAt desc) {
    _id,
    title,
    client,
    description,
    coverImage,
    "slug": slug.current,
    industry,
    services,
    featured,
    subsidiary-> {
      _id,
      name,
      "slug": slug.current
    }
  }`);

  return { pageData: pageData || {}, caseStudies: caseStudies || [] };
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

export default async function CaseStudiesPage({ params: { locale } }: PageProps) {
  const { pageData, caseStudies } = await getCaseStudiesData();
  const t = await getTranslations('CaseStudies');

  // Get all unique filter options from case studies
  const industries = [...new Set(caseStudies.flatMap(cs => cs.industry || []))];
  const services = [...new Set(caseStudies.flatMap(cs => cs.services || []))];
  const subsidiaries = [...new Set(caseStudies.map(cs => cs.subsidiary?.name).filter(Boolean))];

  // Extract featured case study for hero section
  const featuredCaseStudy = pageData.featuredCaseStudy || caseStudies.find(cs => cs.featured);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white overflow-hidden">
        {pageData.heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={pageData.heroImage}
              alt={pageData.title || "Case Studies"}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              className="opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90"></div>
          </div>
        )}
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <Typography variant="label" className="text-sm font-medium uppercase tracking-wider mb-4 text-gray-300">
              {t('tagline')}
            </Typography>
            
            <Typography variant="h1" className="text-4xl md:text-6xl font-bold mb-6">
              {pageData.title || t('title')}
            </Typography>
            
            <Typography variant="h4" className="text-xl md:text-2xl font-normal text-gray-300 mb-8">
              {pageData.subtitle || t('subtitle')}
            </Typography>
            
            <Typography variant="body" className="text-gray-400 max-w-2xl mb-12">
              {pageData.introduction || t('introduction')}
            </Typography>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      {featuredCaseStudy && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <Typography variant="h2" className="text-3xl font-bold mb-12">
              {t('featured.title')}
            </Typography>
            
            <div className="max-w-6xl mx-auto">
              <CaseStudyCard
                id={featuredCaseStudy._id}
                title={featuredCaseStudy.title}
                client={featuredCaseStudy.client}
                description={featuredCaseStudy.description}
                coverImage={featuredCaseStudy.coverImage}
                industry={featuredCaseStudy.industry || []}
                services={featuredCaseStudy.services || []}
                slug={featuredCaseStudy.slug}
                highlight={true}
                featured={true}
                subsidiary={getSubsidiaryTheme(featuredCaseStudy.subsidiary?.slug)}
                className="transform-none opacity-100"
              />
            </div>
          </div>
        </section>
      )}

      {/* Case Studies with Filters */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <Typography variant="h2" className="text-3xl font-bold mb-4 md:mb-0">
              {t('allCaseStudies.title')}
            </Typography>
            
            {/* Client-side Filters */}
            <div className="flex flex-wrap gap-4" id="filters">
              {pageData.filters?.showIndustryFilter && industries.length > 0 && (
                <div className="relative group">
                  <Button variant="secondary" className="flex items-center gap-2">
                    {t('filters.industry')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
                  </Button>
                  
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {industries.map((industry) => (
                        <button
                          key={industry}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          role="menuitem"
                          data-filter="industry"
                          data-value={industry}
                        >
                          {industry}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {pageData.filters?.showCategoryFilter && services.length > 0 && (
                <div className="relative group">
                  <Button variant="secondary" className="flex items-center gap-2">
                    {t('filters.service')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
                  </Button>
                  
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {services.map((service) => (
                        <button
                          key={service}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          role="menuitem"
                          data-filter="service"
                          data-value={service}
                        >
                          {service}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {pageData.filters?.showSubsidiaryFilter && subsidiaries.length > 0 && (
                <div className="relative group">
                  <Button variant="secondary" className="flex items-center gap-2">
                    {t('filters.subsidiary')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m6 9 6 6 6-6"/></svg>
                  </Button>
                  
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {subsidiaries.map((subsidiary) => (
                        <button
                          key={subsidiary}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          role="menuitem"
                          data-filter="subsidiary"
                          data-value={subsidiary}
                        >
                          {subsidiary}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Reset filters button */}
              <Button variant="tertiary" id="reset-filters">
                {t('filters.reset')}
              </Button>
            </div>
          </div>
          
          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="case-studies-grid">
            {caseStudies.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy._id}
                id={caseStudy._id}
                title={caseStudy.title}
                client={caseStudy.client}
                description={caseStudy.description}
                coverImage={caseStudy.coverImage}
                industry={caseStudy.industry || []}
                services={caseStudy.services || []}
                slug={caseStudy.slug}
                featured={caseStudy.featured}
                subsidiary={getSubsidiaryTheme(caseStudy.subsidiary?.slug)}
              />
            ))}
          </div>
          
          {/* Empty state message (initially hidden) */}
          <div id="no-results" className="py-16 text-center hidden">
            <Typography variant="h4" className="text-xl font-medium text-gray-500 mb-4">
              {t('noResults.title')}
            </Typography>
            <Typography variant="body" className="text-gray-400 mb-8">
              {t('noResults.description')}
            </Typography>
            <Button variant="primary" id="clear-filters">
              {t('noResults.action')}
            </Button>
          </div>
        </div>
      </section>
      
      {/* Client-side filtering script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', () => {
              const caseStudiesGrid = document.getElementById('case-studies-grid');
              const noResultsSection = document.getElementById('no-results');
              const caseStudies = Array.from(caseStudiesGrid.children);
              const resetFiltersBtn = document.getElementById('reset-filters');
              const clearFiltersBtn = document.getElementById('clear-filters');
              
              let activeFilters = {
                industry: null,
                service: null,
                subsidiary: null
              };
              
              // Filter buttons click handler
              document.querySelectorAll('[data-filter]').forEach(button => {
                button.addEventListener('click', function() {
                  const filterType = this.dataset.filter;
                  const filterValue = this.dataset.value;
                  
                  activeFilters[filterType] = filterValue;
                  applyFilters();
                });
              });
              
              // Reset filters handler
              resetFiltersBtn.addEventListener('click', function() {
                activeFilters = {
                  industry: null,
                  service: null,
                  subsidiary: null
                };
                applyFilters();
              });
              
              // Clear filters handler from no-results section
              clearFiltersBtn.addEventListener('click', function() {
                resetFiltersBtn.click();
              });
              
              // Apply active filters
              function applyFilters() {
                let hasActiveFilters = Object.values(activeFilters).some(value => value !== null);
                let hasVisibleItems = false;
                
                caseStudies.forEach(card => {
                  const cardIndustries = JSON.parse(card.dataset.industry || '[]');
                  const cardServices = JSON.parse(card.dataset.services || '[]');
                  const cardSubsidiary = card.dataset.subsidiary;
                  
                  let industryMatch = activeFilters.industry ? cardIndustries.includes(activeFilters.industry) : true;
                  let serviceMatch = activeFilters.service ? cardServices.includes(activeFilters.service) : true;
                  let subsidiaryMatch = activeFilters.subsidiary ? cardSubsidiary === activeFilters.subsidiary : true;
                  
                  let isVisible = industryMatch && serviceMatch && subsidiaryMatch;
                  
                  card.style.display = isVisible ? 'block' : 'none';
                  
                  if (isVisible) {
                    hasVisibleItems = true;
                  }
                });
                
                // Toggle no results message
                noResultsSection.style.display = hasActiveFilters && !hasVisibleItems ? 'block' : 'none';
              }
            });
          `,
        }}
      />
    </main>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params: { locale } }: PageProps) {
  const { pageData } = await getCaseStudiesData();
  const t = await getTranslations({ locale, namespace: 'CaseStudies.Meta' });
  
  return {
    title: pageData.seo?.title || t('title'),
    description: pageData.seo?.description || t('description'),
    openGraph: {
      title: pageData.seo?.ogTitle || t('ogTitle'),
      description: pageData.seo?.ogDescription || t('ogDescription'),
      images: pageData.seo?.ogImage ? [pageData.seo.ogImage] : ['/images/og-case-studies.jpg'],
    },
  };
} 