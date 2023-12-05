import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TodoSchema } from '../libs/todos.validations';
import { MdErrorOutline } from 'react-icons/md';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Todos } from '../services/todos.services';
import { RefObject } from 'react';

type Inputs = {
  title: string;
  description: string;
};

export default function CreateTodoForm({
  modal,
}: {
  modal: RefObject<HTMLDialogElement>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(TodoSchema),
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: Todos.post,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      modal.current?.close();
      reset({ title: '', description: '' });
    },
  });

  return (
    <form
      className="w-[360px] flex flex-col gap-4"
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
    >
      <label htmlFor="title" className="flex flex-col gap-1">
        <span className="font-semibold">Title</span>
        <input
          {...register('title')}
          type="text"
          id="title"
          placeholder="Learn React..."
          className="h-[40px] rounded-md border border-gray-300 indent-2"
        />
        {errors.title?.message ? (
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
        {errors.description?.message ? (
          <span className="text-sm text-red-600 flex gap-1 items-center">
            <MdErrorOutline size={18} className="fill-red-600" />
            {errors.description.message}
          </span>
        ) : null}
      </label>
      <button
        className="h-[40px] uppercase bg-sky-500 hover:bg-sky-400 rounded-md font-semibold text-white select-none"
        type="submit"
      >
        Add TO-DO
      </button>
    </form>
  );
}
