import React from "react";
import Section from "../components/Section";
import ArrowButton from "../components/ArrowButton";
import Carousel from "../components/Carousel";
import { Link, useNavigate } from 'react-router-dom';
import restaurant from '../assets/restaurant0.jpg';
import restaurant1 from '../assets/restaurant.jpg';
import repas from '../assets/repas.jpg';
import vins from '../assets/vins.webp';
import menu from '../assets/menu.jpg';
import equipe from '../assets/equipe-cuisine.jpg';
import bienvenue from '../assets/bienvenue.avif';


const carouselData = [
  { src: restaurant, alt: 'Ambiance élégante pour un dîner.' },
  { src: repas, alt: 'Repas d’exception, sophistiqué et savoureux.' },
  { src: restaurant1, alt: 'Déjeuner avec une vue spectaculaire.' },
];

const Restaurant = () => {

  const navigate = useNavigate();

  const handleReserveClick = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate('/connexion'); // Rediriger vers la page de connexion
    } else {
      navigate('/reservation'); // Rediriger vers la page de réservation
    }
  };

  return (
    <div className="page-wrapper">
      <main>
        {/* première section */}
        <Section
          id="first-section"
          title="Notre Restaurant"
          content={
            <>
              Bienvenue dans notre restaurant, où chaque plat est une œuvre d'art culinaire préparée avec soin. Nous vous offrons une expérience gastronomique unique dans un cadre élégant et moderne.
              <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <Link to="/reservation">
                  <button 
                    style={{
                      backgroundColor: 'green', 
                      color: 'white', 
                      border: 'none', 
                      padding: '10px 20px', 
                      fontSize: '16px', 
                      borderRadius: '5px', 
                      cursor: 'pointer'
                    }}
                  >
                    Réserver maintenant
                  </button>
                </Link>
                <Link to="/avis">
                  <button 
                    style={{
                      backgroundColor: 'blue', 
                      color: 'white', 
                      border: 'none', 
                      padding: '10px 20px', 
                      fontSize: '16px', 
                      borderRadius: '5px', 
                      cursor: 'pointer'
                    }}
                  >
                    Avis
                  </button>
                </Link>
              </div>
            </>
          }
          image={bienvenue}
        />

        <Carousel data={carouselData} />
        <ArrowButton targetId="second-section" />

        {/* deuxième section et les suivantes */}
        <Section
          id="second-section"
          title="Le Chef et l’Équipe"
          content="Notre chef et son équipe sont passionnés par la gastronomie et mettent un point d'honneur à vous servir des plats d’exception."
          image={equipe}
        />
        <ArrowButton targetId="third-section" />

        <Section
          id="third-section"
          title="La Carte des Vins"
          content="Nous vous proposons une sélection des meilleurs vins, soigneusement choisis pour accompagner vos repas."
          image={vins}
        />
        <ArrowButton targetId="fourth-section" />

        <Section
          id="fourth-section"
          title="La Carte du Restaurant"
          content="Découvrez notre menu composé de plats raffinés, créés à partir de produits locaux et de saison."
          image={menu}
        />
      </main>
    </div>
  );
};

export default Restaurant;
