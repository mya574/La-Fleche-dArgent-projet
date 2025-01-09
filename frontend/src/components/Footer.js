import React, { useEffect, useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [isFixed, setIsFixed] = useState(false);// etat pour determiner si le footer est fixé

  useEffect(() => {
    const footer = document.querySelector('footer');
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight; // hauteur totale de la page
      const scrollPosition = window.innerHeight + window.scrollY; //// position de défilement actuelle

      // verifie si lutilisateur est tout en bas de la page
      if (scrollPosition >= scrollHeight - 1) { 
        setIsFixed(true); // fixe le footer
      } else {
        setIsFixed(false); // défixe le footer
      }
    };

     // ajoute un écouteur d'événement pour le défilement
    window.addEventListener('scroll', handleScroll);

    // appelle handleScroll une fois pour initialiser l'état
    handleScroll();

    // nettoie l'écouteur d'événement 
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={isFixed ? "fixed" : ""}>
      <div className="footer-content">
        <div className="links">
          <a href="/mentions-legales">Mentions Légales</a>
          <a href="/cgv">Conditions Générales de Vente</a>
          <a href="/contact">Contact</a>
        </div>
        <p>
          &copy; 2025 La Flèche d'Argent | Tous droits réservés
        </p>
      </div>
    </footer>
  );
};

export default Footer;
