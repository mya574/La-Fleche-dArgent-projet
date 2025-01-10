/*myriam*/
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation } from 'react-router-dom';
import './Reservation.css';

const Restaurent = () => {
  const [nombreCouverts, setNombreCouverts] = useState("");
  const [dateReservation, setDateReservation] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const date = params.get('date');
    if (date) {
      setDateReservation(date);
    }
  }, [location.search]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("Vous devez être connecté pour réserver.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        setMessage("Votre session a expiré. Veuillez vous reconnecter.");
        return;
      }

      const id_utilisateur = decodedToken.id;

      const response = await fetch("http://localhost:3000/restaurant/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_utilisateur,
          nombre_couverts: nombreCouverts,
          date_reservation: dateReservation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Réservation effectuée avec succès !");
      } else {
        setMessage(data.message || "Une erreur est survenue lors de la réservation.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setMessage("Erreur lors de la réservation.");
    }
  };

  return (
    <div className="reservation-restaurent-container">
      <div className="reservation-restaurent">
        <h1>Réservez votre table</h1>
        <form onSubmit={handleSubmit}>
          {/* Nombre de couverts */}
          <label htmlFor="nombre_couverts">Nombre de couverts :</label>
          <input
            type="number"
            id="nombre_couverts"
            name="nombre_couverts"
            value={nombreCouverts}
            onChange={(e) => setNombreCouverts(e.target.value)}
            min="1"
            required
          />
          <br />

          {/* Date de réservation */}
          <label htmlFor="date_reservation">Date de réservation :</label>
          <input
            type="date"
            id="date_reservation"
            name="date_reservation"
            value={dateReservation}
            onChange={(e) => setDateReservation(e.target.value)}
            required
          />
          <br />

          {/* Bouton de soumission */}
          <button type="submit">Réserver</button>
        </form>

        {/* Message utilisateur */}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Restaurent;
