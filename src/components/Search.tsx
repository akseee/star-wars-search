import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { SearchBar } from './ui/SearchBar';
import useStorageQuery from '../hooks/useStorageQuery';
import { useNavigate } from 'react-router-dom';

type SearchProps = {
  filteredData: (query: string) => void;
  fetchData: () => void;
};
export const Search: FC<SearchProps> = ({ filteredData, fetchData }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [
    searchQuery,
    setSearchQuery,
    saveQueryToLocalStorage,
    removeQueryFromLocalStorage
  ] = useStorageQuery('searchQuery', '');
  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setQuery(search);
  };

  const handlesubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      saveQueryToLocalStorage(trimmedQuery);
      setSearchQuery(trimmedQuery);
      filteredData(trimmedQuery);
    } else {
      removeQueryFromLocalStorage();
      fetchData();
      navigate('/');
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
