import { query } from './db.js';

async function testConnection() {
  try {
    const res = await query('SELECT NOW() as current_time');
    console.log('Database connection successful:', res.rows[0].current_time);
  } catch (err) {
    console.error('Database connection failed:', err);
  }
}

testConnection();