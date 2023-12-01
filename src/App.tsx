import { useEffect } from 'react';
import { getTodos } from './services/todos.services';

export default function App() {
  useEffect(() => {
    getTodos()
      .then((todos) => {
        console.log(todos);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
