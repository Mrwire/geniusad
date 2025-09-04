import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de cookies - Genius Ad District',
  description: 'Politique de cookies de Genius Ad District',
};

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Politique de cookies</h1>
      
      <section className="mb-8">
        <p className="mb-4">
          Dernière mise à jour : [Date]
        </p>
        <p className="mb-4">
          Cette politique de cookies explique ce que sont les cookies, comment nous les utilisons et comment vous pouvez les gérer lors de votre visite sur notre site web genius-ad-district.com.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Que sont les cookies ?</h2>
        <p className="mb-4">
          Les cookies sont de petits fichiers texte stockés sur votre appareil (ordinateur, tablette ou mobile) lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web ou les rendre plus efficaces, ainsi que pour fournir des informations aux propriétaires du site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Types de cookies que nous utilisons</h2>
        
        <h3 className="text-xl font-semibold mt-4 mb-2">Cookies essentiels</h3>
        <p className="mb-4">
          Ces cookies sont nécessaires au bon fonctionnement de notre site. Ils vous permettent de naviguer sur le site et d'utiliser ses fonctionnalités.
        </p>
        
        <h3 className="text-xl font-semibold mt-4 mb-2">Cookies de performance</h3>
        <p className="mb-4">
          Ces cookies recueillent des informations sur la façon dont les visiteurs utilisent notre site, par exemple les pages les plus visitées. Ces données nous aident à améliorer notre site.
        </p>
        
        <h3 className="text-xl font-semibold mt-4 mb-2">Cookies de fonctionnalité</h3>
        <p className="mb-4">
          Ces cookies permettent à notre site de se souvenir des choix que vous faites (comme votre nom d'utilisateur, votre langue ou votre région) et fournissent des fonctionnalités améliorées et plus personnelles.
        </p>
        
        <h3 className="text-xl font-semibold mt-4 mb-2">Cookies de ciblage</h3>
        <p className="mb-4">
          Ces cookies enregistrent votre visite sur notre site, les pages que vous avez visitées et les liens que vous avez suivis. Nous utiliserons ces informations pour afficher des publicités plus pertinentes pour vous.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Gestion des cookies</h2>
        <p className="mb-4">
          Vous pouvez gérer les paramètres de cookies via les paramètres de votre navigateur. Voici comment procéder selon votre navigateur :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Safari</a></li>
          <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Microsoft Edge</a></li>
        </ul>
        <p>
          Veuillez noter que la désactivation de certains cookies peut affecter votre expérience de navigation sur notre site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Consentement</h2>
        <p>
          En continuant à utiliser notre site, vous consentez à l'utilisation des cookies conformément à la présente politique. Si vous n'êtes pas d'accord avec notre utilisation des cookies, vous devez configurer les paramètres de votre navigateur en conséquence ou ne pas utiliser notre site.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">5. Contact</h2>
        <p>
          Si vous avez des questions concernant notre politique de cookies, veuillez nous contacter à l'adresse : contact@genius-ad-district.com
        </p>
      </section>
    </div>
  );
}
