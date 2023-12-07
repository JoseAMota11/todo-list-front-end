import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
} from 'react';

type TodoID = {
  todoID: string | number;
  setTodoID: Dispatch<SetStateAction<string | number>>;
};

export const IdContext = createContext<TodoID | undefined>(undefined);

export default function IdWrapper({ children }: { children: React.ReactNode }) {
  const [todoID, setTodoID] = useState<string | number>('');

  return (
    <IdContext.Provider value={{ todoID, setTodoID }}>
      {children}
    </IdContext.Provider>
  );
}
