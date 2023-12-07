import { useContext } from 'react';
import { IdContext } from '../context/idTodo.context';

export const useTodoId = () => {
  const context = useContext(IdContext);

  if (context) {
    const { todoID, setTodoID } = context;

    return { todoID, setTodoID };
  } else {
    throw new Error('useTodoId must be used inside IdContext context');
  }
};
