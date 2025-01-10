import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './ClientReserv.css';

const ReservationsResto = () => {
  const [reservationsResto, setReservationsResto] = useState([]);
  const [reservationsChambres, setReservationsChambres] = useState([]);
  const [reservationsSoins, setReservationsSoins] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, []);

  // Récupérer les réservations du restaurant
  const fetchReservationsResto = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
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
        setReservationsResto(data.reservations);
      } else {
        console.error('Erreur lors de la récupération des réservations :', data.message);
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  // Récupérer les réservations des chambres
  const fetchReservationsChambres = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/connexion';
      return;
    }

    const decodedToken = jwtDecode(token);
    const id_utilisateur = decodedToken.id;

    try {
      const response = await fetch('http://localhost:3000/chambre/get-all-res-chambres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id_utilisateur }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Réservations de chambres récupérées :', data.reservations);
        setReservationsChambres(data.reservations);
      } else {
        console.error('Erreur lors de la récupération des réservations de chambres :', data.message);
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  // Récupérer les réservations des soins
  const fetchReservationsSoins = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/connexion';
      return;
    }

    const decodedToken = jwtDecode(token);
    const id_utilisateur = decodedToken.id;

    try {
      const response = await fetch('http://localhost:3000/soin/get-all-res-soins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id_utilisateur }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Réservations de soins récupérées :', data.reservations);
        setReservationsSoins(data.reservations);
      } else {
        console.error('Erreur lors de la récupération des réservations de soins :', data.message);
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  useEffect(() => {
    fetchReservationsResto();
    fetchReservationsChambres();
    fetchReservationsSoins();
  }, []);

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Supprimer une réservation de restaurant
  const handleDeleteReservationResto = async (id_reservation) => {
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
        fetchReservationsResto();
      } else {
        console.error('Erreur lors de la suppression de la réservation :', data.message);
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  // Supprimer une réservation de chambre
  const handleDeleteReservationChambre = async (id_reservation_chambre) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/connexion';
      return;
    }

    const decodedToken = jwtDecode(token);
    const id_utilisateur = decodedToken.id;

    try {
      const response = await fetch('http://localhost:3000/chambre/supprimer-reservation', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id_utilisateur, id_reservation_chambre }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchReservationsChambres();
      } else {
        console.error('Erreur lors de la suppression de la réservation :', data.message);
      }
    } catch (error) {
      console.error('Erreur :', error);
    }
  };

  // Supprimer une réservation de soin
  const handleDeleteReservationSoin = async (id_soin) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      window.location.href = '/connexion';
      return;
    }

    const decodedToken = jwtDecode(token);
    const id_utilisateur = decodedToken.id;

    try {
      const response = await fetch('http://localhost:3000/soin/supprimer-reservation-soin', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id_utilisateur, id_soin }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchReservationsSoins();
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
           
            <th>Nombre de Couverts</th>
            <th>Date de Réservation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservationsResto.map((reservation) => (
            <tr key={reservation.id_reservation}>
             
              <td>{reservation.nombre_couverts}</td>
              <td>{formatDate(reservation.date_reservation)}</td>
              <td>
                {userId === reservation.id_utilisateur && (
                  <button onClick={() => handleDeleteReservationResto(reservation.id_reservation)}>Supprimer</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Réservations de Chambres</h2>
      <table>
        <thead>
          <tr>
           
            <th>Nom de la Chambre</th>
            <th>Date de Début</th>
            <th>Date de Fin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservationsChambres.map((reservation) => (
            <tr key={reservation.id_reservation_chambre}>
              
              <td>{reservation.nom_chambre}</td>
              <td>{formatDate(reservation.date_debut)}</td>
              <td>{formatDate(reservation.date_fin)}</td>
              <td>
                {userId === reservation.id_utilisateur && (
                  <button onClick={() => handleDeleteReservationChambre(reservation.id_reservation_chambre)}>Supprimer</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Réservations de Soins</h2>
      <table>
        <thead>
          <tr>
            
            <th>Nom du Soin</th>
            <th>Date de Réservation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservationsSoins.map((reservation) => (
            <tr key={reservation.id_soin}>
              
              <td>{reservation.nom_soin}</td>
              <td>{formatDate(reservation.date_reservation)}</td>
              <td>
                {userId === reservation.id_utilisateur && (
                  <button onClick={() => handleDeleteReservationSoin(reservation.id_soin)}>Supprimer</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsResto;
