// server/db.js
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER || 'dirtybootsuser',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'gotdirtyboots',
  password: process.env.DB_PASSWORD || 'simplepass',
  port: process.env.DB_PORT || 5432,
});

export default pool;