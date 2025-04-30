// src/components/Navbar.js
import './Navbar.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp, FaUserCog } from 'react-icons/fa';


const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [click, setClick] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    listings: false,
    reviews: false,
    admin: false
  });
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (dropdown) => {
    setDropdowns(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}), // Close all others
      [dropdown]: !prev[dropdown]
    }));
  };

  const closeMobileMenu = () => setClick(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
    closeMobileMenu();
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setClick(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {isMobile && (
          <div className="menu-icon" onClick={() => setClick(!click)}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        )}

        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Sonic Ireland Scenes
        </Link>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>

          {/* Listings Dropdown */}
          <li className={`nav-item ${dropdowns.listings ? 'active' : ''}`}
              onMouseEnter={!isMobile ? () => toggleDropdown('listings') : undefined}
              onMouseLeave={!isMobile ? () => setDropdowns({...dropdowns, listings: false}) : undefined}>
            <div className="nav-links" onClick={() => isMobile && toggleDropdown('listings')}>
              Listings {isMobile ? (dropdowns.listings ? <FaChevronUp /> : <FaChevronDown />) : <FaChevronDown />}
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

          {/* Reviews Dropdown */}
          <li className="nav-item"
            onMouseEnter={!isMobile ? () => toggleDropdown('reviews') : undefined}
            onMouseLeave={!isMobile ? () => toggleDropdown('reviews') : undefined}>
            <div className="nav-links" onClick={() => isMobile && toggleDropdown('reviews')}>
              Reviews {isMobile ? (dropdowns.reviews ? <FaChevronUp /> : <FaChevronDown />) : <FaChevronDown />}
            </div>
            {dropdowns.reviews && (
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <Link to="/reviews/concerts" className="dropdown-link" onClick={closeMobileMenu}>
                    Concerts
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/reviews/festivals" className="dropdown-link" onClick={closeMobileMenu}>
                    Festivals
                  </Link>
                </li>
              </ul>
            )}
          </li>

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

          {/* Admin Dropdown */}
          <li className="nav-item"
            onMouseEnter={!isMobile ? () => toggleDropdown('admin') : undefined}
            onMouseLeave={!isMobile ? () => toggleDropdown('admin') : undefined}>
            <div className="nav-links" onClick={() => isMobile && toggleDropdown('admin')}>
              <FaUserCog /> {isMobile ? (dropdowns.admin ? <FaChevronUp /> : <FaChevronDown />) : <FaChevronDown />}
            </div>
            {dropdowns.admin && (
              <ul className="dropdown-menu">
                {isAuthenticated ? (
                  <>
                    <li className="dropdown-item">
                      <Link to="/admin/dashboard" className="dropdown-link" onClick={closeMobileMenu}>
                        Dashboard
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <button className="dropdown-link logout-btn" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li className="dropdown-item">
                    <Link to="/admin/login" className="dropdown-link" onClick={closeMobileMenu}>
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;