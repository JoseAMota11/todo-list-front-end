import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from 'react';

type Alert = {
  show: boolean;
  message: string;
  type: 'success' | 'informational';
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
  const [alert, setAlert] = useState<Alert>({
    show: false,
    message: '',
    type: 'success',
  });

  return (
    <AlertContext.Provider
      value={{
        alert,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}
