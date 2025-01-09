import React from 'react';
import { Link } from 'react-router-dom'; 
import video1 from '../assets/video1.mp4';  
import './Home.css';
import { Helmet } from 'react-helmet';

function Home() {
  return (
    <div className="home-container">

      <Helmet>
        <title>Hôtel La Flèche d'Argent - Accueil</title>
        <meta name="description" content="Découvrez notre hôtel haut de gamme à Bordeaux. Réservez votre séjour dès maintenant et profitez de nos services exclusifs." />
        <meta name="keywords" content="Hôtel, Bordeaux, Luxe, Séjour, Réservation" />
        <meta name="author" content="Votre Nom" />
        <meta property="og:title" content="Hôtel La Flèche d'Argent - Accueil" />
        <meta property="og:description" content="Découvrez notre hôtel haut de gamme à Bordeaux. Réservez votre séjour dès maintenant et profitez de nos services exclusifs." />
        <meta property="og:image" content="URL_DE_VOTRE_IMAGE" />
        <meta property="og:url" content="URL_DE_VOTRE_PAGE" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hôtel La Flèche d'Argent - Accueil" />
        <meta name="twitter:description" content="Découvrez notre hôtel haut de gamme à Bordeaux. Réservez votre séjour dès maintenant et profitez de nos services exclusifs." />
        <meta name="twitter:image" content="URL_DE_VOTRE_IMAGE" />
      </Helmet>



      <div className="video-background">
        <video className="video-banner" autoPlay loop muted>
          <source src={video1} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        <div className="overlay">
          <h1>Bienvenue à l'Hôtel La Flèche d'Argent</h1>
          <p>Découvrez notre hôtel haut de gamme à Bordeaux.</p>
          <Link to="/about">
            <button className="know-more-button">Nous connaître</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
