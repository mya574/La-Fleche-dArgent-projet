import React from "react";
import Header from "./component/Header";
import "./About.css"; // Import de la feuille de styles

function About() {
  return (
    <div className="about-container">
      <Header />
      <div className="about-content">
        <h1 className="about-title">Qui Sommes-Nous ?</h1>
        <h2 className="about-subtitle">
          Découvrez l'histoire et la vision de l'Hôtel La Flèche d'Argent.
        </h2>
        <h3 className="phone-n">
          <i className="fa fa-phone" /> +33 1 65 76 89 00
        </h3>
      </div>
      <div className="map-section">
        <div className="game-frame">
          <div className="map-container">
            <iframe
              width="100%"
              height="400"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=en&amp;q=45%20Rue%20Leyteire,%2033000,%20Bordeaux%20France+(Fleche%20d'argent%20)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              title="Location Map"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
