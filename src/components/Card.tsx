import { MdDelete } from 'react-icons/md';
import { Todo } from '../types/todos';
import Modal from './Modal';
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todos } from '../services/todos.services';
import { useAlert } from '../hooks/useAlert';

export default function Card({ id, title, description }: Partial<Todo>) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: Todos.delete,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setAlert({ show: true, message: data.message, type: 'informational' });
    },
  });
  const deleteTodoModal = useRef<HTMLDialogElement>(null);

  const handleOpen = () => {
    deleteTodoModal.current?.showModal();
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    deleteTodoModal.current?.close();
    document.body.style.overflow = 'auto';
  };

  const handleDelete = () => {
    if (id) {
      mutation.mutate(id);
      handleClose();
    }
  };

  return (
    <>
      <div className="rounded-md shadow-lg p-2 bg-white relative">
        <div className="absolute top-2 right-2">
          <MdDelete
            className="fill-gray-700 hover:fill-red-600"
            size={20}
            onClick={handleOpen}
          />
        </div>
        <h2 className="text-xl font-semibold line-clamp-1">{title}</h2>
        <p className="text-gray-500 line-clamp-2">{description}</p>
      </div>
      <Modal modal={deleteTodoModal} title="Delete TO-DO">
        <div>
          <p className="mb-4">Are you sure you want to delete this todo?</p>
          <div className="flex justify-between gap-4 [&>button]:flex-1 [&>button]:h-[32px] [&>button]:rounded-md [&>button]:font-semibold">
            <button
              className="outline outline-1 outline-gray-800 hover:bg-gray-800 hover:outline-white hover:text-white transition-colors"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white hover:text-red-600 hover:bg-white hover:outline-red-600 outline outline-1 transition-colors"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
