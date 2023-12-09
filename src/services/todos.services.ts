import axios from 'axios';
import { URL } from '../libs/constants';
import { type Todo } from '../types/todos';

export class Todos {
  static async get() {
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
