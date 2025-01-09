import { useRef } from "react";
import "./style/Contact.css";
import Header from "./component/Header";
import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_qsgrpqg", 
        "template_ir6s8ft", 
        form.current,
        "Nja4YsdIWrPgIq5p7" 
      .then(
        () => {
          console.log("SUCCESS!");
          alert("Votre message a été envoyé avec succès !");
        },
        (error) => {
          console.error("FAILED...", error.text);
          alert("Une erreur est survenue. Veuillez réessayer.");
        }
      ));

    e.target.reset();
  };

  return (
    <div>
      <Header />
      <h1>Contactez-Nous</h1>
      <p>
        Nous serons heureux de répondre à toutes vos questions. N'hésitez pas à
        nous contacter !
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
