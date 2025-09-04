import { getTranslations } from 'next-intl/server';
import LoginForm from '@/components/organisms/LoginForm';
import { generateUiComponent } from '@/lib/mcp-config';

// Utilise la fonction d'assistance 21st-dev/magic pour générer des styles améliorés
// pour le composant de login lors du build
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'Auth.Login' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default async function LoginPage({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'Auth.Login' });

  // Note: Normalement, on utiliserait la fonction generateUiComponent directement 
  // dans le composant client, mais pour la démo nous l'incluons ici en commentaire
  /*
  // Exemple d'utilisation avec 21st-dev/magic (côté client)
  const enhancedLoginStyles = await generateUiComponent({
    type: 'styles',
    name: 'LoginPageStyles',
    description: 'Modern, Apple-inspired login page with animations and glass effect',
    componentType: 'auth'
  });
  */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden relative backdrop-blur-sm bg-white/90 border border-gray-100">
        {/* Effet de lumière subtil */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-black to-transparent opacity-10"></div>
        
        <div className="px-8 pt-8 pb-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
              {t('welcomeBack')}
            </h1>
            <p className="text-gray-600">
              {t('signInToContinue')}
            </p>
          </div>
          
          <LoginForm 
            locale={locale} 
            translations={{
              email: t('form.email'),
              password: t('form.password'),
              forgotPassword: t('form.forgotPassword'),
              rememberMe: t('form.rememberMe'),
              login: t('form.login'),
              noAccount: t('form.noAccount'),
              contactUs: t('form.contactUs')
            }}
          />
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              {t('needHelp')}{' '}
              <a href="#" className="text-black font-medium hover:underline">
                {t('contactSupport')}
              </a>
            </p>
          </div>
        </div>
        
        {/* Footer avec pattern subtil */}
        <div className="py-4 px-8 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500">
            &copy; {new Date().getFullYear()} Genius Ad District. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </div>
  );
} 