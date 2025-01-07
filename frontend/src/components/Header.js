import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png'; 

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false); // état du menu

  const toggleMenu = () => {
    setIsMenuActive(prevState => !prevState); // inverse l'état du menu
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" /> 
          <h1>La Flèche d'Argent</h1> 
        </div>

        {/* ajoute la classe 'active' pour afficher le menu qd clic */}
        <ul className={`main-nav ${isMenuActive ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <span className="dropbtn">Services</span>
            <div className="dropdown-content">
              <Link to="/restaurant">Restaurant</Link>
              <Link to="/massage">Massage</Link>
              <Link to="/rooms">Rooms</Link>
            </div>
          </li>
          <li><Link to="/inscription">Inscription</Link></li>
        </ul>

        <div className="burger" onClick={toggleMenu}>
          &#9776; {/* symbole burger */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
