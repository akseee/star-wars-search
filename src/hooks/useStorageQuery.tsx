import { useEffect, useState } from 'react';

function useStorageQuery(key: string, initialValue: unknown) {
  const [searchQuery, setSearchQuery] = useState(() => {
    const savedQuery = localStorage.getItem(key);
    return savedQuery !== null ? JSON.parse(savedQuery) : initialValue;
  });

  useEffect(() => {
    return () => {
      localStorage.setItem(key, JSON.stringify(searchQuery));
    };
  }, [key, searchQuery]);

  return [searchQuery, setSearchQuery];
}

export default useStorageQuery;
