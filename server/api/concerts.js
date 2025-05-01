// server/api/concerts.js
import { pool } from '../db.js';  // Changed from default import to named import
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM events');
    res.json(rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

export default router;