import 'dotenv/config';
import express from 'express';
import { Pool } from 'pg';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

app.get('/api/events', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM events ORDER BY start_date');
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});


app.get('/', (req, res) => {
    res.send(`
      <h1>Sonic Ireland Scenes API</h1>
      <p>Available endpoints:</p>
      <ul>
        <li><a href="/api/events">/api/events</a> - Get all events</li>
      </ul>
    `);
  });

  
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});