// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdown, setDropdown] = useState({
    listings: false,
    reviews: false
  });
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const toggleDropdown = (menu) => {
    setDropdown(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Sonic Ireland Scenes
        </Link>

        {/* Desktop Menu */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMenu}>
              Home
            </Link>
          </li>

          {/* Listings Dropdown */}
          <li 
            className="nav-item"
            onMouseEnter={!isMobile ? () => toggleDropdown('listings') : undefined}
            onMouseLeave={!isMobile ? () => toggleDropdown('listings') : undefined}
          >
            <div 
              className="nav-links"
              onClick={() => isMobile && toggleDropdown('listings')}
            >
              Listings {dropdown.listings ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {dropdown.listings && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link to="/listings/concerts" className="dropdown-link" onClick={closeMenu}>
                    Concerts
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/listings/festivals" className="dropdown-link" onClick={closeMenu}>
                    Festivals
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/listings/just-announced" className="dropdown-link" onClick={closeMenu}>
                    Just Announced
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/listings/map" className="dropdown-link" onClick={closeMenu}>
                    Map
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Reviews Dropdown */}
          <li 
            className="nav-item"
            onMouseEnter={!isMobile ? () => toggleDropdown('reviews') : undefined}
            onMouseLeave={!isMobile ? () => toggleDropdown('reviews') : undefined}
          >
            <div 
              className="nav-links"
              onClick={() => isMobile && toggleDropdown('reviews')}
            >
              Reviews {dropdown.reviews ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {dropdown.reviews && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link to="/reviews/concerts" className="dropdown-link" onClick={closeMenu}>
                    Concerts
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/reviews/festivals" className="dropdown-link" onClick={closeMenu}>
                    Festivals
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Other Menu Items */}
          <li className="nav-item">
            <Link to="/news" className="nav-links" onClick={closeMenu}>
              News
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={closeMenu}>
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;