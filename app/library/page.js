'use client'; 

import { useFavorites } from '../context/FavoritesContext';
import BookList from '../components/BookList/BookList';
export default function LibraryPage() {
  const { favoriteBooks } = useFavorites();

  return (
    <div>
      <h1 className="main-title">My Library</h1>
      {favoriteBooks.length > 0 ? (
        <BookList books={favoriteBooks} />
      ) : (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>
          Your library is empty. Find a book and save it!
        </p>
      )}
    </div>
  );
}
