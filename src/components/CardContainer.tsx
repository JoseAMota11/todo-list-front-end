import { BarLoader } from 'react-spinners';
import { Todos } from '../services/todos.services';
import { useQuery } from '@tanstack/react-query';
import Card from './Card';
import { Todo } from '../types/todos';
import { useSearchParams } from 'react-router-dom';

export default function CardContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    isLoading,
    isError,
    error,
    data,
  }: {
    isLoading: boolean;
    isError: boolean;
    error: any;
    data: Todo[] | undefined;
  } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      if (searchParams.has('search') && searchParams.get('search') !== '') {
        return Todos.getBySearch(searchParams.get('search') as string);
      } else {
        setSearchParams({});
      }

      return Todos.get();
    },
  });

  if (isLoading) {
    return <BarLoader color="#0284C7" />;
  }

  if (isError) {
    if (error.response) {
      return (
        <p className="text-2xl font-bold text-red-600">
          {error.response.data?.message}
        </p>
      );
    } else if (error.message) {
      return <p className="text-2xl font-bold text-red-600">{error.message}</p>;
    }

    return (
      <p className="text-lg">
        Oops, it seems there's a glitch in the system. We apologize for the
        inconvenience.
      </p>
    );
  }

  return (
    <div className="w-[800px] max-[800px]:px-2 grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] auto-rows-[100px] gap-2">
      {data?.map((todo) => (
        <Card key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
