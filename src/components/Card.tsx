import { MdDelete, MdEdit, MdOutlineDone } from 'react-icons/md';
import { Todo } from '../types/todos';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import DeleteTodoAlert from './DeleteTodoAlert';
import { useModal } from '../hooks/useModal';

export default function Card({ todo }: { todo: Todo }) {
  const { title, description } = todo;
  const { deleteTodoModal } = useModal();

  const handleDeleteOpen = () => {
    deleteTodoModal.current?.showModal();
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <div className="rounded-md shadow-lg p-2 bg-white relative">
        <div className="absolute top-2 right-2 flex gap-2 bg-gray-200 p-1 rounded-md">
          <MdOutlineDone
            className="fill-gray-700 hover:fill-green-600 cursor-pointer"
            size={20}
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
}
