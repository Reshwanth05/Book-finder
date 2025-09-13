// BookService.js
export const searchBooks = async (query) => {
  if (!query.trim()) return [];
  const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.docs.slice(0, 20);
};

// Predefined popular books for carousel
export const getPopularBooks = async () => {
  const popularTitles = [
    "Pride and Prejudice",
    "Harry Potter",
    "The Hobbit",
    "1984",
    "To Kill a Mockingbird",
    "The Great Gatsby",
    "Moby Dick",
    "The Catcher in the Rye",
    "Jane Eyre",
    "The Lord of the Rings"
  ];
  const results = [];
  for (let title of popularTitles) {
    const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`);
    const data = await res.json();
    if (data.docs.length > 0) results.push(data.docs[0]);
  }
  return results;
};
