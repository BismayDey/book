// src/components/GenrePage.js
import React from "react";
import { useParams } from "react-router-dom";

const GenrePage = ({ books }) => {
  const { genre } = useParams();
  const filteredBooks = books.filter((book) =>
    book.volumeInfo.categories?.includes(genre)
  );

  return (
    <div>
      <h1>{genre} Books</h1>
      <div className="book-list">
        {filteredBooks.map((book) => (
          <div key={book.id} className="book-item">
            <img
              src={
                book.volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/150"
              }
              alt={book.volumeInfo.title}
            />
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenrePage;
