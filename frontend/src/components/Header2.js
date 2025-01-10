/*myriam maya clemence*/
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

  const [isMenuActive, setIsMenuActive] = useState(false); // état du menu burger

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
        
        {/* Classe active pour le menu burger */}
       <ul className={`main-nav ${isMenuActive ? 'active' : ''}`}>
{!isAdmin && (<li><Link to="/">Home</Link></li> )}
{!isAdmin && (<li className="dropdown">
    <span className="dropbtn">Services</span>
    <div className="dropdown-content">
      <Link to="/restaurant">Restaurant</Link>
              <Link to="/opendate">Calendrier Restaurant</Link>
      <Link to="/massage">Massage</Link>
      <Link to="/chambres">Rooms</Link>
              <Link to="/avisform">Avis</Link>
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
    {/* Pastille Connecté */}
    <div className="status-container">
      <span className="status-dot"></span>
      <span className="status-text">Connecté</span>
    </div>
  </li>
  <li>
    {/* Bouton Déconnexion */}
    <button onClick={onLogout} className="logout-button">Déconnexion</button>
  </li>

</ul>


        {/* Bouton burger */}
        <div className="burger" onClick={toggleMenu}>
          &#9776; {/* symbole burger */}
        </div>
      </nav>
    </header>
  );
};

export default Header2;
