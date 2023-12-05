import AlertWrapper from './context/alert.context';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <AlertWrapper>
        <Home />
      </AlertWrapper>
    </>
  );
}
