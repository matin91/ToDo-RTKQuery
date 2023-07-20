import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todoAsyncStorageReducer from './todo/todoSliceAsyncStorage';
import todoSliceRestReducer from './todo/todoSliceRest';

const rootReducer = combineReducers({
  todoAsyncStorage: todoAsyncStorageReducer,
  todoRest: todoSliceRestReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
