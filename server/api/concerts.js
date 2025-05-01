// server/api/concerts.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        id, 
        title, 
        date, 
        venue, 
        price, 
        image_url as "imageUrl",
        artist,
        description
      FROM concerts
      ORDER BY date ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;