import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { SearchBar } from './ui/SearchBar';

type SearchProps = {
  fetchData?: (query: string) => void;
};
export const Search: FC<SearchProps> = ({ fetchData }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      setQuery(savedQuery);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handlesubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      localStorage.setItem('searchQuery', trimmedQuery);
      fetchData!(trimmedQuery);
    } else {
      fetchData!('');
      localStorage.removeItem('searchQuery');
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
