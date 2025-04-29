import { useState, useEffect } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';
import { EventList } from './components/EventList';
import { FilterPanel } from './components/FilterPanel';
import { getEventsFromDB, fetchEventsFromTicketmaster, saveEventsToDB } from './services/eventsService';

function App() {
  const [events, setEvents] = useState([]);
  const [cities, setCities] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch fresh data from Ticketmaster daily
        const lastUpdate = localStorage.getItem('lastUpdate');
        const shouldUpdate = !lastUpdate || (new Date() - new Date(lastUpdate)) > 86400000; // 24 hours
        
        if (shouldUpdate) {
          const ticketmasterEvents = await fetchEventsFromTicketmaster();
          await saveEventsToDB(ticketmasterEvents);
          localStorage.setItem('lastUpdate', new Date().toISOString());
        }

        // Get events from DB
        const dbEvents = await getEventsFromDB();
        setEvents(dbEvents);

        // Extract unique cities and genres for filters
        const uniqueCities = [...new Set(dbEvents.map(e => e.city))].sort();
        const uniqueGenres = [...new Set(dbEvents.map(e => e.genre))].sort();
        
        setCities(uniqueCities);
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFilter = async (filters) => {
    setLoading(true);
    try {
      const filteredEvents = await getEventsFromDB(filters);
      setEvents(filteredEvents);
    } catch (error) {
      console.error('Error filtering events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="xl" sx={{ display: 'flex', mt: 2 }}>
        <FilterPanel 
          onFilter={handleFilter} 
          cities={cities} 
          genres={genres} 
        />
        <EventList events={events} />
      </Container>
    </>
  );
}

export default App;
