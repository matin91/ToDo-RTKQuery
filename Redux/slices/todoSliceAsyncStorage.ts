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

export const todoSliceAsyncStorage = createSlice({
  name: 'todoAsyncStorage',
  initialState,
  reducers: {
    fetch: (state, action) => {
      state.todoList = action.payload;
    },
    add: (state, action) => {
      state.todoList.push(action.payload);
    },
    remove: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todoList = action.payload;
        state.status = 'success';
      }),
});

export const { add, remove, fetch } = todoSliceAsyncStorage.actions;

export default todoSliceAsyncStorage.reducer;
