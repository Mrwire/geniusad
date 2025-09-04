import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'fr'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // Si la locale est indéfinie, utiliser la locale par défaut
  const localeToUse = locale || defaultLocale;
  
  try {
    // Load messages for the requested locale
    const messages = (await import(`./messages/${localeToUse}.json`)).default;

    return {
      locale: localeToUse,
      messages,
      // You can provide date, time and number formats too
      timeZone: 'Europe/Paris',
      formats: {
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          },
        },
      },
      onError: () => {
        // Avoid build-time crashes on missing messages in production
      },
      getMessageFallback: ({ key }) => key,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${localeToUse}`, error);
    
    // Fallback to English if the requested locale fails to load
    const fallbackMessages = (await import(`./messages/en.json`)).default;
    
    return {
      locale: 'en',
      messages: fallbackMessages,
      timeZone: 'Europe/Paris',
      formats: {
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          },
        },
      },
      onError: () => {},
      getMessageFallback: ({ key }) => key,
    };
  }
}); 
