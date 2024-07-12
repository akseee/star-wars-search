import { ResultItem } from './types';

type ApiResponse = {
  results: ResultItem[];
  next: string | null;
};

export const fetchAllPages = async (url: string): Promise<ResultItem[]> => {
  let allResults: ResultItem[] = [];
  let currentPageUrl: string | null = url;

  while (currentPageUrl) {
    try {
      const response: Response = await fetch(currentPageUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();

      if (data.results && Array.isArray(data.results)) {
        allResults = allResults.concat(data.results);
      }

      currentPageUrl = data.next;
    } catch (error) {
      console.error('Fetch error: ', error);
      break;
    }
  }

  return allResults;
};
