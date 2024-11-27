import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../Features/books/BookReducer'; 

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;