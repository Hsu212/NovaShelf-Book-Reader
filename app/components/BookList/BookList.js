import BookCard from '../BookCard/BookCard';
import styles from './BookList.module.css';

export default function BookList({ books }) {
  if (!books || books.length === 0) {
    return <p className={styles.noBooksMessage}>No books found. Try a different search!</p>;
  }

  return (
    <div className={styles.grid}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}