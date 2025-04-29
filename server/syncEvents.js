import 'dotenv/config';
import { fetchEventsFromTicketmaster, saveEventsToDB } from '../src/services/eventsService.jsx';
import { query } from './db.jsx';

// Function to check last update time
const getLastUpdateTime = async () => {
  const result = await query('SELECT MAX(last_updated) as last_update FROM events');
  return result.rows[0].last_update;
};

// Main sync function
const syncEvents = async () => {
  console.log('🚀 Starting event sync with Ticketmaster API...');
  
  try {
    const lastUpdate = await getLastUpdateTime();
    const now = new Date();
    
    if (lastUpdate && (now - new Date(lastUpdate)) < 86400000) {
      console.log('⏭️ Sync skipped - updated within last 24 hours');
      return;
    }

    console.log('🔍 Fetching events from Ticketmaster...');
    const events = await fetchEventsFromTicketmaster();
    
    if (!events.length) {
      throw new Error('No events received from Ticketmaster');
    }

    console.log(`💾 Saving ${events.length} events to database...`);
    await saveEventsToDB(events);
    
    console.log('✅ Sync completed successfully at', new Date().toISOString());
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
  }
};

// Run the sync
syncEvents();