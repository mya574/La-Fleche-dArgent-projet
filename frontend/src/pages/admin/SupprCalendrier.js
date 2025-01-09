import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './SupprCalendrier.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

const localizer = momentLocalizer(moment);

const DeleteDatesCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOpenDates = async () => {
      try {
        const response = await fetch('http://localhost:3000/services/get_open_dates');
        const data = await response.json();

        const events = data.map(item => ({
          title: `Couverts: ${item.nombre_couverts}`,
          start: new Date(item.date),
          end: new Date(item.date),
          date: item.date, // date comme identifiant unique
        }));

        setEvents(events);
      } catch (error) {
        console.error('Erreur lors de la récupération des dates:', error);
      }
    };

    const token = localStorage.getItem('authToken');

    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAdmin(decodedToken.is_admin === 1);
    }

    fetchOpenDates();
  }, []);

  
    if (!isAdmin) {
      navigate('/connexion'); //  page de connexion si l'utilisateur n'est pas administrateur
    }
  

  const handleDeleteEvent = async (eventDate) => {
    const formattedDate = moment(eventDate).format('YYYY-MM-DD');
    try {
      const response = await fetch(`http://localhost:3000/services/delete_open_date/${formattedDate}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (response.ok) {
        setEvents(events.filter(event => event.date !== eventDate));
      } else {
        console.error('Erreur lors de la suppression de la date.');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de la date:', error);
    }
  };

  const handleSelectEvent = (event) => {
    Swal.fire({
      title: 'Supprimer cette date?',
      text: `Voulez-vous vraiment supprimer la date du ${moment(event.start).format('YYYY-MM-DD')}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteEvent(event.date);
        Swal.fire(
          'Supprimé!',
          'La date a été supprimée.',
          'success'
        );
      }
    });
  };

  return (
    <div className="calendar-container">
      <h1>Calendrier de Suppression des Ouvertures du Restaurant</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        components={{
          event: ({ event }) => (
            <div>
              <strong>{event.title}</strong>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default DeleteDatesCalendar;
