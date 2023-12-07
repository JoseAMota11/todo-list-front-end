import AlertWrapper from './context/alert.context';
import ModalWrapper from './context/modal.context';
import EditPage from './pages/EditPage';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <AlertWrapper>
      <ModalWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/edit/:id" Component={EditPage} />
          </Routes>
        </BrowserRouter>
      </ModalWrapper>
    </AlertWrapper>
  );
}
