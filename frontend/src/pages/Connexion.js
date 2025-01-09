import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Connexion.css';

const Connexion = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') setEmail(value);
    if (id === 'password') setPassword(value);
  };

  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      setEmailError('Veuillez entrer un e-mail valide.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError('Veuillez remplir tous les champs.');
      return;
    }
    if (!validateEmail() || !validatePassword()) {
      setFormError('Il y a des erreurs dans le formulaire.');
      return;
    }
    setFormError('');

    const userData = { email, password };

    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('token', data.token); // Stockez le token dans le localStorage
          console.log('Token stored:', data.token); // Ajoutez ce log pour vérifier
          onLogin(data.token); // Appelle la fonction de connexion pour mettre à jour le statut
          navigate('/'); // Redirige vers la page d'accueil
        } else {
          alert('Erreur de connexion : ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Erreur réseau :', error);
        alert('Une erreur est survenue lors de la connexion.');
      });
  };

  return (
    <div className="connexion-form" id="connexion-form">
      <h1 className="form-heading">Formulaire de Connexion</h1>
      {formError && <p className="error">{formError}</p>}
      <form onSubmit={handleSubmit}>
        {/* Champ e-mail */}
        <div className="form-group" id="email-group">
          <label htmlFor="email">Adresse e-mail :</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={handleChange}
            placeholder="Entrez votre adresse e-mail"
            onBlur={validateEmail}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>

        {/* Champ mot de passe */}
        <div className="form-group" id="password-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={handleChange}
            placeholder="Entrez votre mot de passe"
            onBlur={validatePassword}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>

        {/* Bouton de soumission */}
        <div className="form-group" id="submit-group">
          <button type="submit" className="btn-submit">
            Se connecter
          </button>
        </div>
      </form>
    </div>
  );
};

export default Connexion;
