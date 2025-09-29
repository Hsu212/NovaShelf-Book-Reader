'use client';

import Link from 'next/link';
import styles from './SideDrawer.module.css';
import UserProfile from '../UserProfile/UserProfile';
import { useAuth } from '@/app/context/AuthContext';
import { useEffect } from 'react';
import { 
  FaBook, 
  FaCog, 
  FaHeart, 
  FaHome, 
  FaTimes, 
  FaSignInAlt, 
  FaUserEdit // <-- Import the new icon
} from 'react-icons/fa';

export default function SideDrawer({ isOpen, onClose }) {
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes size={24} />
        </button>

        {user ? (
          <>
            <UserProfile />
            <button onClick={() => { signOut(); onClose(); }} className={styles.signOutButton}>
              Sign Out
            </button>
          </>
        ) : (
          <div className={styles.signInPrompt}>
            <Link href="/auth" className={styles.signInLink} onClick={onClose}>
              <FaSignInAlt />
              <span>Sign In / Register</span>
            </Link>
          </div>
        )}

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink} onClick={onClose}>
            <FaHome /> Home
          </Link>
          <Link href="/library" className={styles.navLink} onClick={onClose}>
            <FaBook /> My Library
          </Link>
          <Link href="/favorites" className={styles.navLink} onClick={onClose}>
            <FaHeart /> Favorites
          </Link>
          <Link href="/settings" className={styles.navLink} onClick={onClose}>
            <FaCog /> Settings
          </Link>
          
          {user && (
            <Link href="/profile" className={styles.navLink} onClick={onClose}>
              <FaUserEdit /> Edit Profile
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}
