import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './Features/Store';
import BookList from './components/Booklist';
import BookForm from './components/Bookform';
import './App.css'; 

const App = () => {
  const [editing, setEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  return (
    <Provider store={store}>
      <div className="app">
        <h1>Book Management System</h1>
        <BookForm currentBook={currentBook} setEditing={setEditing} />
        <BookList setCurrentBook={setCurrentBook} setEditing={setEditing} />
      </div>
    </Provider>
  );
};

export default App;