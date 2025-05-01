// src/components/ConcertCard/ConcertCard.jsx
import React from 'react';
import './ConcertCard.css';

const ConcertCard = ({ concert }) => {
  return (
    <div className="concert-card">
      <div className="concert-image">
        <img src={concert.imageUrl || '/default-concert.jpg'} alt={concert.title} />
        <div className="artist-badge">{concert.artist}</div>
      </div>
      <div className="concert-details">
        <h3>{concert.title}</h3>
        <div className="date-venue">
          <span className="date">{new Date(concert.date).toLocaleDateString()}</span>
          <span className="venue">{concert.venue}</span>
        </div>
        <p className="description">{concert.description.substring(0, 100)}...</p>
        <div className="price-row">
          <span className="price">{concert.price}</span>
          <button className="cta-button">Get Tickets</button>
        </div>
      </div>
    </div>
  );
};

export default ConcertCard;