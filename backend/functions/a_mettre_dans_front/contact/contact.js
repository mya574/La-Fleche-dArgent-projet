import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    captcha: ''
  });

  const [data, setData] = useState(null);
  const [captchaNumbers, setCaptchaNumbers] = useState({ num1: 0, num2: 0 });

  useEffect(() => {
    axios.get('https://backend.hegeoma.org/api/data') // URL du backend
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });

    // Générer des nombres aléatoires pour le captcha
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaNumbers({ num1, num2 });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier le captcha
    const captchaResult = parseInt(formData.captcha, 10);
    if (captchaResult !== captchaNumbers.num1 + captchaNumbers.num2) {
      Swal.fire({
        icon: 'error',
        title: 'Captcha incorrect',
        text: 'Veuillez réessayer.',
      });
      return;
    }

    // Logique de soumission du formulaire
    axios.post('https://backend.hegeoma.org/api/contact', formData)
      .then(response => {
        console.log('Form submitted successfully:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Votre message a été envoyé avec succès !',
        }).then(() => {
          // Recharger la page après avoir affiché le message de succès
          window.location.reload();
        });
      })
      .catch(error => {
        console.error('There was an error submitting the form!', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Il y a eu une erreur lors de l\'envoi du formulaire.',
        });
      });
  };

  return (
    <div className='pagecontact'>
      <div className='pagedanspagecontact'>
        <div className='interieurpagecontact'>
          <h1>Page de Contact</h1>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className='colonnegauche'>
            <div className="form-group">
              <label htmlFor="firstName">Prénom :</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Nom :</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            </div>

            <div className='colonnedroite'>
            <div className="form-group">
              <label htmlFor="email">Email :</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Téléphone :</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            </div>


            <div className="form-group">
              <label htmlFor="subject">Le sujet de votre message :</label>
              <input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="message">Votre message:</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="captcha">Captcha : {`${captchaNumbers.num1} + ${captchaNumbers.num2} = `}</label>
              <input type="number" id="captcha" name="captcha" value={formData.captcha} onChange={handleChange} required />
            </div>

            <button type="submit" className="submit-button">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;