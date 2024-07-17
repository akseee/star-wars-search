import { useCallback, useState } from 'react';

type UseStorageQueryReturnType = [string, (value: string) => void];

function useStorageQuery(
  key: string,
  initialValue: string
): UseStorageQueryReturnType {
  const [savedValue, setValue] = useState<string>(
    () => localStorage.getItem(key) || initialValue
  );

  const setNewStorageValue = useCallback(
    (value: string) => {
      if (value === '') {
        localStorage.removeItem(key);
      } else {
        setValue(value);
        localStorage.setItem(key, value);
      }
    },
    [key]
  );

  return [savedValue, setNewStorageValue];
}

export default useStorageQuery;
