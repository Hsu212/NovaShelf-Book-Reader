import BookDetailsClient from './BookDetailsClient';

async function getBookDetails(id) {
  const res = await fetch(`https://www.dbooks.org/api/book/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch book details');
  }
  return res.json();
}

export default async function BookDetailsPage({ params }) {
  const book = await getBookDetails(params.id);
  
  return <BookDetailsClient book={book} />;
}
