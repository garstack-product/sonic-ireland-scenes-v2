// server/db.js
import pg from 'pg';
const { Pool } = pg;

// Create a new pool instance
const pool = new Pool({
  user: 'your_db_username',
  host: 'localhost',
  database: 'sonic_ireland',
  password: 'your_db_password',
  port: 5432,
});

// Export the pool directly
export { pool };