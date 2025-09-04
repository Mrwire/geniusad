import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions Légales - Genius Ad District',
  description: 'Mentions légales du site Genius Ad District',
};

export default function MentionsLegalesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Éditeur du site</h2>
        <p>Le site internet genius-ad-district.com est édité par :</p>
        <p className="mt-2">
          <strong>Genius Ad District</strong><br />
          Siège social : [Adresse complète]<br />
          Téléphone : [Numéro de téléphone]<br />
          Email : contact@genius-ad-district.com<br />
          Capital social : [Montant] €<br />
          RCS : [Ville] [Numéro RCS]<br />
          N° TVA intracommunautaire : [Numéro de TVA]
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Directeur de la publication</h2>
        <p>[Nom et prénom du directeur de la publication]</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Hébergement</h2>
        <p>
          Le site est hébergé par :<br />
          [Nom de l'hébergeur]<br />
          [Adresse de l'hébergeur]<br />
          Téléphone : [Numéro de téléphone]
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Propriété intellectuelle</h2>
        <p>
          L'ensemble des éléments constituant le site (textes, images, logos, etc.) est la propriété exclusive de Genius Ad District ou de ses partenaires. Toute reproduction, représentation, modification, publication, transmission ou dénaturation de tout ou partie du site est strictement interdite sans autorisation écrite préalable.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Données personnelles</h2>
        <p>
          Conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés, vous disposez d'un droit d'accès, de rectification, de modification et de suppression des données qui vous concernent. Vous pouvez exercer ce droit en nous contactant à l'adresse email : contact@genius-ad-district.com
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">6. Droit applicable et juridiction compétente</h2>
        <p>
          Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
        </p>
      </section>
    </div>
  );
}
