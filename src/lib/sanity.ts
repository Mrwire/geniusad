import { createClient } from 'next-sanity';

// Use environment variables for configuration
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-project-id';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';
export const token = process.env.SANITY_API_TOKEN;

// Check if we have a projectId before creating the client
if (!projectId || projectId === 'placeholder-project-id') {
  console.warn('Sanity project ID is not set. Features requiring Sanity will not work.');
}

// Mock client for development without Sanity credentials
const mockClient = {
  fetch: async () => {
    console.warn('Using mock Sanity client. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local for real data.');
    return null;
  }
};

// Create real client or use mock client
export const client = projectId && projectId !== 'placeholder-project-id' 
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: typeof document !== 'undefined', // use CDN in browser, not in server
      token, // Include token for authenticated requests
    })
  : mockClient;

// Helper function to fetch data from Sanity
export async function fetchFromSanity(query: string, params = {}) {
  try {
    // If we don't have a real project ID, return mock data
    if (!projectId || projectId === 'placeholder-project-id') {
      console.warn('Using mock data. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local for real data.');
      return null;
    }
    return await client.fetch(query, params);
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    return null;
  }
}

// GROQ queries for various content types
export const QUERIES = {
  // Homepage
  getHomepage: `*[_type == "homepage"][0] {
    title,
    subtitle,
    heroImage,
    sections[] {
      _type == 'heroSection' => {
        _type,
        title,
        subtitle,
        primaryCta,
        secondaryCta,
        backgroundImage,
        backgroundColor,
        textColor
      },
      _type == 'featuredCaseStudies' => {
        _type,
        title,
        subtitle,
        caseStudies[]->
      },
      _type == 'subsidiarySection' => {
        _type,
        title,
        subtitle,
        subsidiaries[]->
      },
      _type == 'servicesSection' => {
        _type,
        title,
        subtitle,
        services[]
      },
      _type == 'testimonialSection' => {
        _type,
        title,
        subtitle,
        testimonials[]->
      },
      _type == 'ctaSection' => {
        _type,
        title,
        subtitle,
        primaryCta,
        secondaryCta,
        backgroundColor
      }
    }
  }`,

  // Case Studies
  getAllCaseStudies: `*[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    description,
    coverImage,
    featured,
    industry,
    services,
    publishedAt
  }`,

  getCaseStudyBySlug: `*[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    description,
    coverImage,
    content[] {
      // Portable Text content
    },
    gallery,
    featured,
    industry,
    services,
    publishedAt,
    relatedCaseStudies[]->{
      _id,
      title,
      slug,
      client,
      description,
      coverImage
    }
  }`,

  // Subsidiaries
  getAllSubsidiaries: `*[_type == "subsidiary"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    logo,
    colorScheme
  }`,

  getSubsidiaryBySlug: `*[_type == "subsidiary" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    logo,
    colorScheme,
    content[] {
      // Portable Text content
    },
    caseStudies[]->{
      _id,
      title,
      slug,
      client,
      description,
      coverImage
    },
    services
  }`,

  // Global Settings
  getGlobalSettings: `*[_type == "siteSettings"][0] {
    siteName,
    contact {
      email,
      phone,
      address
    },
    socialMedia {
      facebook,
      instagram,
      twitter,
      linkedin
    },
    navigation {
      mainMenu,
      footerMenu
    },
    footer {
      copyright,
      columns[]
    }
  }`
}; 