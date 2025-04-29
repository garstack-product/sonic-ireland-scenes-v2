import { Link } from 'react-router-dom';
import './Header.css';
// components/Header/Header.jsx
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">Sonic Ireland Scenes</Link>
        
        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation - hidden on mobile unless open */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><a href="#upcoming">Upcoming</a></li>
            <li><a href="#map">Map</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}