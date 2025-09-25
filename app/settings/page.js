'use client';

import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { useTrueFavorites } from '../context/TrueFavoritesContext';
import styles from './page.module.css';
import { FaMoon, FaSun, FaTrash } from 'react-icons/fa';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { clearLibrary } = useFavorites();
  const { clearFavorites } = useTrueFavorites();

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all your saved books? This action cannot be undone.')) {
      clearLibrary();
      clearFavorites();
      alert('Your Library and Favorites have been cleared.');
    }
  };

  return (
    <div>
      <h1 className="main-title">Settings</h1>
      <div className={styles.settingsContainer}>
        {/* Appearance Settings */}
        <div className={styles.settingCard}>
          <h2 className={styles.cardTitle}>Appearance</h2>
          <div className={styles.settingItem}>
            <span>Theme</span>
            <div className={styles.themeToggle}>
              <FaSun className={theme === 'light' ? styles.activeIcon : ''} />
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  onChange={toggleTheme}
                  checked={theme === 'dark'}
                />
                <span className={styles.slider}></span>
              </label>
              <FaMoon className={theme === 'dark' ? styles.activeIcon : ''} />
            </div>
          </div>
        </div>

        {/* Data Management Settings */}
        <div className={styles.settingCard}>
          <h2 className={styles.cardTitle}>Data Management</h2>
          <div className={styles.settingItem}>
            <span>Clear Saved Books</span>
            <button className={styles.dangerButton} onClick={handleClearData}>
              <FaTrash /> Clear All Data
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className={styles.settingCard}>
          <h2 className={styles.cardTitle}>About</h2>
          <div className={styles.settingItem}>
            <span>App Version</span>
            <span>1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}