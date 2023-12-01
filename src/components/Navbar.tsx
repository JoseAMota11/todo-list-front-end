export default function Navbar() {
  return (
    <nav className="h-[60px] bg-white flex justify-center">
      <div className="w-[800px] flex items-center justify-between">
        <header>
          <h1 className="text-2xl font-bold">TO-DO List</h1>
        </header>
        <a
          href="#"
          className="py-2 px-4 bg-sky-600 text-white rounded-md font-semibold"
        >
          Create a new TO-DO
        </a>
      </div>
    </nav>
  );
}
