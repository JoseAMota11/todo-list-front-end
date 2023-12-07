import axios from 'axios';
import { URL } from '../libs/constants';
import { type Todo } from '../types/todos';

type TodaData = Pick<Todo, 'title' | 'description'>;

export class Todos {
  static async get() {
    const response = await axios.get<Todo[]>(URL);
    return response.data;
  }

  static async getOne(id: Todo['id']) {
    const response = await axios.get<Todo[]>(`${URL}/${id}`);
    return response.data;
  }

  static async post(data: TodaData) {
    const response = await axios.post<{ message: string }>(URL, data);
    return response.data;
  }

  static async update(data: Todo, id: Todo['id']) {
    const response = await axios.put<{ message: string }>(`${URL}/${id}`, data);
    return response.data;
  }

  static async delete(id: Todo['id']) {
    const response = await axios.delete<{ message: string }>(`${URL}/${id}`);
    return response.data;
  }
}
