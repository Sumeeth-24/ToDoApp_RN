import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define an initial state
const initialState = {
  filterStatus: 'all',
  todoList: [],
};

// Create a slice
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    addTodo: (state, action) => {
      state.todoList = [action.payload, ...state.todoList];
    },
    updateTodo: (state, action) => {
      const updatedTodoList = state.todoList.map(todo => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            ...action.payload,
          };
        }
        return todo;
      });
      state.todoList = updatedTodoList;
    },
    deleteTodo: (state, action) => {
      state.todoList = state.todoList.filter(
        todo => todo?.id !== action.payload,
      );
    },
  },
});

// Export the reducer and actions
export const loadTodoList = () => async dispatch => {
  try {
    const todoList = await AsyncStorage.getItem('todoList');
    if (todoList) {
      dispatch(setTodoList(JSON.parse(todoList)));
    }
  } catch (error) {
    console.error('Error accessing AsyncStorage:', error);
  }
};

export const {addTodo, setTodoList, updateTodo, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;
