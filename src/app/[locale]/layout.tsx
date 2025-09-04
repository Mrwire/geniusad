import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/i18n/config';
import { generateI18nMetadata } from '@/lib/i18n-metadata';
import SkipNavigation from '@/components/atoms/SkipNavigation';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return generateI18nMetadata(locale, {
    title: {
      en: 'Genius Ad District - Premium Communication Agency',
      fr: 'Genius Ad District - Agence de Communication Premium'
    },
    description: {
      en: 'Premium communication agency in Morocco and MEA region specializing in 360° campaigns, events, and digital solutions.',
      fr: 'Agence de communication premium au Maroc et dans la région MEA spécialisée dans les campagnes 360°, événements et solutions digitales.'
    },
    keywords: {
      en: ['advertising', 'marketing', 'events', 'esports', 'Morocco', 'MEA', 'communication', 'design'],
      fr: ['publicité', 'marketing', 'événements', 'esports', 'Maroc', 'MEA', 'communication', 'design']
    },
    pathname: '/'
  });
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Import the messages for the requested locale
  let messages;
  try {
    messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider defaultTheme="genius">
        <SkipNavigation />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}