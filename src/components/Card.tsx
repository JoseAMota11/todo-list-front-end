import { MdDelete, MdEdit, MdOutlineDone } from 'react-icons/md';
import { Todo } from '../types/todos';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import DeleteTodoAlert from './DeleteTodoAlert';
import { useModal } from '../hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todos } from '../services/todos.services';
import { useAlert } from '../hooks/useAlert';

export default function Card({ todo }: { todo: Todo }) {
  const { title, description } = todo;
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
      <>
        <div className="rounded-md shadow-lg p-2 bg-white relative">
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
        <Modal modal={deleteTodoModal} title="Delete TO-DO">
          <DeleteTodoAlert id={todo.id} />
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <div className="rounded-md shadow-lg p-2 bg-white relative opacity-50">
          <div className="absolute top-2 right-2 flex gap-2 bg-gray-200 p-1 rounded-md">
            <MdOutlineDone
              className="fill-green-700 hover:fill-green-700 cursor-pointer"
              size={20}
              onClick={markAsUndone}
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
          <h2 className="text-xl font-semibold line-clamp-1 line-through italic">
            {title}
          </h2>
          <p className="text-gray-500 line-clamp-2 line-through italic">
            {description}
          </p>
        </div>
        <Modal modal={deleteTodoModal} title="Delete TO-DO">
          <DeleteTodoAlert id={todo.id} />
        </Modal>
      </>
    );
  }
}
