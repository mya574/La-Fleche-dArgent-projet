/*myriam*/
import React from 'react';
import { Link } from 'react-scroll'; //bibliothèque react
import './ArrowButton.css';

const ArrowButton = ({ targetId }) => {
  return (
    <div className="scroll-button-container">
      <Link
        to={targetId} //cible du défilement
        smooth={true}
        duration={1000} // en millisecondes
        className="scroll-button"
      >
        <span className="arrow-icon">↓</span>
      </Link>
    </div>
  );
};

export default ArrowButton;
