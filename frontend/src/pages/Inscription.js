/*myriam maya*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Inscription.css';

const Inscription = () => {
  const [nom, setUsername] = useState('');
  const [prenom, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'prenom') setFirstname(value);
    if (id === 'nom') setUsername(value);
    if (id === 'email') setEmail(value);
    if (id === 'password') setPassword(value);
    if (id === 'address') setAddress(value);
    if (id === 'phoneNumber') setPhoneNumber(value);
  };

  const validateFirstname = () => {
    if (!nom.trim()) {
      setFirstnameError('Le prénom est requis.');
      return false;
    }
    setFirstnameError('');
    return true;
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

  const validateUsername = () => {
    const regex = /^[a-zA-Z0-9_]{3,15}$/;
    if (!regex.test(nom)) {
      setUsernameError('Le pseudo doit contenir entre 3 et 15 caractères alphanumériques.');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const validatePassword = () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validatePhoneNumber = () => {
    const regex = /^\d{10}$/;
    if (!regex.test(phoneNumber)) {
      setPhoneNumberError('Le numéro de téléphone doit être composé uniquement de 10 chiffres.');
      return false;
    }
    setPhoneNumberError('');
    return true;
  };

  const handlePhoneNumberKeyDown = (e) => {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFirstname() || !validateUsername() || !validateEmail() || !validatePassword() || !validatePhoneNumber()) {
      setFormError('Il y a des erreurs dans le formulaire.');
      return;
    }

    setFormError('');

    const userData = {
      nom,
      prenom,
      email,
      password,
      address,
      phoneNumber,
    };

    fetch('http://localhost:3000/users/add-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Utilisateur ajouté avec succès') {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie !',
          text: 'Bienvenue à notre hôtel de luxe.',
        }).then(() => {
          navigate('/connexion'); 
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de l\'inscription : ' + data.message,
        });
      }
    })
    .catch((error) => {
      console.error('Erreur réseau :', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue lors de l\'inscription.',
      });
    });
};
  return (
    <div className="page-inscription">
      <div className="inscription-form">
        <h1>Formulaire d'inscription</h1>
        {formError && <p className="error">{formError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom">nom :</label>
            <input
              type="text"
              id="nom"
              className="form-control"
              value={nom}
              onChange={handleChange}
              placeholder="Entrez votre prénom"
              onBlur={validateFirstname}
            />
            {firstnameError && <p className="error">{firstnameError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="prenom">prenom d'utilisateur :</label>
            <input
              type="text"
              id="prenom"
              className="form-control"
              value={prenom}
              onChange={handleChange}
              placeholder="Entrez votre nom"
              onBlur={validateUsername}
            />
            {usernameError && <p className="error">{usernameError}</p>}
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <label htmlFor="address">Adresse postale :</label>
            <textarea
              id="address"
              className="form-control"
              value={address}
              onChange={handleChange}
              placeholder="Entrez votre adresse postale"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Numéro de téléphone :</label>
            <input
              type="text"
              id="phoneNumber"
              className="form-control"
              value={phoneNumber}
              onChange={handleChange}
              placeholder="Entrez votre numéro de téléphone"
              onBlur={validatePhoneNumber}
              onKeyDown={handlePhoneNumberKeyDown}
            />
            {phoneNumberError && <p className="error">{phoneNumberError}</p>}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">S'inscrire</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Inscription;
