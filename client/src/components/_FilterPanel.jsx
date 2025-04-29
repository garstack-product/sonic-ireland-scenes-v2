
import React from 'react';
import { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Button, Stack } from '@mui/material';
import { getEventsFromDB } from '../services/eventsService.jsx';

export const FilterPanel = ({ onFilter, cities, genres }) => {
  const [filters, setFilters] = useState({
    city: '',
    genre: '',
    fromDate: '',
    toDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      city: '',
      genre: '',
      fromDate: '',
      toDate: ''
    });
    onFilter({});
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, bgcolor: 'background.paper' }}>
      <Stack spacing={2}>
        <TextField
          select
          label="City"
          name="city"
          value={filters.city}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="">All Cities</MenuItem>
          {cities.map(city => (
            <MenuItem key={city} value={city}>{city}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Genre"
          name="genre"
          value={filters.genre}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="">All Genres</MenuItem>
          {genres.map(genre => (
            <MenuItem key={genre} value={genre}>{genre}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="From Date"
          type="date"
          name="fromDate"
          value={filters.fromDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <TextField
          label="To Date"
          type="date"
          name="toDate"
          value={filters.toDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" fullWidth>
            Apply Filters
          </Button>
          <Button variant="outlined" onClick={handleReset} fullWidth>
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};