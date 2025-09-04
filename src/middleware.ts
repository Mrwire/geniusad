import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  // The default locale to use when visiting a non-locale prefixed path
  defaultLocale,
  // This is a feature that will redirect to the preferred locale if none is found
  localePrefix: 'as-needed',
  // Redirect to locale path if not found
  localeDetection: true
});

export const config = {
  // Match all pathnames except for those starting with /api, /_next, /static, etc.
  matcher: ['/((?!api|_next|_vercel|assets|fonts|images|static|favicon.ico|.*\\..*).*)']
};
