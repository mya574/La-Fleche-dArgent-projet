import React, { useState } from 'react';
import './Connexion.css';

const Connexion = () => {
  // États pour les champs du formulaire et erreurs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') setEmail(value);
    if (id === 'password') setPassword(value);
  };

  // Validation de l'adresse email
  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      setEmailError('Veuillez entrer un e-mail valide.');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validation du mot de passe (au moins 8 caractères)
  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation du formulaire
    if (!email || !password) {
      setFormError('Veuillez remplir tous les champs.');
      return;
    }

    if (!validateEmail() || !validatePassword()) {
      setFormError('Il y a des erreurs dans le formulaire.');
      return;
    }

    setFormError('');

    // Envoi des données au backend pour vérifier les informations de connexion
    const userData = { email, password };

    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Vérifier la réponse du serveur
        if (data.success) {
          console.log('Connexion réussie !'); // Afficher dans la console
          console.log('Utilisateur connecté :', data.user); // Afficher les informations de l'utilisateur, si fournies par le backend
          
          // Redirection ou stockage du token JWT, selon la logique de votre application
          localStorage.setItem('authToken', data.token); // Sauvegarder le token dans localStorage
          alert('Connexion réussie !');
          // Rediriger vers une autre page ou afficher un message d'accueil
        } else {
          console.log('Erreur de connexion :', data.message); // Afficher dans la console
          alert('Erreur de connexion : ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Erreur réseau :', error);
        alert('Une erreur est survenue lors de la connexion.');
      });
  };

  return (
    <div className="connexion-form">
      <h1>Formulaire de Connexion</h1>
      {formError && <p className="error">{formError}</p>}
      <form onSubmit={handleSubmit}>
        {/* Adresse e-mail */}
        <div className="form-group">
          <label htmlFor="email">Adresse e-mail :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Entrez votre adresse e-mail"
            onBlur={validateEmail}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>

        {/* Mot de passe */}
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

        {/* Bouton de soumission */}
        <div className="form-group">
          <button type="submit">Se connecter</button>
        </div>
      </form>
    </div>
  );
};

export default Connexion;
