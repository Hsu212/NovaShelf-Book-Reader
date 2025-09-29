'use client'; 

import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import BookList from './components/BookList/BookList';

async function fetchBooks(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.books || [];
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return []; 
  }
}

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRecentBooks() {
      const recentBooks = await fetchBooks('https://www.dbooks.org/api/recent');
      setBooks(recentBooks);
      setIsLoading(false);
    }
    loadRecentBooks();
  }, []);

  const handleSearch = async (query) => {
    if (!query) return;
    setIsLoading(true);
    const searchResults = await fetchBooks(`https://www.dbooks.org/api/search/${query}`);
    setBooks(searchResults);
    setIsLoading(false);
  };

  return (
    <>
      <h1 className="main-title">NovaShelf</h1>
      <SearchBar onSearch={handleSearch} />
      {isLoading ? <p>Loading books...</p> : <BookList books={books} />}
    </>
  );
}
