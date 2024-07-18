import { useEffect, useState } from 'react';
import { ResultItem } from '../services/types';

import { Search } from './Search';
import useStorageQuery from '../hooks/useStorageQuery';
import { Results } from './Results';
import Loader from '../utils/Loader';
import { getFetchData } from '../services/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from './ui/Pagination';
import { Button } from './ui/Button';

type AppState = {
  total: number;
  searchData: ResultItem[];
  nextPage: string | null;
  prevPage: string | null;
  count: number;
};

const initialState: AppState = {
  total: 0,
  searchData: [],
  nextPage: '2',
  prevPage: null,
  count: 1
};

export const MainPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [error, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [savedQuery] = useStorageQuery('storageQuery', '');

  const currentQuery = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  const handlePageChange = (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const query = currentQuery || savedQuery || '';
        const data = await getFetchData(query, currentPage);
        setState((prevState) => ({
          ...prevState,
          searchData: data.results,
          nextPage: data.next,
          prevPage: data.previous,
          total: Math.ceil(data.count / 10)
        }));
      } catch (error) {
        console.error('Fetching application data error: ', error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentQuery, currentPage, searchParams, savedQuery]);

  return (
    <div className='page'>
      <Search />
      <div className='data'>
        <h2>Starwars database:</h2>
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={state.total}
        />
        {isLoading && <Loader />}
        {error && (
          <>
            <h2>Fetching application data error </h2>
            <Button
              onClick={() => {
                setError(false);
                navigate(-1);
              }}
            >
              Return
            </Button>
          </>
        )}
        {!isLoading && !error && (
          <Results data={state.searchData} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};
