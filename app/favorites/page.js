'use client'; // This page needs client-side data

import { useTrueFavorites } from '../context/TrueFavoritesContext';
import BookList from '../components/BookList/BookList';

export default function FavoritesPage() {
  const { trueFavoriteBooks } = useTrueFavorites();

  return (
    <div>
      <h1 className="main-title">My Favorites ❤️</h1>
      {trueFavoriteBooks.length > 0 ? (
        <BookList books={trueFavoriteBooks} />
      ) : (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>
          You haven't favorited any books yet. Click the heart icon on a book to add it!
        </p>
      )}
    </div>
  );
}