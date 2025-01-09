
import React from 'react';
import './Card.css'; 

const Card = ({ firstName, lastName, comment }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{firstName} {lastName}</h3>
      </div>
      <div className="card-body">
        <p>{comment || "Aucun commentaire disponible."}</p>
      </div>
    </div>
  );
};

export default Card;
