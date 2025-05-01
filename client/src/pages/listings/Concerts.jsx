// src/pages/listings/Concerts.jsx
import React, { useState, useEffect } from 'react';
import ConcertCard from '../../components/ConcertCard/ConcertCard';
import './Concerts.css';
import axios from 'axios';

const Concerts = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(30); // Start with 30 items

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/concerts');
        setConcerts(response.data);
      } catch (err) {
        console.error('API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  const loadMore = () => {
    setVisibleCount(prev => prev + 30);
  };

  if (loading) return <div className="loading">Loading concerts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="concerts-page">
      <h1>Upcoming Concerts</h1>
      <div className="concerts-grid">
        {concerts.slice(0, visibleCount).map(concert => (
          <ConcertCard key={concert.id} concert={concert} />
        ))}
      </div>
      {visibleCount < concerts.length && (
        <button className="load-more" onClick={loadMore}>
          Show More
        </button>
      )}
    </div>
  );
};

export default Concerts;