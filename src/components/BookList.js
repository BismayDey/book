// src/components/BookList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=20"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setBooks(data.items);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <Link to={`/books/${book.id}`}>
            <img
              src={
                book.volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/150"
              }
              alt={book.volumeInfo.title}
            />
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(", ")}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookList;
