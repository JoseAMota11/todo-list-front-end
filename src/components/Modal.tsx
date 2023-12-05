import React, { RefObject } from 'react';
import { IoIosClose } from 'react-icons/io';

export default function Modal({
  children,
  modal,
  title,
}: {
  children: React.ReactElement;
  modal: RefObject<HTMLDialogElement>;
  title: string;
}) {
  const closeModal = () => {
    modal.current?.close();
  };

  return (
    <dialog
      ref={modal}
      className="rounded-lg backdrop:bg-black backdrop:opacity-50 animate-mount"
    >
      <article className="flex flex-col gap-4 p-2">
        <div className="border-b border-b-gray-300 flex justify-between items-center">
          <p className="font-semibold text-xl uppercase">{title}</p>
          <IoIosClose
            size={50}
            onClick={closeModal}
            className="transition-colors hover:fill-red-500"
          />
        </div>
        {children}
      </article>
    </dialog>
  );
}
