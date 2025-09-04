import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité - Genius Ad District',
  description: 'Politique de confidentialité de Genius Ad District',
};

export default function ConfidentialitePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>
      
      <section className="mb-8">
        <p className="mb-4">
          Dernière mise à jour : [Date]
        </p>
        <p className="mb-4">
          Genius Ad District (ci-après dénommé « nous », « notre » ou « nos ») s'engage à protéger et respecter votre vie privée. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Données que nous collectons</h2>
        <p className="mb-2">Nous pouvons collecter et traiter les données suivantes :</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Informations que vous nous fournissez en remplissant des formulaires sur notre site</li>
          <li>Détails de votre visite sur notre site et des ressources auxquelles vous accédez</li>
          <li>Informations que vous fournissez lorsque vous nous contactez</li>
          <li>Données de localisation et d'utilisation</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Utilisation des données</h2>
        <p className="mb-2">Nous utilisons les informations que nous recueillons pour :</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Fournir et améliorer nos services</li>
          <li>Vous contacter concernant nos services</li>
          <li>Personnaliser votre expérience sur notre site</li>
          <li>Répondre à vos demandes et questions</li>
          <li>Envoyer des communications marketing (si vous y avez consenti)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Partage des données</h2>
        <p>
          Nous ne vendons ni ne louons vos données personnelles à des tiers. Nous pouvons partager vos informations avec :
        </p>
        <ul className="list-disc pl-6 mt-2 mb-4">
          <li>Nos fournisseurs de services qui nous aident à exploiter notre entreprise</li>
          <li>Les autorités compétentes si la loi nous y oblige</li>
          <li>Les entreprises avec lesquelles nous pourrions fusionner ou qui pourraient nous acquérir</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Vos droits</h2>
        <p className="mb-2">Vous avez le droit de :</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Accéder à vos données personnelles</li>
          <li>Demander la rectification de vos données</li>
          <li>Demander l'effacement de vos données</li>
          <li>Vous opposer au traitement de vos données</li>
          <li>Demander la limitation du traitement</li>
          <li>Demander la portabilité de vos données</li>
          <li>Retirer votre consentement à tout moment</li>
        </ul>
        <p>Pour exercer ces droits, veuillez nous contacter à l'adresse : contact@genius-ad-district.com</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
        <p>
          Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour indiquer quand un cookie est envoyé.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">6. Modifications de la politique de confidentialité</h2>
        <p>
          Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous conseillons de consulter régulièrement cette page pour vous tenir informé des éventuelles modifications.
        </p>
      </section>
    </div>
  );
}
