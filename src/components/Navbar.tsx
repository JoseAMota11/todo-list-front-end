import { useModal } from '../hooks/useModal';

export default function Navbar() {
  const { createTodoModal } = useModal();

  const openModal = () => {
    createTodoModal.current?.showModal();
    document.body.style.overflow = 'hidden';
  };

  return (
    <nav className="h-[60px] bg-white/60 backdrop-blur flex justify-center sticky top-0 left-0 z-[1]">
      <div className="w-[800px] max-[800px]:px-4 flex items-center justify-between">
        <header>
          <h1 className="text-2xl font-bold select-none">TO-DO List</h1>
        </header>
        <button
          className="py-2 px-4 max-[600px]:py-1 max-[600px]:px-2 bg-sky-600 text-white rounded-md font-semibold hover:bg-sky-500"
          onClick={openModal}
        >
          Create a new TO-DO
        </button>
      </div>
    </nav>
  );
}
