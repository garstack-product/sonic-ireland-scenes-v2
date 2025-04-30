// src/components/Layout.jsx
import React from 'react';
import '../pages/PageLayout.css';

const Layout = ({ children }) => {
  return (
    <div className="page-container">
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;