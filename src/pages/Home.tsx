import { useRef } from 'react';
import CardContainer from '../components/CardContainer';
import CreateTodoForm from '../components/CreateTodoForm';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import { useAlert } from '../hooks/useAlert';
import Alert from '../components/Alert';

export default function Home() {
  const modal = useRef<HTMLDialogElement>(null);
  const {
    alert: { show, message },
  } = useAlert();
  return (
    <>
      <Navbar modal={modal} />
      <main className="flex justify-center py-4">
        <CardContainer />
      </main>
      <Modal modal={modal}>
        <CreateTodoForm modal={modal} />
      </Modal>
      {show ? <Alert message={message} /> : null}
    </>
  );
}
