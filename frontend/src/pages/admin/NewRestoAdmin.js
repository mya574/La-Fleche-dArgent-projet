/*clemence*/
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './NewRestoAdmin.css';

const CreateResto = () => {
  const [nombreCouverts, setNombreCouverts] = useState("");
  const [dateReservation, setDateReservation] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("Vous devez être connecté pour créer une réservation.");
      return;
    }

    const decodedToken = jwtDecode(token);
    const id_utilisateur = decodedToken.id;

    try {
      const response = await fetch("http://localhost:3000/services/add_resto", {
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
    <div className="create-reservation-page">
      <h1>Ajouter des jours d'ouverture</h1>
      <form onSubmit={handleSubmit}>
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

        <label htmlFor="date">Date :</label>
        <input
          type="date"
          id="date"
          name="date"
          value={dateReservation}
          onChange={(e) => setDateReservation(e.target.value)}
          required
        />
        <br />

        <button type="submit">Créer</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateResto;
