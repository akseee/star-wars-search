import React, { FC, useState } from 'react';
import { Button } from './ui/Button';
import { SearchBar } from './ui/SearchBar';
import { Form, useSearchParams } from 'react-router-dom';
import useStorageQuery from '../hooks/useStorageQuery';

export const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get('search') || ''
  );

  const [, setStorageQuery] = useStorageQuery('storageQuery', '');

  const handleSubmit = () => {
    const trimmedQuery = searchInput.trim();
    if (!trimmedQuery) {
      searchParams.delete('search');
      setStorageQuery('');
    } else {
      searchParams.set('search', trimmedQuery);
      setStorageQuery(trimmedQuery);
    }
    setSearchParams(searchParams);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SearchBar
        type='search'
        name='search'
        placeholder='Enter a character within the Star Wars universe'
        value={searchInput}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchInput(e.target.value)
        }
      />
      <Button type='submit'>Search</Button>
    </Form>
  );
};
