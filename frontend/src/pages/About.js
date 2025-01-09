import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-section">
        <h1>Qui sommes-nous ?</h1>
        <p>
          Bienvenue à l'Hôtel La Flèche d'Argent, un havre de paix de luxe au cœur de Bordeaux. 
          Nous vous offrons un confort exceptionnel, des chambres raffinées, des services haut de gamme 
          et une expérience inoubliable. Notre établissement est conçu pour allier élégance et modernité, 
          pour que chaque moment passé chez nous soit synonyme de relaxation et de bien-être.
        </p>
        <p>
          Notre équipe se tient à votre disposition pour faire de votre séjour une expérience unique. 
          Découvrez l'art de vivre bordelais à travers nos chambres spacieuses, notre restaurant gastronomique, 
          et nos soins bien-être.
        </p>
      </section>

      {/* Carte */}
      <section className="map-section">
        <h2>Notre Emplacement</h2>
        <p>
          Retrouvez-nous à l'adresse suivante : 45 Rue Leyteire, 33000 Bordeaux, France.
        </p>
        <div className="google-map">
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
      </section>
    </div>
  );
};

export default About;
