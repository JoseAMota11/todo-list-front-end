import React, { RefObject, createContext, useRef } from 'react';

type ModalContextType = {
  createTodoModal: RefObject<HTMLDialogElement>;
  deleteTodoModal: RefObject<HTMLDialogElement>;
  filtersModal: RefObject<HTMLDialogElement>;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export default function ModalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const createTodoModal = useRef<HTMLDialogElement>(null);
  const deleteTodoModal = useRef<HTMLDialogElement>(null);
  const filtersModal = useRef<HTMLDialogElement>(null);

  return (
    <ModalContext.Provider
      value={{ createTodoModal, deleteTodoModal, filtersModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}
