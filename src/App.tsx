import AlertWrapper from './context/alert.context';
import IdWrapper from './context/idTodo.context';
import ModalWrapper from './context/modal.context';
import EditPage from './pages/EditPage';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <AlertWrapper>
      <ModalWrapper>
        <IdWrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/edit/:id" Component={EditPage} />
            </Routes>
          </BrowserRouter>
        </IdWrapper>
      </ModalWrapper>
    </AlertWrapper>
  );
}
