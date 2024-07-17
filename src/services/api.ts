import { ResultItem } from './types';

export type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultItem[];
};

export const URL = 'https://swapi.dev/api/people/';

export const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getSearchedData = (
  query?: string,
  uri: string = URL
): Promise<ApiResponse> => {
  return fetch(`${uri}?search=${query}`).then((res) =>
    checkResponse<ApiResponse>(res)
  );
};

export const getBaseData = (uri: string = URL): Promise<ApiResponse> => {
  return fetch(uri).then((res) => checkResponse<ApiResponse>(res));
};

export const getResultListApi = (uri: string = URL): Promise<ResultItem[]> => {
  return fetch(uri)
    .then((res) => checkResponse<ApiResponse>(res))
    .then((data) => data.results);
};

export const fetchAllPages = async (
  url: string = URL
): Promise<ResultItem[]> => {
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
