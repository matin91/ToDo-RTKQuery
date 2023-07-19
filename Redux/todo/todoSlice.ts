/* eslint-disable no-param-reassign */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TodoObject } from '../../types/TodoObject';

interface TodoState {
  todoList: TodoObject[];
  status?: 'loading' | 'success';
}

const initialState: TodoState = {
  todoList: [],
};

export const fetchTodos = createAsyncThunk('todos/getTodos', async () => {
  return AsyncStorage.getItem('todoList').then((res) => res && JSON.parse(res));
});

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    fetch: (state, action) => {
      state.todoList = action.payload;
    },
    add: (state, action) => {
      console.log('asdf', state);
      state.todoList = [...state.todoList, action.payload];
    },
    remove: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload.id
      );
    },
  },
  extraReducers: {
    [fetchTodos.pending as any]: (state: TodoState) => {
      state.status = 'loading';
    },
    [fetchTodos.fulfilled as any]: (
      state: TodoState,
      action: {
        payload: any;
        type: string;
      }
    ) => {
      state.status = 'success';
      state.todoList = action.payload;
    },
  },
});

export const { add, remove, fetch } = todoSlice.actions;

export default todoSlice.reducer;
