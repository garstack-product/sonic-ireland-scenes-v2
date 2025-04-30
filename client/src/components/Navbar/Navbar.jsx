// src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    listings: false,
    reviews: false
  });

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const toggleDropdown = (dropdown) => {
    setDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>

        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Sonic Ireland Scenes
        </Link>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>

          <li className="nav-item"
            onClick={() => toggleDropdown('listings')}>
            <div className="nav-links">
              Listings {dropdowns.listings ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {dropdowns.listings && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link to="/listings/concerts" className="dropdown-link" onClick={closeMobileMenu}>
                    Concerts
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/listings/festivals" className="dropdown-link" onClick={closeMobileMenu}>
                    Festivals
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/listings/just-announced" className="dropdown-link" onClick={closeMobileMenu}>
                    Just Announced
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/listings/map" className="dropdown-link" onClick={closeMobileMenu}>
                    Map
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Similar structure for Reviews dropdown */}

          <li className="nav-item">
            <Link to="/news" className="nav-links" onClick={closeMobileMenu}>
              News
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;