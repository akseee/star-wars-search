import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { SearchBar } from './ui/SearchBar';
import useStorageQuery from '../hooks/useStorageQuery';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const Search: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [
    searchQuery,
    setSearchQuery,
    saveQueryToLocalStorage,
    removeQueryFromLocalStorage
  ] = useStorageQuery('searchQuery', '');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearch(search);
    if (search) {
      setSearchParams({ search });
    } else {
      setSearchParams({});
    }
  };

  const handlesubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const trimmedQuery = search.trim();
    if (trimmedQuery) {
      saveQueryToLocalStorage(trimmedQuery);
      setSearchQuery(trimmedQuery);
    } else {
      removeQueryFromLocalStorage();
      navigate('/');
    }
  };

  return (
    <form onSubmit={handlesubmit}>
      <SearchBar
        type='text'
        name='search'
        placeholder='Enter a character within the Star Wars universe'
        value={searchParams.get('search') || ''}
        onChange={handleChange}
      />
      <Button type='submit'>Search</Button>
    </form>
  );
};
