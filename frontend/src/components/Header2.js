import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header2.css';
import logo from '../assets/logo.png';
import { jwtDecode } from 'jwt-decode';

const Header2 = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAdmin(decodedToken.is_admin === 1);
    }
  }, []);

  return (
    <header>
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <h1>La Flèche d'Argent</h1>
        </div>
        <ul className="main-nav">
        {!isAdmin && (<li><Link to="/">Home</Link></li> )}
        {!isAdmin && (<li className="dropdown">
            <span className="dropbtn">Services</span>
            <div className="dropdown-content">
              <Link to="/restaurant">Restaurant</Link>
              <Link to="/opendate">Calendrier Restaurant</Link>
              <Link to="/massage">Massage</Link>
              <Link to="/chambres">Rooms</Link>
            </div>
          </li>)}
          {isAdmin && (<li><Link to="/administrateur">Dashboard</Link></li>)}
          {isAdmin && (<li className="dropdown">
            <span className="dropbtn">Resto</span>
            <div className="dropdown-content">
            <Link to="/deletecal">Calendrier</Link>
            <Link to="/createresto">Ajouter</Link>
            </div>
          </li>)}

          {!isAdmin && (<li><Link to="/reservresto">Reservations</Link></li>   )} 
            
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
