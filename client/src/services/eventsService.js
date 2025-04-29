import axios from 'axios';
import { query } from '../../../server/db.js';

const API_KEY = process.env.TICKETMASTER_API_KEY;
const BASE_URL = process.env.TICKETMASTER_BASE_URL;

// Fetch events from Ticketmaster API
const fetchEventsFromTicketmaster = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/events.json`, {
      params: {
        apikey: API_KEY,
        countryCode: 'IE',
        classificationName: 'music',
        size: 200,
        sort: 'date,asc',
        includeExternalLinks: 'yes'
      }
    });
    
    return response.data._embedded?.events.map(event => {
      const venue = event._embedded?.venues?.[0];
      const attraction = event._embedded?.attractions?.[0];
      
      return {
        ...event,
        venue: venue ? {
          id: venue.id,
          name: venue.name,
          city: venue.city?.name,
          country: venue.country?.name,
          address: venue.address?.line1,
          postalCode: venue.postalCode,
          location: venue.location
        } : null,
        externalLinks: attraction?.externalLinks || {}
      };
    }) || [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

// Save venues to database
const saveVenuesToDB = async (venues) => {
  const validVenues = venues.filter(venue => venue?.id);
  
  if (validVenues.length === 0) return;

  const values = validVenues.map(venue => [
    venue.id,
    venue.name,
    venue.city || 'Unknown city',
    venue.country || 'Ireland',
    venue.address,
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
      longitude = EXCLUDED.longitude,
      last_updated = CURRENT_TIMESTAMP
  `;

  try {
    for (const value of values) {
      await query(queryText, value);
    }
    console.log(`Saved ${validVenues.length} venues`);
  } catch (error) {
    console.error('Error saving venues:', error);
  }
};

// Save events to database
const saveEventsToDB = async (events) => {
  const venues = events.map(event => event.venue).filter(Boolean);
  await saveVenuesToDB(venues);

  const eventValues = events.map(event => {
    const links = event.externalLinks || {};
    
    return [
      event.id,
      event.name,
      new Date(event.dates.start.dateTime),
      event.venue?.id || null,
      event.url,
      event.classifications?.[0]?.genre?.name || 'Music',
      links.youtube?.[0]?.url,
      links.spotify?.[0]?.url,
      links.instagram?.[0]?.url,
      links.twitter?.[0]?.url,
      links.facebook?.[0]?.url,
      event.images?.find(img => img.width > 1000)?.url || event.images?.[0]?.url || ''
    ];
  });

  const queryText = `
    INSERT INTO events (
      id, name, date, venue_id, ticket_url, genre, 
      youtube_url, spotify_url, instagram_url, 
      twitter_url, facebook_url, image_url
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      date = EXCLUDED.date,
      venue_id = EXCLUDED.venue_id,
      ticket_url = EXCLUDED.ticket_url,
      genre = EXCLUDED.genre,
      youtube_url = EXCLUDED.youtube_url,
      spotify_url = EXCLUDED.spotify_url,
      instagram_url = EXCLUDED.instagram_url,
      twitter_url = EXCLUDED.twitter_url,
      facebook_url = EXCLUDED.facebook_url,
      image_url = EXCLUDED.image_url,
      last_updated = CURRENT_TIMESTAMP
  `;

  try {
    for (const value of eventValues) {
      await query(queryText, value);
    }
    console.log(`Saved ${events.length} events`);
  } catch (error) {
    console.error('Error saving events:', error);
  }
};

// Get events from database
const getEventsFromDB = async (filters = {}) => {
  const { city, genre, fromDate, toDate, searchQuery } = filters;
  
  let queryText = `
    SELECT 
      e.*,
      v.name as venue_name,
      v.city as venue_city
    FROM events e
    LEFT JOIN venues v ON e.venue_id = v.id
    WHERE e.date >= NOW()
  `;
  
  const queryParams = [];

  if (city) {
    queryText += ' AND v.city = $1';
    queryParams.push(city);
  }

  if (genre) {
    queryText += ` ${queryParams.length ? 'AND' : ''} e.genre = $${queryParams.length + 1}`;
    queryParams.push(genre);
  }

  if (searchQuery) {
    queryText += ` ${queryParams.length ? 'AND' : ''} 
      (e.name ILIKE $${queryParams.length + 1} OR 
       v.name ILIKE $${queryParams.length + 1})`;
    queryParams.push(`%${searchQuery}%`);
  }

  if (fromDate) {
    queryText += ` ${queryParams.length ? 'AND' : ''} e.date >= $${queryParams.length + 1}`;
    queryParams.push(new Date(fromDate));
  }

  if (toDate) {
    queryText += ` ${queryParams.length ? 'AND' : ''} e.date <= $${queryParams.length + 1}`;
    queryParams.push(new Date(toDate));
  }

  // Add to getEventsFromDB
  if (filters.ids) {
    queryText += ` ${queryParams.length ? 'AND' : ''} e.id = ANY($${queryParams.length + 1})`;
    queryParams.push(filters.ids);
  }

  queryText += ' ORDER BY e.date ASC';

  try {
    const result = await query(queryText, queryParams);
    return result.rows;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

// Single export statement at the end
export { 
  fetchEventsFromTicketmaster, 
  saveEventsToDB, 
  getEventsFromDB, 
  saveVenuesToDB 
};