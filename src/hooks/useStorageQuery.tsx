import React, { useState } from 'react';

type UseStorageQueryReturnType = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  (value: string) => void,
  () => void
];

function useStorageQuery(
  key: string,
  initialValue: string
): UseStorageQueryReturnType {
  const [savedQuery, setNewSavedQuery] = useState(() => {
    const savedQuery = localStorage.getItem(key);
    return savedQuery !== null ? savedQuery : initialValue;
  });

  const saveQueryToLocalStorage = (value: string) => {
    localStorage.setItem(key, value);
  };

  const removeQueryFromLocalStorage = () => {
    localStorage.removeItem(key);
  };

  return [
    savedQuery,
    setNewSavedQuery,
    saveQueryToLocalStorage,
    removeQueryFromLocalStorage
  ];
}

export default useStorageQuery;
