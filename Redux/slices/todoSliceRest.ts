/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodoState = {
  list: Todo[];
  error: null | string;
  pending: boolean;
};

const initialState: TodoState = {
  list: [],
  error: null,
  pending: false,
};

export const fetchTodo = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>('Todo/fetchTodo', async (_, { rejectWithValue }) => {
  const response = await axios('https://jsonplaceholder.typicode.com/todos');

  if (!response) {
    return rejectWithValue('Error fetch slices');
  }
  return await response.data;
});

export const addTodo = createAsyncThunk<Todo, string, { rejectValue: string }>(
  'Todo/addTodo',
  async (title, { rejectWithValue }) => {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      {
        id: Date.now(),
        title,
        completed: false,
      }
    );

    if (!response) {
      return rejectWithValue('Error add slices');
    }

    return (await response.data) as Todo;
  }
);

export const toggleTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string; state: { todo: TodoState } }
>('Todo/toggleTodo', async (id, { getState, rejectWithValue }) => {
  const toggle = getState().todo.list.find((e) => e.id === id);

  if (toggle) {
    const response = await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );

    if (!response) {
      return rejectWithValue('Error toggle slices');
    }

    return (await response.data) as Todo;
  }

  return rejectWithValue('ERROR error Error');
});

export const removeTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('Todo/removeTodo', async (id, { rejectWithValue }) => {
  const response = await axios.delete(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  if (!response) {
    return rejectWithValue('Error delete slices');
  }
  return id;
});

const todoSlice = createSlice({
  name: 'TodoRest',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.list = action.payload;
        state.pending = false;
      })
      .addCase(addTodo.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.pending = false;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const toggle = state.list.find((e) => e.id === action.payload.id);
        if (toggle) {
          toggle.completed = !toggle.completed;
        }
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((e) => e.id !== action.payload);
      }),
});

export default todoSlice.reducer;
