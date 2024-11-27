import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, updateBook } from '../Features/books/Bookactions'; 
import './Bookform.css';

const BookForm = ({ currentBook, setEditing }) => {
  const [book, setBook] = useState(currentBook || { title: '', author: '', id: Date.now(), image: null });
  const [imagePreview, setImagePreview] = useState(currentBook?.image || null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentBook) {
      setBook(currentBook);
      setImagePreview(currentBook.image || null);
    }
  }, [currentBook]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBook({ ...book, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentBook) {
      dispatch(updateBook(book));
      setEditing(false);
    } else {
      dispatch(addBook(book));
    }
    setBook({ title: '', author: '', id: Date.now(), image: null });
    setImagePreview(null);
  };

  const handleCancel = () => {
    setEditing(false);
    setBook({ title: '', author: '', id: Date.now(), image: null });
    setImagePreview(null);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{currentBook ? 'Edit Book' : 'Add Book'}</h2>
      
      <input
        type="text"
        className='form-control'
        value={book.title}
        onChange={(e) => setBook({ ...book, title: e.target.value })}
        placeholder="Book Title"
        required
      />

      <input
        type="text"
        className='form-control'
        value={book.author}
        onChange={(e) => setBook({ ...book, author: e.target.value })}
        placeholder="Author Name"
        required
      />

      <input
        type="file"
        className='form-control'
        onChange={handleImageUpload}
        accept="image/*"
      />

      {imagePreview && (
        <div className="image-preview">
          <img src={imagePreview} alt="Book Cover Preview" />
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {currentBook ? 'Update Book' : 'Add Book'}
        </button>
        {currentBook && (
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default BookForm;