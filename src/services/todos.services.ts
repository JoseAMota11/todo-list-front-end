import axios from 'axios';
import { URL } from '../libs/constants';
import { type Todo } from '../types/todos';
import { type Filters } from '../types/filters';

export class Todos {
  private static api = axios.create({
    baseURL: URL,
  });

  static async get(filters?: Filters) {
    if (filters) {
      const PARAMS = new URLSearchParams('');
      for (const [key, value] of Object.entries(filters)) {
        PARAMS.set(key, value);
      }

      const response = await Todos.api.get<Todo[]>(
        `?${decodeURIComponent(PARAMS.toString())}`
      );
      return response.data;
    }

    const response = await Todos.api.get<Todo[]>('');
    return response.data;
  }

  static async getOne(id: Todo['id']) {
    const response = await Todos.api.get<Todo[]>(`/${id}`);
    return response.data;
  }

  static async getBySearch(search: string) {
    const response = await Todos.api.get<Todo[]>(`?search=${search}`);
    return response.data;
  }

  static async post({ title, description }: Todo) {
    const response = await Todos.api.post<{ message: string }>('', {
      title,
      description,
    });
    return response.data;
  }

  static async update({ id, title, description }: Todo) {
    const response = await Todos.api.put<{ message: string }>(`/${id}`, {
      title,
      description,
    });
    return response.data;
  }

  static async delete(id: Todo['id']) {
    const response = await Todos.api.delete<{ message: string }>(`/${id}`);
    return response.data;
  }

  static async done({ id, done }: { id: Todo['id']; done: number }) {
    const response = await Todos.api.put<void>(`/done/${id}`, { done });
    return response.data;
  }
}
