import React from 'react';
import './ConditionsGeneralDeVente.css';

const ConditionsGeneralDeVente = () => {
  return (
    <div className="mentions-legales-container">
      <div className="mentions-legales-content">
        <h1>Conditions Générales de Vente</h1>

        
        <section>
          <h2>Préambule</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre 
            l'Hôtel La Flèche d'Argent et tout client souhaitant réserver une prestation ou un service 
            proposé par notre établissement. En réservant sur notre site ou auprès de notre personnel, 
            vous acceptez ces CGV sans réserve.
          </p>
        </section>

        
        <section>
          <h2>Réservations</h2>
          <p>
            Toute réservation effectuée sur notre site ou par téléphone est soumise à la disponibilité 
            des chambres ou des prestations. Une confirmation écrite sera envoyée au client pour valider la réservation.
          </p>
          <p>
            Le client s'engage à fournir des informations exactes lors de la réservation. Toute erreur ou omission 
            pourra entraîner l'annulation de la réservation sans droit à remboursement.
          </p>
        </section>

        
        <section>
          <h2>Tarifs et Paiement</h2>
          <p>
            Les tarifs indiqués sur notre site sont en euros (€) et incluent toutes taxes applicables, sauf mention contraire. 
            Le paiement peut être effectué par carte bancaire, espèces ou tout autre moyen accepté par l'établissement.
          </p>
          <p>
            Toute réservation nécessite un prépaiement ou une garantie bancaire. Les conditions d'annulation et 
            de remboursement sont précisées lors de la confirmation de réservation.
          </p>
        </section>

        
        <section>
          <h2>Annulation et Modifications</h2>
          <p>
            Les annulations ou modifications doivent être effectuées dans les délais spécifiés lors de la réservation. 
            Toute annulation effectuée hors délai pourra entraîner des frais équivalents au montant de la première nuitée 
            ou d'une partie des prestations réservées.
          </p>
        </section>

       
        <section>
          <h2>Responsabilité</h2>
          <p>
            L'Hôtel La Flèche d'Argent décline toute responsabilité en cas de perte, vol ou détérioration 
            des biens personnels des clients, sauf si ces derniers ont été confiés à notre service de consigne.
          </p>
        </section>

        
        <section>
          <h2>Loi Applicable</h2>
          <p>
            Les présentes CGV sont régies par le droit français. En cas de litige, les parties s'engagent à 
            rechercher une solution amiable avant de recourir aux tribunaux compétents.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Pour toute question concernant nos Conditions Générales de Vente, veuillez nous contacter à l'adresse suivante : 
            contact@laflechedargent.com ou par téléphone au +33 5 56 00 00 00.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ConditionsGeneralDeVente;
