import axios from 'axios';
import { URL } from '../libs/constants';
import { type Todo } from '../types/todos';
import { type Filters } from '../types/filters';

export class Todos {
  static async get(filters?: Filters) {
    if (filters) {
      const PARAMS = new URLSearchParams('');
      for (const [key, value] of Object.entries(filters)) {
        PARAMS.set(key, value);
      }

      const NEW_URL = `${URL}?${decodeURIComponent(PARAMS.toString())}`;
      const response = await axios.get<Todo[]>(NEW_URL);
      return response.data;
    }

    const response = await axios.get<Todo[]>(URL);
    return response.data;
  }

  static async getOne(id: Todo['id']) {
    const response = await axios.get<Todo[]>(`${URL}/${id}`);
    return response.data;
  }

  static async getBySearch(search: string) {
    const response = await axios.get<Todo[]>(`${URL}?search=${search}`);
    return response.data;
  }

  static async post({ title, description }: Todo) {
    const response = await axios.post<{ message: string }>(URL, {
      title,
      description,
    });
    return response.data;
  }

  static async update({ id, title, description }: Todo) {
    const response = await axios.put<{ message: string }>(`${URL}/${id}`, {
      title,
      description,
    });
    return response.data;
  }

  static async delete(id: Todo['id']) {
    const response = await axios.delete<{ message: string }>(`${URL}/${id}`);
    return response.data;
  }

  static async done({ id, done }: { id: Todo['id']; done: number }) {
    const response = await axios.put<void>(`${URL}/done/${id}`, { done });
    return response.data;
  }
}
