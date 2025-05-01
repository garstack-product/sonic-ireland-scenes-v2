// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000/api' 
    : '/api', // Production URL
  timeout: 10000,
});

export default api;