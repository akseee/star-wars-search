import React, { FC, useState } from 'react';

import { Form, useSearchParams } from 'react-router-dom';
import useStorageQuery from '../../hooks/useStorageQuery';
import { SearchBar } from '../ui/SearchBar/SearchBar';
import { Button } from '../ui/Button/Button';
import styles from './Search.module.css';

export const Search: FC = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('name') || ''
  );

  const [, setStorageQuery] = useStorageQuery('storageQuery', '');

  const handleSubmit = () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      searchParams.delete('name');
      setStorageQuery('');
    } else {
      searchParams.set('name', trimmedQuery);
      setStorageQuery(trimmedQuery);
    }
    // setSearchParams(searchQuery);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <SearchBar
        className={styles.input}
        type='search'
        name='search'
        placeholder='Enter a character within the Star Wars universe'
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
      />
      <Button className={styles.button} type='submit'>
        Search
      </Button>
    </Form>
  );
};
