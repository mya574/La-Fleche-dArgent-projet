import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
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
