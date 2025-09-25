'use client';

import { useState } from 'react';
import SideDrawer from './components/SideDrawer/SideDrawer';
import MenuButton from './components/MenuButton/MenuButton';
import { FavoritesProvider } from './context/FavoritesContext';
import { TrueFavoritesProvider } from './context/TrueFavoritesContext';
import { ThemeProvider } from './context/ThemeContext'; // Import the new provider
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

export default function MainLayout({ children }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

   return (
    <AuthProvider> {/* Wrap everything */}
      <ThemeProvider>
        <TrueFavoritesProvider>
          <FavoritesProvider>
            <MenuButton onClick={openDrawer} />
            <SideDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
            {children}
          </FavoritesProvider>
        </TrueFavoritesProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}