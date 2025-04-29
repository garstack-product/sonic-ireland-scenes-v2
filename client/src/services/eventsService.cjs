const axios = require('axios');
const { query } = require('./db.cjs');

const fetchEventsFromTicketmaster = async () => {
  try {
    const response = await axios.get(`${process.env.TICKETMASTER_BASE_URL}/events.json`, {
      params: {
        apikey: process.env.TICKETMASTER_API_KEY,
        countryCode: 'IE',
        classificationName: 'music',
        size: 200,
        sort: 'date,asc'
      }
    });

    return response.data._embedded?.events.map(event => {
      const venue = event._embedded?.venues?.[0];
      const attraction = event._embedded?.attractions?.[0];
      
      // Handle date parsing safely
      let eventDate;
      try {
        eventDate = event.dates?.start?.dateTime 
          ? new Date(event.dates.start.dateTime) 
          : null;
      } catch (e) {
        console.warn(`Invalid date for event ${event.id}:`, event.dates?.start);
        eventDate = null;
      }

      return {
        id: event.id,
        name: event.name,
        date: dateObj,
        venue_id: venue?.id,
        venue_name: venue?.name,
        venue_city: venue?.city?.name,
        venue_country: venue?.country?.name,
        genre: event.classifications?.[0]?.genre?.name,
        ticket_url: event.url,
        image_url: event.images?.find(img => img.width > 1000)?.url || event.images?.[0]?.url,
        youtube_url: attraction?.externalLinks?.youtube?.[0]?.url,
        spotify_url: attraction?.externalLinks?.spotify?.[0]?.url,
        twitter_url: attraction?.externalLinks?.twitter?.[0]?.url
      };
    }) || [];

  } catch (error) {
    console.error('Error fetching from Ticketmaster:', error.message);
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
    .filter(event => event.venue_id)
    .map(event => ({
      id: event.venue_id,
      name: event.venue_name,
      city: event.venue_city,
      country: event.venue_country
    }));

  await saveVenuesToDB(venues);

  // Then save events
  const eventValues = events.map(event => [
    event.id,
    event.name,
    event.date ? event.date.toISOString() : null, // Handle null dates
    event.venue_id,
    event.ticket_url,
    event.genre,
    event.youtube_url,
    event.spotify_url,
    event.twitter_url,
    event.image_url
  ]);

  const queryText = `
    INSERT INTO events (
      id, name, date, venue_id, ticket_url, genre, 
      youtube_url, spotify_url, twitter_url, image_url
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      date = EXCLUDED.date,
      venue_id = EXCLUDED.venue_id,
      ticket_url = EXCLUDED.ticket_url,
      genre = EXCLUDED.genre,
      youtube_url = EXCLUDED.youtube_url,
      spotify_url = EXCLUDED.spotify_url,
      twitter_url = EXCLUDED.twitter_url,
      image_url = EXCLUDED.image_url
  `;

  try {
    for (const values of eventValues) {
      await query(queryText, values);
    }
    console.log(`✅ Successfully saved ${events.length} events`);
  } catch (error) {
    console.error('Error saving events:', error.message);
  }
};

module.exports = {
  fetchEventsFromTicketmaster,
  saveEventsToDB,
  saveVenuesToDB
};