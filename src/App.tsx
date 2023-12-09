import Alert from './components/Alert';
import { useAlert } from './hooks/useAlert';
import EditPage from './pages/EditPage';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  const { alert } = useAlert();
  const { show, message } = alert;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/edit/:id" Component={EditPage} />
        </Routes>
      </BrowserRouter>
      {show ? <Alert message={message} /> : null}
    </>
  );
}
