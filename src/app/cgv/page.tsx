import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente - Genius Ad District',
  description: 'Conditions Générales de Vente de Genius Ad District',
};

export default function CGVPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Conditions Générales de Vente</h1>
      
      <section className="mb-8">
        <p className="mb-4">
          En vigueur au [Date]
        </p>
        <p className="mb-4">
          Les présentes conditions générales de vente (ci-après les "CGV") s'appliquent, sans restriction ni réserve, à l'ensemble des ventes conclues par la société Genius Ad District (ci-après le "Vendeur") avec ses clients (ci-après l'« Acheteur ») via le site internet genius-ad-district.com.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Objet</h2>
        <p>
          Les présentes CGV ont pour objet de définir les conditions de vente des prestations proposées par Genius Ad District à ses clients. Toute commande implique l'adhésion sans réserve de l'Acheteur aux présentes CGV.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Prix</h2>
        <p className="mb-2">
          Les prix de nos prestations sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables).
        </p>
        <p className="mb-2">
          Genius Ad District se réserve le droit de modifier ses prix à tout moment, étant entendu que les prestations seront facturées sur la base des tarifs en vigueur au moment de l'enregistrement de la commande.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Commande</h2>
        <p className="mb-2">
          Pour passer commande, le Client doit remplir le bon de commande en ligne. La validation de la commande implique acceptation des présentes CGV.
        </p>
        <p className="mb-2">
          Genius Ad District se réserve le droit d'annuler ou de refuser toute commande d'un client avec lequel il existerait un litige relatif au paiement d'une commande antérieure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Modalités de paiement</h2>
        <p className="mb-2">
          Le paiement des prestations s'effectue :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Soit par carte bancaire via notre plateforme de paiement sécurisé</li>
          <li>Soit par virement bancaire</li>
          <li>Soit par tout autre moyen de paiement proposé lors de la commande</li>
        </ul>
        <p>
          Le paiement est exigible immédiatement à la commande.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Délais d'exécution</h2>
        <p className="mb-2">
          Les délais d'exécution des prestations sont indiqués lors de la commande. Ils sont donnés à titre indicatif et peuvent varier en fonction de la charge de travail de Genius Ad District.
        </p>
        <p>
          En cas de retard d'exécution d'une commande de plus de 30 jours par rapport à la date de livraison prévue, l'Acheteur pourra résoudre le contrat, après avoir mis en demeure le Vendeur d'exécuter dans un délai raisonnable, sans résultat. La commande sera alors remboursée, l'Acheteur ne pouvant prétendre à des dommages et intérêts.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Droit de rétractation</h2>
        <p>
          Conformément à l'article L. 221-18 du Code de la consommation, l'Acheteur dispose d'un délai de rétractation de 14 jours à compter de la conclusion du contrat pour renoncer à sa commande, sans avoir à justifier de motifs ni à payer de pénalités.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Propriété intellectuelle</h2>
        <p>
          Tous les éléments du site genius-ad-district.com et des prestations fournies sont et restent la propriété intellectuelle exclusive de Genius Ad District. Aucune cession de droits de propriété intellectuelle n'est réalisée au travers des présentes CGV.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Données personnelles</h2>
        <p>
          Les données personnelles recueillies lors de la commande sont nécessaires au traitement de celle-ci. Elles font l'objet d'un traitement informatique et sont destinées aux services de Genius Ad District. Conformément à la loi "informatique et libertés" du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès et de rectification aux informations qui vous concernent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Droit applicable et litiges</h2>
        <p className="mb-2">
          Les présentes conditions générales de vente sont soumises au droit français.
        </p>
        <p>
          En cas de litige, les tribunaux français seront seuls compétents.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
        <p>
          Pour toute question ou réclamation, vous pouvez nous contacter :
        </p>
        <p className="mt-2">
          Par email : contact@genius-ad-district.com<br />
          Par téléphone : [Numéro de téléphone]<br />
          Par courrier : [Adresse postale complète]
        </p>
      </section>
    </div>
  );
}
