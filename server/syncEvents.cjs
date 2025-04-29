require('dotenv').config();
const { fetchEventsFromTicketmaster, saveEventsToDB } = require('./eventsService.cjs');
const { query } = require('./db.cjs');

async function syncEvents() {
  console.log('🚀 Starting event sync...');
  try {
    const events = await fetchEventsFromTicketmaster();
    await saveEventsToDB(events);
    console.log(`✅ Synced ${events.length} events`);
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
  }
}

syncEvents();