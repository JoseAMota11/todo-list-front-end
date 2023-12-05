import axios from 'axios';
import { URL } from '../libs/constants';
import { type Todo } from '../types/todos';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(URL);
  return response.data;
};

export class Todos {
  static async get() {
    const response = await axios.get<Todo[]>(URL);
    return response.data;
  }

  static async post(data: Pick<Todo, 'title' | 'description'>) {
    const response = await axios.post<{ message: string }>(URL, data);
    return response.data.message;
  }
}
