'use client'; // This component needs to handle user input

import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('query');
    onSearch(query);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="query"
        placeholder="Search for books by title..."
        className={styles.searchInput}
        required
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
}