import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './JourOuverture.css';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const OpenDatesCalendar = () => {
  const [events, setEvents] = useState([]);
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
        }));

        setEvents(events);
      } catch (error) {
        console.error('Erreur lors de la récupération des dates:', error);
      }
    };

    fetchOpenDates();
  }, []);

  const handleSelectEvent = (event) => {
    const date = moment(event.start).format('YYYY-MM-DD');
    navigate(`/reservation?date=${date}`);
  };

  return (
    <div className="calendar-container">
      <h1>Calendrier des Ouvertures du Restaurant</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default OpenDatesCalendar;
