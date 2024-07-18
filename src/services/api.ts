import { ResultItem } from './types';

export type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultItem[];
};

export const URL: string = 'https://swapi.dev/api/people/';
const MAIN_PAGE: number = 1;

export const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getFetchData = (
  query: string,
  page: number = MAIN_PAGE,
  uri: string = URL
): Promise<ApiResponse> => {
  const pageParam = `?page=${page}`;
  const searchParam = query !== '' ? `?search=${query}` : '';

  return fetch(`${uri}${searchParam ? searchParam : pageParam}`).then((res) =>
    checkResponse<ApiResponse>(res)
  );
};
