// src/components/ConcertCard/ConcertCard.jsx
import React from 'react';
import './ConcertCard.css';

const ConcertCard = ({ concert }) => {
  return (
    <div className="concert-card">
      <div className="concert-image">
        <img src={concert.imageUrl} alt={concert.title} />
      </div>
      <div className="concert-details">
        <h3>{concert.title}</h3>
        <p className="date">{concert.date}</p>
        <p className="venue">{concert.venue}</p>
        <p className="price">{concert.price}</p>
        <button className="cta-button">Get Tickets</button>
      </div>
    </div>
  );
};

export default ConcertCard;