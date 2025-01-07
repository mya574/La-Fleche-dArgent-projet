import React from "react";
import Section from "../components/Section";
import ReservationForm from "../components/ReservationForm";
import Footer from "../components/Footer";
import picrestaurant from '../assets/restaurant.jpg'; 

const Restaurant = () => (
  <div className="page-wrapper"> 
    <main>
      <Section
        title="Bienvenue au Restaurant"
        content="Découvrez notre menu gastronomique, préparé par notre chef étoilé."
        image={picrestaurant}
      />
      <Section
        title="Une expérience culinaire"
        content="Profitez de plats raffinés, de produits frais et d'une ambiance chaleureuse."
      />
      <ReservationForm serviceType="restaurant" />
    </main>
    <Footer /> 
  </div>
);

export default Restaurant;
