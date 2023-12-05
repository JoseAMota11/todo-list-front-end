import { useContext } from 'react';
import { AlertContext } from '../context/alert.context';

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (context) {
    const { alert, setAlert } = context;

    return { alert, setAlert };
  } else {
    throw new Error('useAlert must be used inside AlertContext context');
  }
};
