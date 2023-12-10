import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Todos } from '../services/todos.services';
import { type Filters } from '../types/filters';
import { useModal } from '../hooks/useModal';

export default function Filters() {
  const { filtersModal } = useModal();
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['todos', { orderby: 'created_at', descending_order: 'asc' }],
    mutationFn: Todos.get,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todos', { ...variables }] });
      queryClient.setQueryData(['todos'], data);
      filtersModal.current?.close();
      document.body.style.overflow = 'auto';
    },
  });

  return (
    <form
      className="w-[320px] flex flex-col gap-2"
      onSubmit={handleSubmit((data) => mutate(data as Filters))}
    >
      <fieldset className="border-[2px] border-solid border-zinc-300 rounded-md">
        <legend className="ml-2 font-semibold">Order by:</legend>
        <div className="flex flex-col gap-1 px-2 [&>label]:flex [&>label]:items-center [&>label]:gap-1">
          <label htmlFor="created_at">
            <input
              type="radio"
              id="created_at"
              value="created_at"
              {...register('orderby')}
              defaultChecked
            />
            <span>Created at</span>
          </label>
          <label htmlFor="title">
            <input
              type="radio"
              id="title"
              value="title"
              {...register('orderby')}
            />
            <span>Title</span>
          </label>
          <label htmlFor="description">
            <input
              type="radio"
              id="description"
              value="description"
              {...register('orderby')}
            />
            <span>Description</span>
          </label>
        </div>
      </fieldset>
      <fieldset className="border-[2px] border-solid border-zinc-300 rounded-md">
        <legend className="ml-2 font-semibold">Descending order:</legend>
        <div className="flex flex-col gap-1 px-2 [&>label]:flex [&>label]:items-center [&>label]:gap-1">
          <label htmlFor="asc">
            <input
              type="radio"
              id="asc"
              value="asc"
              {...register('descending_order')}
              defaultChecked
            />
            <span>ASC</span>
          </label>
          <label htmlFor="desc">
            <input
              type="radio"
              id="desc"
              value="desc"
              {...register('descending_order')}
            />
            <span>DESC</span>
          </label>
        </div>
      </fieldset>
      <button
        className="h-[40px] uppercase bg-sky-800 text-white rounded-md font-semibold hover:bg-sky-700 select-none"
        type="submit"
      >
        Apply
      </button>
    </form>
  );
}
