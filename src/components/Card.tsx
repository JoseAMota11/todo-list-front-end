import { MdDelete, MdEdit, MdOutlineDone } from 'react-icons/md';
import { Todo } from '../types/todos';
import { Link } from 'react-router-dom';
import { useModal } from '../hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todos } from '../services/todos.services';
import { useAlert } from '../hooks/useAlert';
import { useTodoId } from '../hooks/useTodoId';

export default function Card({ todo }: { todo: Todo }) {
  const { title, description } = todo;

  const { setTodoID } = useTodoId();
  const { deleteTodoModal } = useModal();
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: Todos.done,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error: any) => {
      setAlert({
        show: true,
        message: error.response.data.error,
        type: 'error',
      });
    },
  });

  const handleDeleteOpen = () => {
    deleteTodoModal.current?.showModal();
    setTodoID(todo.id);
    document.body.style.overflow = 'hidden';
  };

  const markAsDone = () => {
    mutate({ id: todo.id, done: 1 });
  };

  const markAsUndone = () => {
    mutate({ id: todo.id, done: 0 });
  };

  if (!todo.done) {
    return (
      <div
        className="rounded-md shadow-lg p-2 bg-white relative animate-mount-done"
        // style={{ animationDelay: `${delay}ms` }}
      >
        <div className="absolute top-2 right-2 flex gap-2 bg-gray-200 p-1 rounded-md">
          <MdOutlineDone
            className="fill-gray-700 hover:fill-green-600 cursor-pointer"
            size={20}
            onClick={markAsDone}
          />
          <Link to={`/edit/${todo.id}`}>
            <MdEdit
              className="fill-gray-700 hover:fill-blue-600 cursor-pointer"
              size={20}
            />
          </Link>
          <MdDelete
            className="fill-gray-700 hover:fill-red-600 cursor-pointer"
            size={20}
            onClick={handleDeleteOpen}
          />
        </div>
        <h2 className="text-xl font-semibold line-clamp-1">{title}</h2>
        <p className="text-gray-500 line-clamp-2">{description}</p>
      </div>
    );
  } else {
    return (
      <div
        className="rounded-md shadow-lg p-2 bg-white relative animate-mount-undone"
        // style={{ animationDelay: `${delay}ms` }}
      >
        <div className="absolute top-2 right-2 flex gap-2 bg-gray-200 p-1 rounded-md">
          <MdOutlineDone
            className="fill-green-700 hover:fill-green-700 cursor-pointer"
            size={20}
            onClick={markAsUndone}
          />
          <Link to={`/edit/${todo.id}`} aria-label={`Go to /edit/${todo.id}`}>
            <span className="sr-only">Edit todo {todo.id}</span>
            <MdEdit
              className="fill-gray-700 hover:fill-blue-600 cursor-pointer"
              size={20}
            />
          </Link>
          <MdDelete
            className="fill-gray-700 hover:fill-red-600 cursor-pointer"
            size={20}
            onClick={handleDeleteOpen}
          />
        </div>
        <h2 className="text-xl font-semibold line-clamp-1 line-through italic">
          {title}
        </h2>
        <p className="text-gray-500 line-clamp-2 line-through italic">
          {description}
        </p>
      </div>
    );
  }
}
