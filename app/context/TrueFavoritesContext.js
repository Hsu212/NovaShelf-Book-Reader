'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const TrueFavoritesContext = createContext();

// Create a custom hook for easy access
export const useTrueFavorites = () => {
  return useContext(TrueFavoritesContext);
};

// Create the provider component
export const TrueFavoritesProvider = ({ children }) => {
  const [trueFavoriteBooks, setTrueFavoriteBooks] = useState([]);

  // Load saved favorites from localStorage on initial render
  useEffect(() => {
    try {
      // Use a different localStorage key to keep it separate from the library
      const saved = localStorage.getItem('trueFavoriteBooks');
      if (saved) {
        setTrueFavoriteBooks(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Failed to parse true favorites from localStorage", error);
    }
  }, []);

  // Function to add a book to favorites
  const addFavorite = (book) => {
    const updatedList = [...trueFavoriteBooks, book];
    setTrueFavoriteBooks(updatedList);
    localStorage.setItem('trueFavoriteBooks', JSON.stringify(updatedList));
  };

  // Function to remove a book from favorites
  const removeFavorite = (bookId) => {
    const updatedList = trueFavoriteBooks.filter(book => book.id !== bookId);
    setTrueFavoriteBooks(updatedList);
    localStorage.setItem('trueFavoriteBooks', JSON.stringify(updatedList));
  };
  
  // Function to check if a book is a favorite
  const isFavorite = (bookId) => {
    return trueFavoriteBooks.some(book => book.id === bookId);
  };
  // NEW: Function to clear favorites
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