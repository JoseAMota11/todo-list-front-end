import useData from '../hooks/useData';
import { getTodos } from '../services/todos.services';
import { Todo } from '../types/todos';
import Card from './Card';

export default function CardContainer() {
  const [data] = useData<Todo>(getTodos);

  return (
    <div className="w-[600px] grid grid-cols-2 auto-rows-[120px] gap-2 p-2">
      {data.map(({ id, title, description }) => (
        <Card key={id} title={title} description={description} />
      ))}
    </div>
  );
}
