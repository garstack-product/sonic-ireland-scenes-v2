// server/api/concerts.js
import { Router } from 'express';
import pool from '../db.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT 
        id, title, date, venue, price, 
        image_url as "imageurl",
        artist, description
      FROM concerts
      ORDER BY date ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch concerts' });
  }
});

export default router;