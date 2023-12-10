import { useForm } from 'react-hook-form';

export default function Filters() {
  const { register, handleSubmit } = useForm();

  return (
    <form
      className="w-[320px] flex flex-col gap-2"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">Order by</h3>
        <div className="flex items-center gap-1 [&>label]:flex [&>label]:items-center [&>label]:gap-1">
          <label htmlFor="asc">
            <span>ASC</span>
            <input
              type="radio"
              id="asc"
              value="asc"
              {...register('orderby')}
              defaultChecked
            />
          </label>
          <label htmlFor="desc">
            <span>DESC</span>
            <input
              type="radio"
              id="desc"
              value="desc"
              {...register('orderby')}
            />
          </label>
        </div>
      </div>
      <button
        className="h-[40px] uppercase bg-sky-800 text-white rounded-md font-semibold hover:bg-sky-700 select-none"
        type="submit"
      >
        Apply
      </button>
    </form>
  );
}
