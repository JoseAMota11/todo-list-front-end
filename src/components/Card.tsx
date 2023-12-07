import { MdDelete, MdEdit } from 'react-icons/md';
import { Todo } from '../types/todos';

export default function Card({ todo }: { todo: Todo }) {
  const { title, description } = todo;

  const handleDeleteOpen = () => {
    /* TO-DO */
  };

  const handleUpdateOpen = () => {
    /* TO-DO */
  };

  return (
    <>
      <div className="rounded-md shadow-lg p-2 bg-white relative">
        <div className="absolute top-2 right-2 flex gap-1 bg-gray-200 p-1 rounded-md">
          <MdEdit
            className="fill-gray-700 hover:fill-blue-600 cursor-pointer"
            size={20}
            onClick={handleUpdateOpen}
          />
          <MdDelete
            className="fill-gray-700 hover:fill-red-600 cursor-pointer"
            size={20}
            onClick={handleDeleteOpen}
          />
        </div>
        <h2 className="text-xl font-semibold line-clamp-1">{title}</h2>
        <p className="text-gray-500 line-clamp-2">{description}</p>
      </div>
    </>
  );
}
