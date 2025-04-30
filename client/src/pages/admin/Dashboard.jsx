// src/pages/admin/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Dashboard = () => {
  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-grid">
        <div className="admin-card">
          <h2>Content Management</h2>
          <ul className="admin-links">
            <li><Link to="/admin/listings">Manage Listings</Link></li>
            <li><Link to="/admin/reviews">Manage Reviews</Link></li>
            <li><Link to="/admin/news">Manage News</Link></li>
          </ul>
        </div>

        <div className="admin-card">
          <h2>User Management</h2>
          <ul className="admin-links">
            <li><Link to="/admin/users">Manage Users</Link></li>
            <li><Link to="/admin/roles">Manage Roles</Link></li>
          </ul>
        </div>

        <div className="admin-card">
          <h2>Analytics</h2>
          <ul className="admin-links">
            <li><Link to="/admin/statistics">View Statistics</Link></li>
            <li><Link to="/admin/visitors">Visitor Analytics</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;