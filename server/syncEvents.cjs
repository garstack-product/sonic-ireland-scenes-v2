require('dotenv').config();
const { Pool } = require('pg');
const axios = require('axios');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function verifySchema() {
  try {
    const res = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'events'
    `);
    const columns = res.rows.map(row => row.column_name);
    
    if (!columns.includes('event_id')) {
      // Add event_id column if it doesn't exist
      await pool.query(`
        ALTER TABLE events 
        ADD COLUMN event_id VARCHAR(255) UNIQUE NOT NULL DEFAULT 'temp'
      `);
      console.log('✅ Added event_id column to existing table');
    }
  } catch (err) {
    console.error('Schema verification error:', err.message);
  }
}

function parseTicketmasterDate(dateObj) {
  if (!dateObj) return null;
  const dateString = dateObj.dateTime || dateObj.localDate;
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
}

async function syncEvents() {
  console.log('🚀 Starting event sync...');
  
  try {
    // Verify schema before proceeding
    await verifySchema();

    const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=IE&apikey=${process.env.TICKETMASTER_API_KEY}&size=200`;
    console.log(`🔍 Fetching from: ${apiUrl.split('?')[0]}`);
    
    const response = await axios.get(apiUrl);
    const events = response.data._embedded?.events || [];
    console.log(`📊 Received ${events.length} events`);

    const eventsToSave = events.map(event => {
      const startDate = parseTicketmasterDate(event.dates?.start);
      const endDate = parseTicketmasterDate(event.dates?.end);

      if (!startDate) {
        console.warn(`⚠️ Skipping event ${event.id} - invalid start date`);
        return null;
      }

      return {
        id: event.id,
        name: event.name,
        url: event.url,
        start_date: startDate.toISOString(),
        end_date: endDate?.toISOString() || null,
        venue: event._embedded?.venues?.[0]?.name || 'Unknown venue',
        image_url: event.images?.find(img => img.width > 500)?.url || null,
        classification: event.classifications?.[0]?.genre?.name || 'Uncategorized'
      };
    }).filter(event => event !== null);

    await pool.query('BEGIN');
    await pool.query('TRUNCATE TABLE events RESTART IDENTITY');
    
    for (const event of eventsToSave) {
      try {
        await pool.query(
          `INSERT INTO events 
           (event_id, name, url, start_date, end_date, venue, image_url, classification) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
          [
            event.id,
            event.name,
            event.url,
            event.start_date,
            event.end_date,
            event.venue,
            event.image_url,
            event.classification
          ]
        );
      } catch (err) {
        console.error(`Failed to insert event ${event.id}:`, err.message);
      }
    }
    
    await pool.query('COMMIT');
    console.log(`✅ Successfully saved ${eventsToSave.length} events`);
    
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('❌ Sync failed:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

syncEvents();