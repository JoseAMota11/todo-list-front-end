import { Todo } from '../types/todos';

export default function Card({ title, description }: Partial<Todo>) {
  return (
    <div className="rounded-md shadow-lg p-2 bg-white">
      <h2 className="text-xl font-semibold line-clamp-1 text-ellipsis">
        {title}
      </h2>
      <p className="text-gray-500 line-clamp-2 text-ellipsis">{description}</p>
    </div>
  );
}
