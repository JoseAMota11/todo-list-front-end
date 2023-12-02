import { useRef } from 'react';
import CardContainer from '../components/CardContainer';
import CreateTodoForm from '../components/CreateTodoForm';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';

export default function Home() {
  const modal = useRef<HTMLDialogElement>(null);
  return (
    <>
      <Navbar modal={modal} />
      <main className="flex justify-center py-4">
        <CardContainer />
      </main>
      <Modal modal={modal}>
        <CreateTodoForm />
      </Modal>
    </>
  );
}
