import React from "react";
import "./MentionsLegales.css";

const MentionsLegales = () => {
  return (
    <div className="mentions-legales-container">
      <div className="mentions-legales-content">
        <h1>Mentions Légales</h1>
        <section>
          <h2>1. Éditeur du site</h2>
          <p>
            <strong>Nom :</strong> Hôtel La Flèche d'Argent<br />
            <strong>Adresse :</strong> 45 Rue Leyteire, 33000 Bordeaux, France<br />
            <strong>Téléphone :</strong> +33 5 56 78 90 12<br />
            <strong>Email :</strong> contact@laflechedargent.com<br />
            <strong>Numéro SIRET :</strong> 123 456 789 00012
          </p>
        </section>

        <section>
          <h2>2. Hébergement</h2>
          <p>
            Le site est hébergé par :<br />
            <strong>Nom :</strong> Hébergeur du Web<br />
            <strong>Adresse :</strong> 123 Boulevard du Serveur, 75001 Paris, France<br />
            <strong>Téléphone :</strong> +33 1 98 76 54 32<br />
          </p>
        </section>

        <section>
          <h2>3. Propriété intellectuelle</h2>
          <p>
            Tous les contenus présents sur ce site (textes, images, logos, vidéos, etc.) sont la propriété exclusive de l’Hôtel La Flèche d'Argent,
            sauf mention contraire. Toute reproduction, distribution, modification ou utilisation sans autorisation préalable est interdite.
          </p>
        </section>

        <section>
          <h2>4. Données personnelles</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d’un droit d’accès, de rectification
            et de suppression des données personnelles vous concernant. Pour toute demande, veuillez nous contacter à l’adresse suivante :
            <a href="mailto:privacy@laflechedargent.com">privacy@laflechedargent.com</a>.
          </p>
        </section>

        <section>
          <h2>5. Cookies</h2>
          <p>
            Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez leur utilisation conformément à notre
            <a href="/politique-cookies"> politique de cookies</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default MentionsLegales;
