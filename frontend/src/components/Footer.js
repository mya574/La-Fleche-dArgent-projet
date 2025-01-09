import React, { useEffect, useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const footer = document.querySelector('footer');
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight; 
      const scrollPosition = window.innerHeight + window.scrollY; 

      if (scrollPosition >= scrollHeight - 1) { 
        setIsFixed(true); 
      } else {
        setIsFixed(false); 
      }
    };

    
    window.addEventListener('scroll', handleScroll);

    
    handleScroll();

    
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
