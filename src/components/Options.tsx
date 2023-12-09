import { useMutation, useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Todos } from '../services/todos.services';
import { useAlert } from '../hooks/useAlert';
import { useSearchParams } from 'react-router-dom';

export default function Options() {
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

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchParams({ search: value });
    setSearch(value);
    mutate(value);
  }, 400);

  return (
    <div className="flex justify-center max-[800px]:px-2">
      <form className="w-[800px] py-4 flex justify-end">
        <input
          ref={inputRef}
          type="search"
          placeholder="Workout..."
          className="w-[400px] py-2 px-4 rounded-md max-[800px]:w-full"
          onChange={handleSearch}
        />
      </form>
    </div>
  );
}
