// src/components/BookDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [bookContent, setBookContent] = useState(""); // For the full book content
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        setBook({
          title: data.volumeInfo.title,
          subtitle: data.volumeInfo.subtitle,
          description: data.volumeInfo.description,
          image: data.volumeInfo.imageLinks?.thumbnail,
          year: data.volumeInfo.publishedDate,
          category: data.volumeInfo.categories?.join(", "),
        });

        // Set a placeholder for the content since the API doesn't provide full text
        setBookContent(
          "This API does not provide full text access for copyright reasons."
        );
      } catch (error) {
        console.error("Error fetching book details:", error.message);
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>No book found.</div>;

  return (
    <div className="book-detail">
      <div className="container">
        <h2>{book.title}</h2>
        <h3>by {book.subtitle || "Unknown Author"}</h3>
        {book.image && (
          <img src={book.image} alt={book.title} className="book-cover" />
        )}

        <h4>Description:</h4>
        <p>{book.description || "No description available."}</p>

        <h4>Content:</h4>
        <div className="book-content">
          {bookContent} {/* Placeholder for the full content */}
        </div>

        <h4>More Information:</h4>
        <p>
          <strong>Published Date:</strong> {book.year || "N/A"}
        </p>
        <p>
          <strong>Categories:</strong> {book.category || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default BookDetail;
