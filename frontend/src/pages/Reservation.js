import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './Reservation.css';
import { jwtDecode } from 'jwt-decode';

const Reservation = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedSpaService, setSelectedSpaService] = useState('');
  const [selectedRestaurantService, setSelectedRestaurantService] = useState('');
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [numCouverts, setNumCouverts] = useState(0);

  const services = [
    { name: 'Chambre', options: ['Classique', 'Confort', 'Standing', 'Suite'] },
    { name: 'Spa', options: ['Gommage corps en cabine', 'Massage relaxant aux huiles essentielles', 'Massage tonique', 'Massage balinais', 'Massage aux pierres chaudes'] },
    { name: 'Restauration', options: ['Petit-déjeuner', 'Dîner', 'Room service'] }
  ];

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    setSelectedRoomType('');
    setSelectedSpaService('');
    setSelectedRestaurantService('');
    setArrivalDate(null);
    setDepartureDate(null);
    setSelectedDate(null);
  };

  const handleRoomTypeChange = (e) => {
    setSelectedRoomType(e.target.value);
  };

  const handleSpaServiceChange = (e) => {
    setSelectedSpaService(e.target.value);
  };

  const handleRestaurantServiceChange = (e) => {
    setSelectedRestaurantService(e.target.value);
  };

  const handleAdultsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setNumAdults(value);
      setNumCouverts(value + numChildren);
    }
  };

  const handleChildrenChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setNumChildren(value);
      setNumCouverts(numAdults + value);
    }
  };

  const handleArrivalDateChange = (date) => {
    setArrivalDate(date);
    if (departureDate && date > departureDate) {
      setDepartureDate(null);
    }
  };

  const handleDepartureDateChange = (date) => {
    setDepartureDate(date);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getToken = () => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token); // Ajoutez ce log
    return token;
  };

  const getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Ajoutez ce log
      return decodedToken.id; // Assurez-vous que votre token contient un champ 'id'
    } catch (error) {
      console.error('Erreur lors du décodage du token :', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!selectedService ||
        (selectedService === 'Chambre' && (!selectedRoomType || !arrivalDate || !departureDate)) ||
        (selectedService !== 'Chambre' && !selectedDate) ||
        (selectedService === 'Spa' && !selectedSpaService) ||
        (selectedService === 'Restauration' && !selectedRestaurantService) ||
        numAdults <= 0) {
      alert('Veuillez remplir tous les champs correctement');
      return;
    }

    const reservationData = {
      nombre_couverts: numCouverts,
      date_reservation: selectedDate,
      service: selectedService,
      details: {
        roomType: selectedRoomType,
        spaService: selectedSpaService,
        restaurantService: selectedRestaurantService,
        numAdults,
        numChildren
      }
    };

    const token = getToken();

    if (!token) {
      alert('Vous devez être connecté pour effectuer une réservation.');
      return;
    }

    const userId = getUserIdFromToken(token);

    if (!userId) {
      alert('Impossible de récupérer l\'ID de l\'utilisateur.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/restaurent/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...reservationData, userId })
      });

      const result = await response.json();
      if (response.ok) {
        alert('Réservation confirmée !');
      } else {
        alert(`Erreur : ${result.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la réservation :', error);
      alert('Erreur lors de la réservation');
    }
  };

  const isFormValid = () => {
    return selectedService &&
           (selectedService !== 'Chambre' || (selectedRoomType && arrivalDate && departureDate)) &&
           (selectedService !== 'Chambre' || selectedDate) &&
           (selectedService !== 'Spa' || selectedSpaService) &&
           (selectedService !== 'Restauration' || selectedRestaurantService) &&
           numAdults > 0;
  };

  return (
    <div className="reservation-form">
      <h1 className='reservation-title'>Formulaire de Réservation</h1>

      {/* Choix du service */}
      <div className="form-group">
        <label htmlFor="service">Sélectionner un service :</label>
        <select id="service" value={selectedService} onChange={handleServiceChange}>
          <option value="">-- Choisissez un service --</option>
          {services.map(service => (
            <option key={service.name} value={service.name}>{service.name}</option>
          ))}
        </select>
      </div>

      {/* Section Chambre */}
      {selectedService === 'Chambre' && (
        <div>
          <div className="form-group">
            <label htmlFor="roomType">Choisir un type de chambre :</label>
            <select id="roomType" value={selectedRoomType} onChange={handleRoomTypeChange}>
              <option value="">-- Choisissez un type de chambre --</option>
              {services.find(service => service.name === 'Chambre').options.map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>

          {/* Sélection de la date d'arrivée et de départ */}
          <div className="form-group">
            <label htmlFor="arrivalDate">Date d'arrivée :</label>
            <DatePicker
              id="arrivalDate"
              selected={arrivalDate}
              onChange={handleArrivalDateChange}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()} // empeche sélection d'une date passée
              placeholderText="Choisissez une date d'arrivée"
              className="date-picker"
            />
          </div>

          <div className="form-group">
            <label htmlFor="departureDate">Date de départ :</label>
            <DatePicker
              id="departureDate"
              selected={departureDate}
              onChange={handleDepartureDateChange}
              dateFormat="dd/MM/yyyy"
              minDate={arrivalDate || new Date()} // la date de départ ne peut pas etre avant la date d'arrivée
              placeholderText="Choisissez une date de départ"
              className="date-picker"
            />
          </div>
        </div>
      )}

      {/* Section Spa */}
      {selectedService === 'Spa' && (
        <div>
          <div className="form-group">
            <label htmlFor="spaService">Choisir un soin :</label>
            <select id="spaService" value={selectedSpaService} onChange={handleSpaServiceChange}>
              <option value="">-- Choisissez un soin --</option>
              {services.find(service => service.name === 'Spa').options.map(spa => (
                <option key={spa} value={spa}>{spa}</option>
              ))}
            </select>
          </div>

          {/* Sélection de la date (uniquement pour Spa) */}
          <div className="form-group">
            <label htmlFor="date">Sélectionner une date :</label>
            <DatePicker
              id="date"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()} // empeche la sélection d'une date passée
              placeholderText="Choisissez une date"
              className="date-picker"
            />
          </div>
        </div>
      )}

      {/* Section Restauration */}
      {selectedService === 'Restauration' && (
        <div>
          <div className="form-group">
            <label htmlFor="restaurantService">Choisir un repas :</label>
            <select id="restaurantService" value={selectedRestaurantService} onChange={handleRestaurantServiceChange}>
              <option value="">-- Choisissez un repas --</option>
              {services.find(service => service.name === 'Restauration').options.map(meal => (
                <option key={meal} value={meal}>{meal}</option>
              ))}
            </select>
          </div>

          {/* Sélection de la date (uniquement pour Restauration) */}
          <div className="form-group">
            <label htmlFor="date">Sélectionner une date :</label>
            <DatePicker
              id="date"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()} // empeche la sélection d'une date passée
              placeholderText="Choisissez une date"
              className="date-picker"
            />
          </div>
        </div>
      )}

      {/* Nombre d'adultes et d'enfants */}
      <div className="form-group">
        <label htmlFor="adults">Nombre d'adultes :</label>
        <input
          type="number"
          id="adults"
          value={numAdults}
          onChange={handleAdultsChange}
          min="1"
        />
      </div>

      <div className="form-group">
        <label htmlFor="children">Nombre d'enfants (moins de 12 ans) :</label>
        <input
          type="number"
          id="children"
          value={numChildren}
          onChange={handleChildrenChange}
          min="0"
        />
      </div>

      {/* Bouton de réservation */}
      <div className="form-group">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isFormValid()}
        >
          Réserver maintenant
        </button>
      </div>
    </div>
  );
};

export default Reservation;
