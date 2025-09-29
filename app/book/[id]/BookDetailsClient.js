'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { useFavorites } from '../../context/FavoritesContext';
import { useTrueFavorites } from '../../context/TrueFavoritesContext';
import { FaBookmark, FaRegBookmark, FaHeart, FaRegHeart } from 'react-icons/fa';

export default function BookDetailsClient({ book }) {
  const { addBook, removeBook, isFavorite } = useFavorites();
  const isSavedInLibrary = isFavorite(book.id);

  const handleToggleLibrary = () => {
    if (isSavedInLibrary) {
      removeBook(book.id);
    } else {
      addBook(book);
    }
  };

  const { addFavorite, removeFavorite, isFavorite: isTrulyFavorite } = useTrueFavorites();
  const isSavedAsFavorite = isTrulyFavorite(book.id);

  const handleToggleFavorite = () => {
    if (isSavedAsFavorite) {
      removeFavorite(book.id);
    } else {
      addFavorite(book); 
    }
  };

  if (book.status !== 'ok') {
    return <div>Book not found.</div>;
  }

  return (
    <div>
      <Link href="/" className={styles.backLink}>&larr; Back to Search</Link>
      <div className={styles.detailsContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={book.image}
            alt={`Cover of ${book.title}`}
            width={300}
            height={450}
            className={styles.bookImage}
          />
        </div>
        <div className={styles.contentWrapper}>
          <h1 className={styles.title}>{book.title}</h1>
          {book.subtitle && <h2 className={styles.subtitle}>{book.subtitle}</h2>}
          <p className={styles.authors}>By: {book.authors}</p>
          <p className={styles.description}>{book.description}</p>
          <div className={styles.metaGrid}>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Published:</strong> {book.year}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
          </div>
          <div className={styles.actions}>

          
          <a href={book.download} target="_blank" rel="noopener noreferrer" className={styles.downloadButton}>
            Download PDF
          </a>
            <button onClick={handleToggleLibrary} className={styles.libraryButton}>
              {isSavedInLibrary ? <FaBookmark /> : <FaRegBookmark />}
              {isSavedInLibrary ? 'Remove from Library' : 'Add to Library'}
            </button>
            <button onClick={handleToggleFavorite} className={styles.favoriteButtonDetails}>
              {isSavedAsFavorite ? <FaHeart /> : <FaRegHeart />}
              {isSavedAsFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
