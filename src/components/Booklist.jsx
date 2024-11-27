import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook } from '../Features/books/Bookactions';
import './Booklist.css';

const BookList = ({ setEditing, setCurrentBook }) => {
  const books = useSelector((state) => state.books.books);
  const dispatch = useDispatch();

  const handleEdit = (book) => {
    setCurrentBook(book);
    setEditing(true);
  };

  return (
    <div className="book-list">
      <h2>Book List</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <div className="book-details">
              {book.image && (
                <img src={book.image} alt={book.title} className="book-image" />
              )}
              <div>
                <strong>{book.title}</strong> by {book.author}
              </div>
            </div>
            <div className="book-actions">
              <button className="edit-btn" onClick={() => handleEdit(book)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => dispatch(deleteBook(book.id))}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;