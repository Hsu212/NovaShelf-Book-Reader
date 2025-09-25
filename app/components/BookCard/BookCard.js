'use client'; 

import Link from 'next/link';
import Image from 'next/image';
import styles from './BookCard.module.css';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'; // Only bookmark icons now
import { useFavorites } from '../../context/FavoritesContext';

export default function BookCard({ book }) {
  // State for "My Library" (Bookmark icon)
  const { addBook, removeBook, isFavorite } = useFavorites();
  const isSavedInLibrary = isFavorite(book.id);

  const handleToggleLibrary = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (isSavedInLibrary) {
      removeBook(book.id);
    } else {
      addBook(book);
    }
  };
  
  // REMOVED: handleToggleFavorite and useTrueFavorites import

  return (
    <Link href={`/book/${book.id}`} className={styles.card}>
      {/* Only the library button remains here */}
      <button onClick={handleToggleLibrary} className={styles.libraryButton}>
        {isSavedInLibrary ? <FaBookmark color="#9f5afd" /> : <FaRegBookmark />}
      </button>

      <div className={styles.imageContainer}>
        <Image
          src={book.image}
          alt={`Cover of ${book.title}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.authors}>{book.authors}</p>
      </div>
    </Link>
  );
}