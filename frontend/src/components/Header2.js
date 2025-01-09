import React from 'react';
import { Link } from 'react-router-dom';
import './Header2.css';
import logo from '../assets/logo.png';

const Header2 = ({ onLogout }) => {
  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <h1>La Flèche d'Argent</h1>
        </div>
        <ul className="main-nav">
          <li><Link to="/">Home</Link></li>
          <li className="dropdown">
            <span className="dropbtn">Services</span>
            <div className="dropdown-content">
              <Link to="/restaurant">Restaurant</Link>
              <Link to="/massage">Massage</Link>
              <Link to="/chambres">Rooms</Link>
            </div>
          </li>
          <li>
            <div className="status-badge">
              <span className="status-dot"></span>
              <span>Connecté</span>
            </div>
          </li>
          <li>
            <button onClick={onLogout} className="logout-button">Déconnexion</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header2;
