import { useContext } from 'react';
import { ModalContext } from '../context/modal.context';

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context) {
    const { createTodoModal, deleteTodoModal, filtersModal } = context;

    return { createTodoModal, deleteTodoModal, filtersModal };
  } else {
    throw new Error('useModal must be used inside ModalContext context');
  }
};
