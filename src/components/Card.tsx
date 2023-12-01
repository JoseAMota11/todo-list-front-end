import { Todo } from '../types/todos';

export default function Card({ title, description }: Partial<Todo>) {
  return (
    <div className="rounded-md shadow-md p-2 bg-white">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
