const axios = require('axios');
const { query } = require('./db.cjs');

const fetchEventsFromTicketmaster = async () => {
  try {
    // Verify environment variables
    if (!process.env.TICKETMASTER_API_KEY || !process.env.TICKETMASTER_BASE_URL) {
      throw new Error('Missing Ticketmaster API configuration');
    }

    const apiUrl = `${process.env.TICKETMASTER_BASE_URL}/events.json`;
    console.log(`🔍 Fetching from: ${apiUrl}`);

    const response = await axios.get(apiUrl, {
      params: {
        apikey: process.env.TICKETMASTER_API_KEY,
        countryCode: 'IE',
        classificationName: 'music',
        size: 50, // Reduced for testing
        sort: 'date,asc'
      },
      timeout: 5000 // 5 second timeout
    });

    if (!response.data._embedded?.events) {
      console.warn('⚠️ No events found in response');
      return [];
    }

    console.log(`📊 Received ${response.data._embedded.events.length} events`);
    return response.data._embedded.events.map(event => ({
      // ... keep your existing mapping ...
    }));

  } catch (error) {
    console.error('❌ Ticketmaster API Error:', {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });
    return [];
  }
};

const saveVenuesToDB = async (venues) => {
  const venueValues = venues.filter(v => v.id).map(venue => [
    venue.id,
    venue.name,
    venue.city || 'Unknown',
    venue.country || 'Ireland',
    venue.address?.line1,
    venue.postalCode,
    venue.location?.latitude,
    venue.location?.longitude
  ]);

  const queryText = `
    INSERT INTO venues (id, name, city, country, address, postal_code, latitude, longitude)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      city = EXCLUDED.city,
      country = EXCLUDED.country,
      address = EXCLUDED.address,
      postal_code = EXCLUDED.postal_code,
      latitude = EXCLUDED.latitude,
      longitude = EXCLUDED.longitude
  `;

  try {
    for (const values of venueValues) {
      await query(queryText, values);
    }
  } catch (error) {
    console.error('Error saving venues:', error.message);
  }
};

const saveEventsToDB = async (events) => {
  // First save venues
  const venues = events
    .filter(event => event.venue_id && event.venue_name)
    .map(event => ({
      id: event.venue_id,
      name: event.venue_name,
      city: event.venue_city || 'Unknown',
      country: event.venue_country || 'Ireland'
    }));

  await saveVenuesToDB(venues);

  // Then save events
  const eventValues = events.map(event => [
    event.id,
    event.name,
    new Date(event.date),
    event.venue_id,  // This can be null if venue info wasn't available
    event.ticket_url,
    event.genre || null,
    event.youtube_url || null,
    event.spotify_url || null,
    event.twitter_url || null,
    event.facebook_url || null,
    event.image_url || null
  ]);

  const queryText = `
    INSERT INTO events (
      id, name, date, venue_id, ticket_url, genre,
      youtube_url, spotify_url, twitter_url, facebook_url, image_url
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      date = EXCLUDED.date,
      venue_id = EXCLUDED.venue_id,
      ticket_url = EXCLUDED.ticket_url,
      genre = EXCLUDED.genre,
      youtube_url = EXCLUDED.youtube_url,
      spotify_url = EXCLUDED.spotify_url,
      twitter_url = EXCLUDED.twitter_url,
      facebook_url = EXCLUDED.facebook_url,
      image_url = EXCLUDED.image_url
  `;

  try {
    for (const values of eventValues) {
      await query(queryText, values);
    }
    console.log(`💾 Saved ${events.length} events to database`);
  } catch (error) {
    console.error('Error saving events:', error.message);
    throw error; // Re-throw to stop the sync process
  }
};

module.exports = {
  fetchEventsFromTicketmaster,
  saveEventsToDB,
  saveVenuesToDB
};