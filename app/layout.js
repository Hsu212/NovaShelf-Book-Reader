import './globals.css';
import MainLayout from './MainLayout'; // Import the new layout wrapper

export const metadata = {
  title: 'BookVerse | Find Your Next Read',
  description: 'A modern web app for discovering and reading books.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout> {/* Wrap the content with MainLayout */}
          <main className="container">
            {children}
          </main>
        </MainLayout>
      </body>
    </html>
  );
}