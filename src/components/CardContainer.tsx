import useData from '../hooks/useData';
import { getTodos } from '../services/todos.services';
import { Todo } from '../types/todos';
import Card from './Card';

export default function CardContainer() {
  const [data] = useData<Todo>(getTodos);

  return (
    <div className="w-[800px] grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] auto-rows-[100px] gap-2">
      {data.map(({ id, title, description }) => (
        <Card key={id} title={title} description={description} />
      ))}
    </div>
  );
}
