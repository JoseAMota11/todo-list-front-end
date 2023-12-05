import axios from 'axios';
import { URL } from '../libs/constants';
import { type Todo } from '../types/todos';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(URL);
  return response.data;
};
