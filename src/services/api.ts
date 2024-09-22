import { enumSearchParams } from './params';
import { ResultItem } from './types';

export type ApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ResultItem[];
};

export const URL: string = 'https://swapi.dev/api/people/';
export const MAIN_PAGE: number = 1;

export const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getFetchData = (
  searchQuery: string,
  page: number = MAIN_PAGE
): Promise<ApiResponse> => {
  const params = new URLSearchParams();

  params.set('page', page.toString());

  if (searchQuery) {
    params.set(enumSearchParams.SEARCH, searchQuery);
    params.delete(enumSearchParams.PAGE);
  }

  return fetch(`${URL}/?${params.toString()}`).then((res) =>
    checkResponse<ApiResponse>(res)
  );
};

export const getPersonData = (id: string) => {
  return fetch(`${URL}/${id}`).then((res) => checkResponse<ResultItem>(res));
};
