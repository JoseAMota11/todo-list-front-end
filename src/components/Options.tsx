import debounce from 'lodash.debounce';
import { ChangeEvent } from 'react';
import useSearch from '../hooks/useSearch';
import { useModal } from '../hooks/useModal';

export default function Options() {
  const { setSearchParams, setSearch, mutate, inputRef } = useSearch();
  const { filtersModal } = useModal();

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchParams({ search: value });
    setSearch(value);
    mutate(value);
  }, 400);

  const handleFilterOpen = () => {
    filtersModal.current?.showModal();
    document.body.style.overflow = 'hidden';
  };

  return (
    <div className="flex justify-center max-[800px]:px-2">
      <form className="w-[800px] py-4 flex justify-end gap-2">
        <button
          className="py-2 px-4 max-[600px]:py-1 max-[600px]:px-2 bg-sky-800 text-white rounded-md font-semibold hover:bg-sky-700"
          type="button"
          onClick={handleFilterOpen}
        >
          Filters
        </button>
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
