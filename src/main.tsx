import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './globals.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AlertWrapper from './context/alert.context.tsx';
import IdWrapper from './context/idTodo.context.tsx';
import ModalWrapper from './context/modal.context.tsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AlertWrapper>
        <ModalWrapper>
          <IdWrapper>
            <App />
            <ReactQueryDevtools />
          </IdWrapper>
        </ModalWrapper>
      </AlertWrapper>
    </QueryClientProvider>
  </React.StrictMode>
);
