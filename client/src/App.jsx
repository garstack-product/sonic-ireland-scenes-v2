// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Concerts from './pages/listings/Concerts';
import News from './pages/News/News';
import About from './pages/About/About';

// Listings imports
import Festivals from './pages/listings/Festivals';
import JustAnnounced from './pages/listings/JustAnnounced';
import Map from './pages/listings/Map';

// Reviews imports
import ReviewConcerts from './pages/reviews/Concerts';
import ReviewFestivals from './pages/reviews/Festivals';

// Import all listing and review pages
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          {/* Listings Routes */}
          <Route path="/listings/concerts" element={<Concerts />} />
          <Route path="/listings/festivals" element={<Festivals />} />
          <Route path="/listings/just-announced" element={<JustAnnounced />} />
          <Route path="/listings/map" element={<Map />} />
          {/* Reviews Routes */}
          <Route path="/reviews/concerts" element={<ReviewConcerts />} />
          <Route path="/reviews/festivals" element={<ReviewFestivals />} />
        </Routes>
      </div>
    </Router>
    </BrowserRouter>
  );
}

export default App;