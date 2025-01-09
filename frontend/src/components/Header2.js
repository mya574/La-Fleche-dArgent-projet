import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header2.css';
import logo from '../assets/logo.png';

const Header2 = () => {
  const [isMenuActive, setIsMenuActive] = useState(false); // état du menu
  const navigate = useNavigate(); // Hook pour naviguer
  const location = useLocation(); // Hook pour récupérer la route actuelle

  // détermine si l'utilisateur est sur la route admin
  const isAdmin = location.pathname === '/admin';

  const toggleMenu = () => {
    setIsMenuActive(prevState => !prevState); // inverse l'état du menu
  };

  // si deconnexion, redirige vers la page Home
  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" /> 
          <h1>La Flèche d'Argent</h1> 
        </div>

        <ul className={`main-nav ${isMenuActive ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <span className="dropbtn">Services</span>
            <div className="dropdown-content">
              <Link to="/restaurant">Restaurant</Link>
              <Link to="/massage">Massage</Link>
              <Link to="/chambres">Rooms</Link>
            </div>
          </li>

          {/* pastille verte avec le message */}
          <li>
            <div className="status-badge">
              <span className="status-dot"></span>
              <span>{isAdmin ? 'Admin' : 'Connecté'}</span>
            </div>
          </li>

          {/* bouton déconnexion */}
          <li>
            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
          </li>
        </ul>

        <div className="burger" onClick={toggleMenu}>
          &#9776; {/* symbole burger */}
        </div>
      </nav>
    </header>
  );
};

export default Header2;
