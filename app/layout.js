import './globals.css';
import MainLayout from './MainLayout'; 

export const metadata = {
  title: 'NovaShelf | Find Your Next Read',
  description: 'A modern web app for discovering and reading books.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainLayout> 
          <main className="container">
            {children}
          </main>
        </MainLayout>
      </body>
    </html>
  );
}
