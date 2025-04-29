// src/context/FavoritesContext.jsx
import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('favoriteEvents');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
    localStorage.setItem('favoriteEvents', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (eventId) => {
    if (!favorites.includes(eventId)) {
      setFavorites([...favorites, eventId]);
    }
  };

  const removeFavorite = (eventId) => {
    setFavorites(favorites.filter(id => id !== eventId));
  };

  const isFavorite = (eventId) => favorites.includes(eventId);

  return (
    <FavoritesContext.Provider 
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}