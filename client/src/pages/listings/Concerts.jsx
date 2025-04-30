// src/pages/listings/Concerts.jsx
import React, { useState, useEffect } from 'react';
import ConcertCard from '../../components/ConcertCard/ConcertCard';
import './Concerts.css';

// Mock data - replace with your API call
const mockConcerts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Concert ${i + 1}`,
  date: new Date(Date.now() + i * 86400000).toLocaleDateString(),
  venue: `Venue ${(i % 5) + 1}`,
  price: `€${20 + (i % 10) * 5}`,
  imageUrl: `https://picsum.photos/300/200?random=${i}`
}));

const Concerts = () => {
  const [visibleConcerts, setVisibleConcerts] = useState(12);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const loadMore = () => {
    setVisibleConcerts(prev => prev + 12);
  };

  return (
    <div className="concerts-page">
      <h1>Upcoming Concerts</h1>
      <div className={`concerts-grid ${isMobile ? 'mobile' : ''}`}>
        {mockConcerts.slice(0, visibleConcerts).map(concert => (
          <ConcertCard key={concert.id} concert={concert} />
        ))}
      </div>
      {visibleConcerts < mockConcerts.length && (
        <button className="load-more" onClick={loadMore}>
          Show More
        </button>
      )}
    </div>
  );
};

export default Concerts;