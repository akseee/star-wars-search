import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { SearchBar } from './ui/SearchBar';
import useStorageQuery from '../hooks/useStorageQuery';

type SearchProps = {
  filteredData: (query: string) => void;
  fetchData: () => void;
};
export const Search: FC<SearchProps> = ({ filteredData, fetchData }) => {
  const [query, setQuery] = useState('');
  const [
    searchQuery,
    setSearchQuery,
    saveQueryToLocalStorage,
    removeQueryFromLocalStorage
  ] = useStorageQuery('searchQuery', '');

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handlesubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      saveQueryToLocalStorage(trimmedQuery);
      setSearchQuery(trimmedQuery);
      filteredData(trimmedQuery);
    } else {
      fetchData();
      removeQueryFromLocalStorage();
    }
  };

  return (
    <form onSubmit={handlesubmit}>
      <SearchBar
        type='text'
        name='search'
        placeholder='Enter a character within the Star Wars universe'
        value={query}
        onChange={handleChange}
      />
      <Button type='submit'>Search</Button>
    </form>
  );
};
