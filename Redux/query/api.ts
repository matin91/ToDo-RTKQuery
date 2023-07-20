import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).todoRest;
    if (token) {
      headers.set('authentication', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => '/todos',
      transformResponse: (response: Todo[]) => {
        const copy = response.filter((r) => r.id <= 10);
        return copy.sort((a, b) => b.id - a.id);
      },
      providesTags: ['Todos'], // defining a tag for this call
    }),
    addTodo: builder.mutation<
      string,
      { payload: Partial<Todo>; userId: string }
    >({
      query: ({ payload, userId }) => ({
        url: '/todos',
        method: 'POST',
        body: {
          user: userId,
          ...payload,
        },
      }),
      invalidatesTags: ['Todos'], // invalidate this tag for this mutation so that data can automatically re-fetched
    }),
    updateTodo: builder.mutation<
      string,
      { payload: Partial<Todo>; userId: string }
    >({
      query: ({ payload, userId }) => ({
        url: `/todos/${payload.id}`,
        method: 'PATCH',
        body: {
          user: userId,
          ...payload,
        },
      }),
      invalidatesTags: ['Todos'], // invalidate this tag for this mutation so that data can automatically re-fetched
    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation } =
  api;
