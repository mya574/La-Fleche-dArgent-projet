import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './NewChambreAdmin.css';

const ReservationsResto = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        // Rediriger vers la page de connexion si pas de token
        window.location.href = '/connexion';
        return;
      }

      const decodedToken = jwtDecode(token);
      const id_utilisateur = decodedToken.id;

      try {
        const response = await fetch('http://localhost:3000/restaurant/get-all-res-resto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id_utilisateur }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Réservations récupérées :', data.reservations); // Ajouter un log pour voir les réservations récupérées
          setReservations(data.reservations);
        } else {
          console.error('Erreur lors de la récupération des réservations :', data.message);
        }
      } catch (error) {
        console.error('Erreur :', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="reservations-page">
      <h1>Mes Réservations</h1>
      <table>
        <thead>
          <tr>
            <th>ID Réservation</th>
            <th>Nombre de Couverts</th>
            <th>Date de Réservation</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id_reservation}>
              <td>{reservation.id_reservation}</td>
              <td>{reservation.nombre_couverts}</td>
              <td>{reservation.date_reservation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsResto;
