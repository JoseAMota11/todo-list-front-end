export default function CreateTodoForm() {
  return (
    <form className="w-[380px] flex flex-col gap-4">
      <label htmlFor="title" className="flex flex-col">
        <span className="font-semibold">Title</span>
        <input
          type="text"
          id="title"
          placeholder="Learn React..."
          className="h-[40px] rounded-md border border-gray-300 indent-2"
        />
      </label>
      <label htmlFor="description" className="flex flex-col">
        <span className="font-semibold">Description</span>
        <textarea
          id="description"
          placeholder="I have to study react at 07:00 a.m."
          className="resize-y min-h-[80px] max-h-[150px] rounded-md border border-gray-300 p-2"
        />
      </label>
      <button
        className="h-[40px] uppercase bg-sky-500 hover:bg-sky-400 rounded-md font-semibold text-white"
        type="button"
      >
        Add TO-DO
      </button>
    </form>
  );
}
