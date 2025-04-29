// components/FilterBar/FilterBar.jsx
import { useState } from 'react';
import './FilterBar.css';


const [searchQuery, setSearchQuery] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();
  onFilter({ city, genre, dateRange, searchQuery });
};


export default function FilterBar({ onFilter, cities, genres }) {
  const [city, setCity] = useState('');
  const [genre, setGenre] = useState('');
  const [dateRange, setDateRange] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ city, genre, dateRange });
  };

  const handleReset = () => {
    setCity('');
    setGenre('');
    setDateRange('');
    onFilter({});
  };

  return (
    <form onSubmit={handleSubmit} className="filter-bar">
      <div className="filter-group">
        <label htmlFor="city">City</label>
        <select 
          id="city" 
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="genre">Genre</label>
        <select
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="search">Search</label>
        <input
            id="search"
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        </div>

      <div className="filter-group">
        <label htmlFor="date">Date</label>
        <select
          id="date"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="">All Dates</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="future">Future Events</option>
        </select>
      </div>

      <div className="filter-actions">
        <button type="submit" className="btn-filter">Filter</button>
        <button type="button" onClick={handleReset} className="btn-reset">Reset</button>
      </div>
    </form>
  );
}