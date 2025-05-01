// src/components/ConcertCard/ConcertCard.jsx
import React from 'react';
import './ConcertCard.css';

const ConcertCard = ({ concert }) => {
  return (
    <div className="concert-card">
      <div className="concert-image">
        <img 
          src={concert.imageurl || '/default-concert.jpg'} 
          alt={concert.title} 
          onError={(e) => {
            e.target.src = '/default-concert.jpg';
          }}
        />
      </div>
      <div className="concert-details">
        <h3>{concert.title}</h3>
        <p className="date">{new Date(concert.date).toLocaleDateString()}</p>
        <p className="venue">{concert.venue}</p>
        <p className="price">€{concert.price}</p>
      </div>
    </div>
  );
};

export default ConcertCard;