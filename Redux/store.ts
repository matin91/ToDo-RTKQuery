import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoReducer from './todo/todoSlice';

const rootReducer = combineReducers({
  todoList: todoReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
