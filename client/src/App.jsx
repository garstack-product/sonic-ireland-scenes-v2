// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import About from './pages/About.jsx';
import News from './pages/News.jsx';
import ListingsConcerts from './pages/listings/Concerts.jsx';
import ListingsFestivals from './pages/listings/Festivals.jsx';
import ListingsAnnounced from './pages/listings/JustAnnounced.jsx';
import ListingsMap from './pages/listings/Map.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/listings/concerts" element={<ListingsConcerts />} />
            <Route path="/listings/festivals" element={<ListingsFestivals />} />
            <Route path="/listings/just-announced" element={<ListingsAnnounced />} />
            <Route path="/listings/map" element={<ListingsMap />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;