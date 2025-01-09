import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import './Reservation-spa.css';


const ReservationSoin = () => {
  const [idSoin, setIdSoin] = useState("");
  const [dateReservation, setDateReservation] = useState("");
  const [message, setMessage] = useState("");

  // Liste des soins statiques
  const soins = [
    { id_soin: 1, nom_soin: "Massage Relaxant", prix_soin: 50 },
    { id_soin: 2, nom_soin: "Gommage corps en cabine", prix_soin: 60 },
    { id_soin: 3, nom_soin: "Massage relaxant aux huiles essentielles", prix_soin: 40 },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Récupérer le token JWT depuis le localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("Vous devez être connecté pour réserver un soin.");
      return;
    }

    try {
      // Décoder le token pour obtenir l'id_utilisateur
      const decodedToken = jwtDecode(token);
      const id_utilisateur = decodedToken.id;

      // Envoyer la requête à l'API backend pour réserver un soin
      const response = await fetch("http://localhost:3000/soin/reserver-soin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_utilisateur,
          id_soin: idSoin,
          date_reservation: dateReservation,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Réservation de soin effectuée avec succès.");
      } else {
        setMessage(data.message || "Une erreur est survenue lors de la réservation.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setMessage("Erreur lors de la réservation du soin.");
    }
  };

  return (
    <div className="reservation-soin-container">
    <div className="reservation-soin">
      <h1>Réserver un soin</h1>
      <form onSubmit={handleSubmit}>
        {/* Sélectionner le soin */}
        <label htmlFor="id_soin">Choisissez un soin :</label>
        <select
          id="id_soin"
          name="id_soin"
          value={idSoin}
          onChange={(e) => setIdSoin(e.target.value)}
          required
        >
          <option value="">-- Sélectionner un soin --</option>
          {soins.map((soin) => (
            <option key={soin.id_soin} value={soin.id_soin}>
              {soin.nom_soin} - {soin.prix_soin} €
            </option>
          ))}
        </select>
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

export default ReservationSoin;
