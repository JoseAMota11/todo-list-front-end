import { ChangeEvent, useState } from 'react';
import { TodoValidator } from '../libs/todos.validations';
import { MdErrorOutline } from 'react-icons/md';

export default function CreateTodoForm() {
  const [{ title, description }, setFormData] = useState({
    title: '',
    description: '',
  });
  const [error, setError] = useState<{ title?: string; description?: string }>(
    {}
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClick = () => {
    const validationResult = TodoValidator.safeParse({ title, description });

    if (!validationResult.success) {
      const validationError = validationResult.error.issues.map(
        ({ message, path }) => ({
          [path[0]]: message,
        })
      );

      const result = Object.assign({}, ...validationError);
      setError(result);
    } else {
      setError({});
    }
  };

  return (
    <form className="w-[380px] flex flex-col gap-4">
      <label htmlFor="title" className="flex flex-col gap-1">
        <span className="font-semibold">Title</span>
        <input
          type="text"
          id="title"
          placeholder="Learn React..."
          name="title"
          onChange={handleChange}
          className="h-[40px] rounded-md border border-gray-300 indent-2"
        />
        {error.title ? (
          <span className="text-sm text-red-600 flex gap-1 items-center">
            <MdErrorOutline size={18} className="fill-red-600" />
            {error.title}
          </span>
        ) : null}
      </label>
      <label htmlFor="description" className="flex flex-col gap-1">
        <span className="font-semibold">Description</span>
        <textarea
          id="description"
          placeholder="I have to study react at 07:00 a.m."
          name="description"
          onChange={handleChange}
          className="resize-y min-h-[80px] max-h-[150px] rounded-md border border-gray-300 p-2"
        />
        {error.description ? (
          <span className="text-sm text-red-600 flex gap-1 items-center">
            <MdErrorOutline size={18} className="fill-red-600" />
            {error.description}
          </span>
        ) : null}
      </label>
      <button
        className="h-[40px] uppercase bg-sky-500 hover:bg-sky-400 rounded-md font-semibold text-white"
        type="button"
        onClick={handleClick}
      >
        Add TO-DO
      </button>
    </form>
  );
}
