import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Todos } from '../services/todos.services';
import { useAlert } from './useAlert';

export default function useSearch() {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { setAlert } = useAlert();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['todos', { search }],
    mutationFn: Todos.getBySearch,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['todos', { search }] });
      queryClient.setQueryData(['todos'], data);
    },
    onError: (error: any) => {
      setAlert({
        show: true,
        message: error.response.data.message,
        type: 'error',
      });
    },
  });

  useEffect(() => {
    if (searchParams.has('search') && inputRef.current) {
      inputRef.current.value = searchParams.get('search') as string;
    }
  }, [searchParams, inputRef]);

  return {
    setSearch,
    setSearchParams,
    mutate,
    inputRef,
  };
}
