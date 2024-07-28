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
  page: number = MAIN_PAGE
): Promise<ApiResponse> => {
  const params = new URLSearchParams({
    page: page.toString()
  });

  if (query) {
    params.append('card', query);
  }

  const path = `${URL}?${params.toString()}`;

  return fetch(path).then((res) => checkResponse<ApiResponse>(res));
};

export const getPersonData = (uri: string) => {
  return fetch(uri).then((res) => checkResponse<ResultItem>(res));
};
