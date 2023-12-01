import { URL } from '../libs/constants';
import { type Todo } from '../types/todos';

export const getTodos = async () => {
  const res = await fetch(URL);
  const result = await res.json();

  return result as Todo[];
};
