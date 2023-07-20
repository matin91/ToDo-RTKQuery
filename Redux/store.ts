import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import todoAsyncStorageReducer from './slices/todoSliceAsyncStorage';
import todoSliceRestReducer from './slices/todoSliceRest';
import { api } from './query/api';

const rootReducer = combineReducers({
  todoAsyncStorage: todoAsyncStorageReducer,
  todoRest: todoSliceRestReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
