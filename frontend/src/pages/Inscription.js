import React, { useState } from 'react';
import './Inscription.css';

const Inscription = () => {
  // etats pour chaque champ du formulaire
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [formError, setFormError] = useState('');

  // fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'username') setUsername(value);
    if (id === 'email') setEmail(value);
    if (id === 'password') setPassword(value);
    if (id === 'address') setAddress(value);
    if (id === 'phoneNumber') setPhoneNumber(value);
  };

  // Validation de l'adresse e-mail
  const validateEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      setEmailError('Veuillez entrer un e-mail valide.');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validation du nom d'utilisateur
  const validateUsername = () => {
    const regex = /^[a-zA-Z0-9_]{3,15}$/; // Entre 3 et 15 caractères, uniquement lettres, chiffres et underscore
    if (!regex.test(username)) {
      setUsernameError('Le pseudo doit contenir entre 3 et 15 caractères alphanumériques.');
      return false;
    }
    setUsernameError('');
    return true;
  };

  // Validation du mot de passe
  const validatePassword = () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // Minimum 8 caractères, 1 lettre, 1 chiffre
    if (!regex.test(password)) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Validation du numéro de téléphone 
  const validatePhoneNumber = () => {
    const regex = /^\d{10}$/; //uniquement des chiffres
    if (!regex.test(phoneNumber)) {
      setPhoneNumberError('Le numéro de téléphone doit être composé uniquement de 10 chiffres.');
      return false;
    }
    setPhoneNumberError('');
    return true;
  };

  // Fonction pour empecher l'entrée de caractères non numériques dans le champ téléphone
  const handlePhoneNumberKeyDown = (e) => {
    // Autoriser uniquement "Backspace", "Tab", et les chiffres
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation du formulaire
    if (!username || !email || !password || !address || !phoneNumber) {
      setFormError('Veuillez remplir tous les champs.');
      return;
    }

    if (
      !validateUsername() ||
      !validateEmail() ||
      !validatePassword() ||
      !validatePhoneNumber()
    ) {
      setFormError('Il y a des erreurs dans le formulaire.');
      return;
    }

    setFormError('');
    alert('Inscription réussie ! Bienvenue à notre hôtel de luxe.');
  };

  return (
    <div className="inscription-form">
      <h1>Formulaire d'inscription</h1>
      {formError && <p className="error">{formError}</p>}
      <form onSubmit={handleSubmit}>

        {/* Nom d'utilisateur */}
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

        {/* Adresse postale */}
        <div className="form-group">
          <label htmlFor="address">Adresse postale :</label>
          <textarea
            id="address"
            value={address}
            onChange={handleChange}
            placeholder="Entrez votre adresse postale"
          />
        </div>

        {/* Numéro de téléphone */}
        <div className="form-group">
          <label htmlFor="phoneNumber">Numéro de téléphone :</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            placeholder="Entrez votre numéro de téléphone"
            onBlur={validatePhoneNumber}
            onKeyDown={handlePhoneNumberKeyDown}  // onKeyDown pour filtrer les entrées
          />
          {phoneNumberError && <p className="error">{phoneNumberError}</p>}
        </div>

        {/* Bouton de soumission */}
        <div className="form-group">
          <button type="submit">S'inscrire</button>
        </div>
      </form>
    </div>
  );
};

export default Inscription;
