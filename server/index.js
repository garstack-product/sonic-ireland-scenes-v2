// server/index.js
const express = require('express');
const cors = require('cors');
const { query } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// API Endpoints
app.get('/api/events', async (req, res) => {
  try {
    const result = await query(`
      SELECT e.*, v.name as venue_name, v.city as venue_city 
      FROM events e
      LEFT JOIN venues v ON e.venue_id = v.id
      WHERE e.date >= NOW()
      ORDER BY e.date ASC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});