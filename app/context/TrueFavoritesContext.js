'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const TrueFavoritesContext = createContext();

export const useTrueFavorites = () => {
  return useContext(TrueFavoritesContext);
};

export const TrueFavoritesProvider = ({ children }) => {
  const [trueFavoriteBooks, setTrueFavoriteBooks] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('trueFavoriteBooks');
      if (saved) {
        setTrueFavoriteBooks(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to parse true favorites from localStorage", error);
    }
  }, []);

  const addFavorite = (book) => {
    const updatedList = [...trueFavoriteBooks, book];
    setTrueFavoriteBooks(updatedList);
    localStorage.setItem('trueFavoriteBooks', JSON.stringify(updatedList));
  };

  const removeFavorite = (bookId) => {
    const updatedList = trueFavoriteBooks.filter(book => book.id !== bookId);
    setTrueFavoriteBooks(updatedList);
    localStorage.setItem('trueFavoriteBooks', JSON.stringify(updatedList));
  };
  
  const isFavorite = (bookId) => {
    return trueFavoriteBooks.some(book => book.id === bookId);
  };
  const clearFavorites = () => {
    setTrueFavoriteBooks([]);
    localStorage.removeItem('trueFavoriteBooks');
  };
  const value = {
    trueFavoriteBooks,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
  };

  return (
    <TrueFavoritesContext.Provider value={value}>
      {children}
    </TrueFavoritesContext.Provider>
  );
};
