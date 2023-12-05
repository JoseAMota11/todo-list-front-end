import { BarLoader } from 'react-spinners';
import { Todos } from '../services/todos.services';
import { useQuery } from '@tanstack/react-query';
import Card from './Card';

export default function CardContainer() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['todos'],
    queryFn: Todos.get,
  });

  if (isLoading) {
    return <BarLoader color="#0284C7" />;
  }

  if (isError) {
    return <p className="text-lg">{error.message}</p>;
  }

  return (
    <div className="w-[800px] grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] auto-rows-[100px] gap-2">
      {data?.map(({ id, title, description }) => (
        <Card key={id} title={title} description={description} />
      ))}
    </div>
  );
}
