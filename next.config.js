/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')('./src/i18n/config.ts');

const nextConfig = {
  assetPrefix: '',
  basePath: '',
  eslint: {
    // Allow production builds to succeed even with ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allow production builds to succeed even with TS errors
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost', '141.94.214.59'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  // Add React strict mode for better error detection
  reactStrictMode: true,
  // Increase timeout for slow builds
  experimental: {
    serverComponentsExternalPackages: ['@sanity/client', 'next-sanity'],
    // Force i18n to work in development
    forceSwcTransforms: true,
  },
  // Disable the error overlay in development
  onDemandEntries: {
    // Don't dispose of pages as frequently
    maxInactiveAge: 1000 * 60 * 60,
  },
};

module.exports = withNextIntl(nextConfig);
