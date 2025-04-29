// src/context/FavoritesContext.jsx
import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('favoriteEvents');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteEvents', JSON.stringify(favorites));
  }, [favorites]);

  const value = {
    favorites,
    isFavorite: (id) => favorites.includes(id),
    addFavorite: (id) => setFavorites(prev => [...prev, id]),
    removeFavorite: (id) => setFavorites(prev => prev.filter(favId => favId !== id))
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}