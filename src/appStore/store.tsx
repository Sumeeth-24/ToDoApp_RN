import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../slices/toDoSlice';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});
