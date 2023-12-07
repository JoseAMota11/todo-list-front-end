import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useModal } from '../hooks/useModal';
import { Todos } from '../services/todos.services';
import { useAlert } from '../hooks/useAlert';
import { useTodoId } from '../hooks/useTodoId';

export default function DeleteTodoAlert() {
  const { todoID } = useTodoId();
  const { deleteTodoModal } = useModal();
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: Todos.delete,
    mutationKey: ['todos'],
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      deleteTodoModal.current?.close();
      document.body.style.overflow = 'auto';
      setAlert({ show: true, message: data.message, type: 'informational' });
    },
    onError: (error: any) => {
      setAlert({
        show: true,
        message: error.response.data.error,
        type: 'error',
      });
    },
  });

  return (
    <div>
      <p className="font-semibold mb-4">
        Are you sure you want to delete this TO-DO?
      </p>
      <button
        onClick={() => mutate(todoID)}
        className="h-[40px] w-full uppercase bg-red-500 hover:bg-red-400 rounded-md font-semibold text-white select-none"
      >
        Delete
      </button>
    </div>
  );
}
