import React from "react";
import Section from "../components/Section";
import ArrowButton from "../components/ArrowButton";
import Carousel from "../components/Carousel";
import room1 from '../assets/room.jpg';
import room2 from '../assets/room2.jpg';
import room3 from '../assets/room3.jpg';
import { Link } from 'react-router-dom';

const carouselData = [
  { src: room1, alt: 'Chambre spacieuse et confortable' },
  { src: room2, alt: 'Chambre avec une vue magnifique' },
  { src: room3, alt: 'Ambiance chaleureuse et élégante' },
];

const Restaurant = () => {
  return (
    <div className="page-wrapper">
      <main>
        
        

        
        <Section
          id="first-section"
          title="Notre Restaurant"
          content={
            <>
              Le Restaurant La Flèche d'Argent incarne l’essence du luxe et de la sophistication. Niché au cœur de la ville, notre restaurant propose une expérience gastronomique inoubliable, alliant des plats raffinés à un cadre élégant. Que vous soyez ici pour une soirée romantique ou pour un dîner d'affaires, notre équipe se dévouera pour rendre chaque moment unique. Nos équipes de service vous offrent un accueil chaleureux et un service impeccable pour garantir une expérience sans pareil.
              <div className="reserve-button-container">
          <Link to="/reservation">
            <button className="reserve-button">Réserver maintenant</button>
          </Link>
        </div>
            </>
          }
          image={room1}
        />


        <Carousel data={carouselData} />
        <ArrowButton targetId="second-section" /> 

        
        <Section
          id="second-section"
          title="Le Chef et l’Équipe"
          content="Notre chef et son équipe sont passionnés par la gastronomie et mettent un point d'honneur à vous servir des plats d’exception."
          image={room2}
        />
        <ArrowButton targetId="third-section" />

        
        <Section
          id="third-section"
          title="La Carte des Vins"
          content="Nous vous proposons une sélection des meilleurs vins, soigneusement choisis pour accompagner vos repas."
          image={room3}
        />
        <ArrowButton targetId="fourth-section" />

        
        <Section
          id="fourth-section"
          title="La Carte du Restaurant"
          content="Découvrez notre menu composé de plats raffinés, créés à partir de produits locaux et de saison."
        />
      </main>
    </div>
  );
};

export default Restaurant;
