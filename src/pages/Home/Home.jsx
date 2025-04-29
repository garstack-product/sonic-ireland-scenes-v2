// pages/Home/Home.jsx
import { useState, useEffect } from 'react';
import EventCard from '../../components/EventCard';
import FilterBar from '../../components/FilterBar';
import { getEventsFromDB } from '../../services/eventsService';
import './Home.css';
import EventMap from '../../components/Map';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    genre: '',
    dateRange: ''
  });

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await getEventsFromDB(filters);
        setEvents(events);
        
        // Extract unique cities and genres
        const uniqueCities = [...new Set(events.map(e => e.venue_city).filter(Boolean)].sort();
        const uniqueGenres = [...new Set(events.map(e => e.genre).filter(Boolean)].sort();
        setCities(uniqueCities);
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Failed to load events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [filters]);

  if (loading) return <div className="loading">Loading events...</div>;

  return (
    <div className="home-page">
      <section className="hero">
        <h2>Discover Music Events Across Ireland</h2>
      </section>

      <FilterBar 
        onFilter={setFilters} 
        cities={cities}
        genres={genres}
      />

      <section id="upcoming" className="events-grid">
        {events.length > 0 ? (
          events.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className="no-events">No events found matching your filters</div>
        )}
      </section>

        <section id="map" className="map-section">
            <h3>Events Map</h3>
            <EventMap events={events} />
        </section>
    </div>
  );
}