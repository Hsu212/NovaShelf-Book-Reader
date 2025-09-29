'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibrary = async () => {
      if (!user) {
        setFavoriteBooks([]);
        setLoading(false);
        return;
      }
      
      setLoading(true);
      const { data, error } = await supabase
        .from('user_books')
        .select('book_id, book_data')
        .eq('user_id', user.id)
        .eq('list_type', 'library');

      if (error) {
        console.error('Error fetching library:', error);
      } else {
        setFavoriteBooks(data.map(item => item.book_data));
      }
      setLoading(false);
    };

    fetchLibrary();
  }, [user]); 

  const addBook = async (book) => {
    if (!user) return;
    
    const { error } = await supabase.from('user_books').insert({
      user_id: user.id,
      book_id: book.id,
      list_type: 'library',
      book_data: book
    });

    if (error) {
      console.error('Error adding book to library:', error);
    } else {
      setFavoriteBooks(prev => [...prev, book]);
    }
  };

  const removeBook = async (bookId) => {
    if (!user) return;

    const { error } = await supabase
      .from('user_books')
      .delete()
      .eq('user_id', user.id)
      .eq('book_id', bookId)
      .eq('list_type', 'library');
      
    if (error) {
      console.error('Error removing book from library:', error);
    } else {
      setFavoriteBooks(prev => prev.filter(b => b.id !== bookId));
    }
  };

  const isFavorite = (bookId) => {
    return favoriteBooks.some(book => book.id === bookId);
  };

  
  const value = { favoriteBooks, addBook, removeBook, isFavorite, loading };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
