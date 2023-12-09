import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { TodoSchema } from '../libs/todos.validations';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Todos } from '../services/todos.services';
import { useEffect } from 'react';
import { useAlert } from '../hooks/useAlert';
import { Todo } from '../types/todos';

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{ title: string; description: string }>({
    resolver: zodResolver(TodoSchema),
  });
  const {
    data,
    error,
    isError,
  }: { data: Todo[] | undefined; error: any; isError: boolean } = useQuery({
    queryKey: ['todo', { id }],
    queryFn: async () => {
      if (id) {
        return Todos.getOne(id);
      }
    },
    retry: false,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: Todos.update,
    mutationKey: ['todo', { id }],
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ['todo', { id }] });
      navigate('/');
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

  useEffect(() => {
    if (data) {
      const { title, description } = data[0];
      setValue('title', title);
      setValue('description', description);
    }

    if (isError) {
      setAlert({
        show: true,
        message: error.response.data.message,
        type: 'error',
      });
    }
  }, [data, setValue, setAlert, error, isError]);

  return (
    <section className="grid min-h-screen place-content-center">
      <form
        className="bg-white p-4 rounded-lg shadow-md w-[360px] max-[400px]:w-[300px] flex flex-col gap-4"
        onSubmit={handleSubmit((data) => {
          if (id) {
            mutation.mutate({ ...data, id } as Todo);
          }
        })}
      >
        <h2 className="uppercase font-bold text-2xl">Edit TO-DO</h2>
        <label htmlFor="title" className="flex flex-col gap-1">
          <span className="font-semibold">Title</span>
          <input
            {...register('title')}
            type="text"
            id="title"
            placeholder="Learn React..."
            className="h-[40px] rounded-md border border-gray-300 indent-2"
          />
          {errors.title ? (
            <span className="text-sm text-red-600 flex gap-1 items-center">
              <MdErrorOutline size={18} className="fill-red-600" />
              {errors.title.message}
            </span>
          ) : null}
        </label>
        <label htmlFor="description" className="flex flex-col gap-1">
          <span className="font-semibold">Description</span>
          <textarea
            {...register('description')}
            id="description"
            placeholder="I have to study react at 07:00 a.m."
            className="resize-y min-h-[80px] max-h-[150px] rounded-md border border-gray-300 p-2"
          />
          {errors.description ? (
            <span className="text-sm text-red-600 flex gap-1 items-center">
              <MdErrorOutline size={18} className="fill-red-600" />
              {errors.description.message}
            </span>
          ) : null}
        </label>
        <div className="flex gap-4">
          <Link
            to={'/'}
            className="flex-1 h-[40px] uppercase bg-red-500 hover:bg-red-400 rounded-md font-semibold text-white select-none flex justify-center items-center"
          >
            Cancel
          </Link>
          <button
            className="flex-1 h-[40px] uppercase bg-sky-500 hover:bg-sky-400 rounded-md font-semibold text-white select-none"
            type="submit"
          >
            Edit TO-DO
          </button>
        </div>
      </form>
    </section>
  );
}
