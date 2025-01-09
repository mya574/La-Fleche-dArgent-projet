// Connexion.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Connexion.css';


const Connexion = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'username') setUsername(value);
    if (id === 'password') setPassword(value);
  };

  const validateUsername = () => {
    if (!username.trim()) {
      setUsernameError('Le nom d\'utilisateur est requis.');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const validatePassword = () => {
    if (!password.trim()) {
      setPasswordError('Le mot de passe est requis.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setFormError('Veuillez remplir tous les champs.');
      return;
    }

    if (!validateUsername() || !validatePassword()) {
      setFormError('Il y a des erreurs dans le formulaire.');
      return;
    }

    setFormError('');
    alert('Connexion réussie !');
  };

  return (
    <div className="connexion-form">
      <h1>Bienvenue</h1>
      <p className="subheading"><i>Connectez-vous à votre compte pour accéder à nos services exclusifs.</i></p>
        {formError && <p className="error">{formError}</p>}
      <form onSubmit={handleSubmit} id="connexion-form">
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
            placeholder="Entrez votre nom d'utilisateur"
            onBlur={validateUsername}
          />
          {usernameError && <p className="error">{usernameError}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            placeholder="Entrez votre mot de passe"
            onBlur={validatePassword}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>

        <div className="form-group">
          <button type="submit">Se connecter</button>
        </div>
      </form>

      <div className="form-group">
        <p>Pas encore inscrit ? <Link to="/inscription">S'inscrire</Link></p>
      </div>
    </div>
  );
};

export default Connexion;
