'use client';

import styles from './MenuButton.module.css';
import { FiMenu } from 'react-icons/fi'; // Icon from react-icons

export default function MenuButton({ onClick }) {
  return (
    <button className={styles.menuButton} onClick={onClick}>
      <FiMenu size={28} />
    </button>
  );
}