import React from 'react';
import video1 from '../assets/video1.mp4';  
import './Home.css';
import 

function Home() {
  return (
    <div className="home-container">
      <div className="video-background">
        <video className="video-banner" autoPlay loop muted>
          <source src={video1} type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        <div className="overlay">
          <h1>Bienvenue à l'Hôtel La Flèche d'Argent</h1>
          <p>Découvrez notre hôtel haut de gamme à Bordeaux.</p>
          <button className="reserve-button">Réserver</button>
        </div>
      </div>
    </div>
  );
}

export default Home; 
