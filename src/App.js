// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <h1>Book Reading App</h1>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
    </div>
  );
};

export default App;
