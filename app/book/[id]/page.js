import BookDetailsClient from './BookDetailsClient';

// This function can still be async and run on the server
async function getBookDetails(id) {
  const res = await fetch(`https://www.dbooks.org/api/book/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch book details');
  }
  return res.json();
}

// This is the Server Component page
export default async function BookDetailsPage({ params }) {
  const book = await getBookDetails(params.id);
  
  // Pass the server-fetched data as a prop to the client component
  return <BookDetailsClient book={book} />;
}