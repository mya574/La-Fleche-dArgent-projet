// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Remplacer useHistory par useNavigate

const Signup = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();  // Remplacer useHistory par useNavigate

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Vérifier si les champs sont remplis
    if (!nom || !prenom || !email || !password) {
      setErrorMessage('Tous les champs sont requis.');
      setLoading(false);
      return;
    }

    try {
      // Envoi de la requête POST vers le back-end
      const response = await axios.post('http://localhost:3000/users/adduser', {
        nom,
        prenom,
        email,
        password,
      });

      if (response.data.message === 'Utilisateur ajouté avec succès') {
        // Redirection vers la page de connexion ou vers une autre page après inscription réussie
        navigate('/login');  // Remplacer history.push par navigate
      }
    } catch (error) {
      setErrorMessage('Erreur lors de l\'inscription. Essayez à nouveau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Inscription</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : 'S\'inscrire'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
