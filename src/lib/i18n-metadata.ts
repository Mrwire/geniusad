import { Metadata } from 'next';

type MetadataParams = {
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  keywords?: {
    en: string[];
    fr: string[];
  };
  ogImage?: string;
  pathname: string;
}

/**
 * Generates internationalized metadata for pages
 * 
 * @param locale Current locale
 * @param params Metadata parameters in both languages
 * @returns Next.js Metadata object
 */
export function generateI18nMetadata(
  locale: string,
  { title, description, keywords, ogImage, pathname }: MetadataParams
): Metadata {
  // Determine which language to use
  const isEnglish = locale === 'en';
  
  // Join keywords into a comma-separated string if provided
  const keywordsString = keywords 
    ? (isEnglish ? keywords.en.join(', ') : keywords.fr.join(', '))
    : undefined;
    
  // Base URL for the site
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://geniusaddistrict.com';
  
  // Default OG image
  const defaultOgImage = `${baseUrl}/og-image.jpg`;
  
  // Construct canonical and alternate URLs
  const canonicalPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  
  return {
    title: isEnglish ? title.en : title.fr,
    description: isEnglish ? description.en : description.fr,
    keywords: keywordsString,
    authors: [{ name: 'Genius Ad District' }],
    metadataBase: new URL(baseUrl),
    
    // OpenGraph metadata
    openGraph: {
      title: isEnglish ? title.en : title.fr,
      description: isEnglish ? description.en : description.fr,
      url: canonicalUrl,
      siteName: 'Genius Ad District',
      images: [
        {
          url: ogImage || defaultOgImage,
          width: 1200,
          height: 630,
          alt: isEnglish ? title.en : title.fr,
        },
      ],
      locale: locale,
      type: 'website',
    },
    
    // Twitter metadata
    twitter: {
      card: 'summary_large_image',
      title: isEnglish ? title.en : title.fr,
      description: isEnglish ? description.en : description.fr,
      images: [ogImage || defaultOgImage],
      creator: '@GeniusAdDistrict',
    },
    
    // Alternate language versions and canonical
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en${canonicalPath}`,
        'fr': `${baseUrl}/fr${canonicalPath}`,
      },
    },
    
    // Robots
    robots: {
      index: true,
      follow: true,
    },
  };
} 