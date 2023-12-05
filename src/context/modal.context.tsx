import React, { RefObject, createContext, useRef } from 'react';

type ModalContextType = {
  createTodoModal: RefObject<HTMLDialogElement>;
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

  return (
    <ModalContext.Provider value={{ createTodoModal }}>
      {children}
    </ModalContext.Provider>
  );
}
