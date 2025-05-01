// server/db.js
import pg from 'pg';
const { Pool } = pg;

// Create a new pool instance
const pool = new Pool({
  user: 'dirtybootsuser',
  host: 'localhost',
  database: 'gotdirtyboots',
  password: 'simplepass',
  port: 5432,
});

// Export the pool directly
export { pool };