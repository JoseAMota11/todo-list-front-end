import AlertWrapper from './context/alert.context';
import ModalWrapper from './context/modal.context';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <AlertWrapper>
        <ModalWrapper>
          <Home />
        </ModalWrapper>
      </AlertWrapper>
    </>
  );
}
