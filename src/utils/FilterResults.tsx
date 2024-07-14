import { ResultItem } from '../services/types';

const filterResults = (
  allResults: ResultItem[],
  query: string
): ResultItem[] => {
  return allResults.filter((item: ResultItem) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
};

export default filterResults;
