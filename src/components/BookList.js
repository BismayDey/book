// src/components/BookList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("title");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=40"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setBooks(data.items);

        // Extract genres
        const genreList = [
          ...new Set(
            data.items.flatMap((book) => book.volumeInfo.categories || [])
          ),
        ];
        setGenres(genreList);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const filteredBooks = books
    .filter(
      (book) =>
        book.volumeInfo.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (selectedGenre
          ? book.volumeInfo.categories?.includes(selectedGenre)
          : true)
    )
    .sort((a, b) => {
      if (sortOption === "title") {
        return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
      } else if (sortOption === "author") {
        return (a.volumeInfo.authors || [])[0]?.localeCompare(
          (b.volumeInfo.authors || [])[0]
        );
      } else {
        return (
          new Date(a.volumeInfo.publishedDate) -
          new Date(b.volumeInfo.publishedDate)
        );
      }
    });

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="book-list">
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px", padding: "10px", width: "300px" }}
      />
      <select
        value={sortOption}
        onChange={handleSort}
        style={{ marginBottom: "20px", padding: "10px" }}
      >
        <option value="title">Sort by Title</option>
        <option value="author">Sort by Author</option>
        <option value="date">Sort by Publication Date</option>
      </select>
      <select
        value={selectedGenre}
        onChange={handleGenreChange}
        style={{ marginBottom: "20px", padding: "10px" }}
      >
        <option value="">All Genres</option>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <div className="book-list">
        {filteredBooks.map((book) => (
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
    </div>
  );
};

export default BookList;
