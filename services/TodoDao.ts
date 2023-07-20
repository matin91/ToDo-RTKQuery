import { TodoObject } from '../types/TodoObject';

export class TodoDAO {
  delete = (id: number): Promise<void> => {
    const url = `${process.env.REACT_APP_URL_TODO || ''}/${id}`;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then((r) => r.json());
  };

  save = (todo: TodoObject): Promise<TodoObject> => {
    const url = process.env.REACT_APP_URL_TODO || '';
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    }).then((r) => r.json());
  };

  getAll = (): Promise<TodoObject[]> => {
    return fetch(process.env.REACT_APP_URL_TODO || '').then((r) => r.json());
  };
}
