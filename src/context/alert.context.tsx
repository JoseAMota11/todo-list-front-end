import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from 'react';

type Alert = {
  show: boolean;
  message: string;
};

type AlertContextType = {
  alert: Alert;
  setAlert: Dispatch<SetStateAction<Alert>>;
};

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export default function AlertWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alert, setAlert] = useState<Alert>({ show: false, message: '' });

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
