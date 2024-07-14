import { useEffect, useState } from 'react';
import { ResultItem } from '../services/types';
import { fetchAllPages } from '../services/api';
import { Search } from './Search';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useStorageQuery from '../hooks/useStorageQuery';
import filterResults from '../utils/FilterResults';
import { Results } from './Results';
import { Pagination } from './ui/Pagination';
import Loader from '../utils/Loader';

type AppState = {
  data: ResultItem[];
  searchData: ResultItem[];
};

const initialState: AppState = {
  data: [],
  searchData: []
};

export const MainPage = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [savedQuery] = useStorageQuery('searchQuery', '');

  const currentQuery = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchAllPages();
        setState((prevState) => ({
          ...prevState,
          data: result
        }));
        if (savedQuery) {
          applyFilter(savedQuery, result);
        }
      } catch (error) {
        console.log('Fetching application data error: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [savedQuery]);

  const applyFilter = (query: string, data: ResultItem[]) => {
    if (query !== '') {
      const filteredResults = filterResults(data, query);
      setState((prevState) => ({
        ...prevState,
        searchData: filteredResults
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        searchData: []
      }));
    }
  };

  useEffect(() => {
    if (currentQuery) {
      applyFilter(currentQuery, state.data);
    } else {
      setState((prevState) => ({
        ...prevState,
        searchData: []
      }));
    }
  }, [currentQuery, state.data]);

  const handleNextPage = () => {
    navigate('/');
    const totalPages = Math.ceil(
      (state.searchData.length || state.data.length) / itemsPerPage
    );
    if (currentPage < totalPages) {
      setSearchParams({ page: (currentPage + 1).toString() });
    }
  };

  const handlePrevPage = () => {
    navigate('/');
    if (currentPage > 1) {
      setSearchParams({ page: (currentPage - 1).toString() });
    }
  };

  const paginatedData = (
    state.searchData.length !== 0 ? state.searchData : state.data
  ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className='page'>
      <Search />
      <div className='data'>
        <h2>Starwars database:</h2>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <Pagination
              onNext={handleNextPage}
              onPrev={handlePrevPage}
              currentPage={currentPage}
              totalPages={Math.ceil(
                (state.searchData.length || state.data.length) / itemsPerPage
              )}
            />
            <Results data={paginatedData} isLoading={isLoading} />
          </>
        )}
      </div>
    </div>
  );
};
