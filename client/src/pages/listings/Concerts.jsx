/// src/pages/listings/Concerts.jsx
import React, { useState, useEffect } from 'react';
import api from '../../api/api.js';
import ConcertCard from '../../components/ConcertCard/ConcertCard';
import './Concerts.css';

const Concerts = () => {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(50);
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await api.get('/concerts');
        
        // Additional success check
        if (response.status !== 200) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        
        // Verify data structure
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid data format received from API');
        }

        setConcerts(response.data);
        setError(null);
      } catch (err) {
        // Enhanced error logging
        console.error('API Error Details:', {
          message: err.message,
          config: err.config,
          response: err.response?.data,
          status: err.response?.status
        });
        
        setError(err.response?.data?.message || 
                err.message || 
                'Failed to load concerts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);


  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize('desktop');
        setVisibleCount(50); // 10 rows x 5 columns
      } else if (width >= 768) {
        setScreenSize('tablet');
        setVisibleCount(30); // 10 rows x 3 columns
      } else {
        setScreenSize('mobile');
        setVisibleCount(30); // 30 rows x 1 column
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const loadMore = () => {
    setVisibleCount(prev => {
      if (screenSize === 'desktop') return prev + 50;
      if (screenSize === 'tablet') return prev + 30;
      return prev + 30; // mobile
    });
  };

  if (loading) return <div className="loading">Loading concerts...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="concerts-page">
      <h1>Upcoming Concerts</h1>
      <div className={`concerts-grid ${screenSize}`}>
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