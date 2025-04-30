import { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import './Home.css';
  
  
  
  export default function Home() {
    // All hooks must be inside the component
    const [error, setError] = useState(null);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchEvents() {
        try {
          const response = await fetch('/api/events');
          const data = await response.json();
          setEvents(data);
          setFilteredEvents(data);
        } catch (error) {
          console.error('Error fetching events:', error);
        } finally {
          setLoading(false);
        }
      }
      fetchEvents();
    }, []);
  
    useEffect(() => {
      let results = [...events];
      const now = new Date();
  
      // Apply date filter
      if (activeFilter === 'upcoming') {
        results = results.filter(event => new Date(event.start_date) > now);
      } else if (activeFilter === 'past') {
        results = results.filter(event => new Date(event.start_date) < now);
      }
  
      // Apply search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        results = results.filter(event => 
          event.name.toLowerCase().includes(query) ||
          event.venue.toLowerCase().includes(query) ||
          event.classification.toLowerCase().includes(query)
        );
      }
  
      setFilteredEvents(results);
    }, [activeFilter, searchQuery, events]);
  
    const handleSearch = (query) => {
      setSearchQuery(query);
    };
  
    if (loading) return <div className="loading">Loading events...</div>;
  
    return (
      <div className="app">
        <Header />
        
        <main className="main-content">
          <div className="controls">
            <FilterBar 
              activeFilter={activeFilter} 
              setActiveFilter={setActiveFilter} 
            />
            <SearchBar onSearch={handleSearch} />
          </div>
  
          <div className="events-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <EventCard key={event.event_id} event={event} />
              ))
            ) : (
              <div className="no-events">
                No events found matching your criteria
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }