import { RefObject } from 'react';

export default function Navbar({
  modal,
}: {
  modal: RefObject<HTMLDialogElement>;
}) {
  const openModal = () => {
    modal.current?.showModal();
  };

  return (
    <nav className="h-[60px] bg-white flex justify-center">
      <div className="w-[800px] flex items-center justify-between">
        <header>
          <h1 className="text-2xl font-bold">TO-DO List</h1>
        </header>
        <button
          className="py-2 px-4 bg-sky-600 text-white rounded-md font-semibold hover:bg-sky-500"
          onClick={openModal}
        >
          Create a new TO-DO
        </button>
      </div>
    </nav>
  );
}
