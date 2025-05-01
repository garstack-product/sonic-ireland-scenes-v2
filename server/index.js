// server/index.js
import express from 'express';
import cors from 'cors';
import concertsRouter from './api/concerts.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/concerts', concertsRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Error Handling
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});