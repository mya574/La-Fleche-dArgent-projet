import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './About.css';

const About = () => {
  const hotelLocation = { lat: 44.8378, lng: -0.5792 }; // Coordonnées de l'hôtel 

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

      {/* Carte Google Maps */}
      <section className="map-section">
        <h2>Notre Emplacement</h2>
        <p>
          Retrouvez-nous à l'adresse suivante : 123 Rue de Bordeaux, 33000 Bordeaux, France.
        </p>
        <div className="google-map">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{ height: "400px", width: "100%" }}
              center={hotelLocation}
              zoom={15}
            >
              <Marker position={hotelLocation} />
            </GoogleMap>
          </LoadScript>
        </div>
      </section>
    </div>
  );
};

export default About;
