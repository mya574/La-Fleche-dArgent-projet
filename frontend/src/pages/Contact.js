import { useRef } from "react";
import emailjs from '@emailjs/browser';
import './Contact.css';

function Contact() {
  const form = useRef(); 

  const sendEmail = (e) => {
    e.preventDefault(); // empeche le rechargement de la page lors de l'envoi du formulaire

    emailjs
      .sendForm('service_ioqjhwn', 'template_ir6s8ft', form.current, {
        publicKey: 'c-AiRYUr1-9Qtd7Zc', 
      })
      .then(
        () => {
          console.log('SUCCESS!'); 
        },
        (error) => {
          console.log('FAILED...', error.text); 
        }
      );
    e.target.reset(); // réinitialise le formulaire après envoi
  };

  return (
    <div>

      <h1>Contactez-Nous</h1>
      <p className="contact-message">
  Votre confort est notre priorité. Pour toute question ou demande particulière, notre équipe dédiée
  est à votre disposition. Contactez-nous et laissez-nous sublimer votre expérience.
</p>

      {/* Formulaire de contact */}
      <section>
        <div className="container">
          <h2 className="--text-center">Contactez-Nous !</h2>
          <form
            ref={form}
            onSubmit={sendEmail} 
            className="--form-control --card --flex-center --dir-column"
          >
            <input
              type="text"
              placeholder="Nom complet"
              name="user_name"
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="user_email"
              required
            />
            <input
              type="text"
              placeholder="Sujet"
              name="subject"
              required
            />
            <textarea
              name="message"
              cols="30"
              rows="10"
              placeholder="Votre message"
              required
            ></textarea>
            <button className="--btn --btn-primary" type="submit">
              Envoyez-nous un mail
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Contact;
