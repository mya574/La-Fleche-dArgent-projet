/*myriam*/
import React, { useState } from "react";
import {jwtDecode} from "jwt-decode"; 
import './Reservation-chambre.css';


const ReservationChambre = () => {
  const [idChambre, setIdChambre] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [message, setMessage] = useState("");

  const chambres = [
    { id_chambre: 2, nom_chambre: "Classique", prix_chambre: 100 },
    { id_chambre: 3, nom_chambre: "Confort", prix_chambre: 200 },
    { id_chambre: 4, nom_chambre: "Standing", prix_chambre: 300 },
    { id_chambre: 5, nom_chambre: "Suite", prix_chambre: 400 },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("Vous devez être connecté pour réserver une chambre.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const id_utilisateur = decodedToken.id;

      const response = await fetch("http://localhost:3000/chambre/reserver-ou-modifier-chambre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_utilisateur,
          id_chambre: idChambre,
          date_debut: dateDebut,
          date_fin: dateFin,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Réservation de chambre effectuée avec succès.");
      } else {
        setMessage(data.message || "Une erreur est survenue lors de la réservation.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setMessage("Erreur lors de la réservation de la chambre.");
    }
  };

  return (
    <div className="reservation-chambre-container">
    <div className="reservation-chambre">
      <h1>Réserver une chambre</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id_chambre">Choisissez une chambre :</label>
        <select
          id="id_chambre"
          name="id_chambre"
          value={idChambre}
          onChange={(e) => setIdChambre(e.target.value)}
          required
        >
          <option value="">-- Sélectionner une chambre --</option>
          {chambres.map((chambre) => (
            <option key={chambre.id_chambre} value={chambre.id_chambre}>
              {chambre.nom_chambre} - {chambre.prix_chambre} €
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="date_debut">Date de début :</label>
        <input
          type="date"
          id="date_debut"
          name="date_debut"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
          required
        />
        <br />
        <label htmlFor="date_fin">Date de fin :</label>
        <input
          type="date"
          id="date_fin"
          name="date_fin"
          value={dateFin}
          onChange={(e) => setDateFin(e.target.value)}
          required
        />
        <br />
        <button type="submit">Réserver</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
};

export default ReservationChambre;
