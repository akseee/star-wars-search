import React, { FC, useState } from 'react';

import { Form, useSearchParams } from 'react-router-dom';
import useStorageQuery from '../../hooks/useStorageQuery';
import { SearchBar } from '../ui/SearchBar/SearchBar';
import { Button } from '../ui/Button/Button';

export const Search: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('query') || ''
  );

  const [, setStorageQuery] = useStorageQuery('storageQuery', '');

  const handleSubmit = () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      searchParams.delete('query');
      setStorageQuery('');
    } else {
      searchParams.set('query', trimmedQuery);
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
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
      />
      <Button type='submit'>Search</Button>
    </Form>
  );
};
