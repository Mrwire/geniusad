import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,
  
  // Always show the locale prefix in URLs 
  // (changing from 'as-needed' to 'always' ensures proper locale detection)
  localePrefix: 'always',
});

export const config = {
  // Skip all paths that should not be internationalized. This includes
  // API routes, static files, Next.js internals, etc.
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 