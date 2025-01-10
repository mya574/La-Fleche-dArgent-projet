import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './ClientReserv.css';

const ReservationsResto = () => {
  const [reservations, setReservations] = useState([]);

  // récupérer les réservations
  const fetchReservations = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // la page de connexion si pas de token
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
        console.log('Réservations récupérées :', data.reservations); 
        setReservations(data.reservations);
      } else {
        console.error('Erreur lors de la récupération des réservations :', data.message);
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  //supprimer une réservation
  const handleDeleteReservation = async (id_reservation) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      
      window.location.href = '/connexion';
      return;
    }

    const decodedToken = jwtDecode(token);
    const id_utilisateur = decodedToken.id;

    try {
      const response = await fetch('http://localhost:3000/restaurant/supprimer', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id_utilisateur, id_reservation }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        // reload
        fetchReservations();
      } else {
        console.error('Erreur lors de la suppression de la réservation :', data.message);
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  return (
    <div className="reservations-page">
      <h1>Mes Réservations</h1>
      <h2>Réservations au Restaurant</h2>
      <table>
        <thead>
          <tr>
            <th>ID Réservation</th>
            <th>Nombre de Couverts</th>
            <th>Date de Réservation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id_reservation}>
              <td>{reservation.id_reservation}</td>
              <td>{reservation.nombre_couverts}</td>
              <td>{formatDate(reservation.date_reservation)}</td>
              <td>
                <button onClick={() => handleDeleteReservation(reservation.id_reservation)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsResto;
