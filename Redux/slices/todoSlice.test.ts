// import TodoSlice, { initialTodoState, addTodo, Todo } from './TodoSlice';
// import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
// import { Middleware } from 'redux';
// import { render } from '@testing-library/react';
// import { slices } from '../fixtures/test';
//
// const middlewares: Middleware[] = [];
// const mockStore = configureStore(middlewares);
// describe('Todo', () => {
//   describe('Todo Actions', () => {
//     it('should dispatch addTodo', () => {
//       const store = mockStore(initialTodoState);
//       store.dispatch(addTodo(slices));
//
//       const actions = store.getActions();
//       const expectedPayload = {
//         type: 'slices/addTodo',
//         payload: slices,
//       };
//       expect(actions).toEqual([expectedPayload]);
//     });
//   });
//
//   describe('Todo Reducer', () => {
//     it('should add Todo', () => {
//       const previousState: Todo[] = [];
//       const expectedState = [slices];
//       expect(TodoSlice(previousState, addTodo(slices))).toEqual(expectedState);
//     });
//   });
// });
