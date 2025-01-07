import React from "react";
import "./ReservationForm.css";

const ReservationForm = ({ serviceType }) => (
  <form className="reservation-form">
    <h3>Réserver pour {serviceType}</h3>
    <label>
      Nom :
      <input type="text" name="name" required />
    </label>
    <label>
      Email :
      <input type="email" name="email" required />
    </label>
    <label>
      Téléphone :
      <input type="tel" name="phone" required />
    </label>
    {serviceType === "chambre" && (
      <>
        <label>
          Type de chambre :
          <select name="roomType" required>
            <option value="classique">Classique</option>
            <option value="confort">Confort</option>
            <option value="standing">Standing</option>
            <option value="suite">Suite</option>
          </select>
        </label>
        <label>
          Dates :
          <input type="date" name="startDate" required />
          <input type="date" name="endDate" required />
        </label>
      </>
    )}
    <button type="submit">Réserver</button>
  </form>
);

export default ReservationForm;
