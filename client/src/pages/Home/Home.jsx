import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../../components/EventCard/EventCard.jsx';
import FilterBar from '../../components/FilterBar/FilterBar.jsx';
import './Home.css';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/events');
        const events = response.data || [];
        setEvents(events);
        
        // Correct syntax for extracting unique values:
        const uniqueCities = Array.from(
          new Set(events.flatMap(e => e.venue_city ? [e.venue_city] : []))
        ).sort();

        const uniqueGenres = Array.from(
          new Set(events.flatMap(e => e.genre ? [e.genre] : []))
        ).sort();

        setCities(uniqueCities);
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [filters]);

  if (loading) return <div className="loading">Loading events...</div>;

  return (
    <div className="home-page">
      <FilterBar 
        cities={cities}
        genres={genres}
        onFilter={setFilters}
      />
      
      <div className="events-grid">
        {events.length > 0 ? (
          events.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="no-events">No events found</div>
        )}
      </div>
    </div>
  );
}