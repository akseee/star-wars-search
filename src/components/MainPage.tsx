import { useEffect, useState } from 'react';
import { ResultItem } from '../services/types';
import { fetchAllPages, getResultApi, URL } from '../services/api';
import { Pagination } from './ui/Pagination';
import { Search } from './Search';
import { Outlet } from 'react-router-dom';
import useStorageQuery from '../hooks/useStorageQuery';
import filterResults from '../utils/FilterResults';
import { Results } from './Results';

type AppState = {
  searchData: ResultItem[];
  prevPage: string | null;
  nextPage: string | null;
};

const initialState: AppState = {
  searchData: [],
  prevPage: null,
  nextPage: null
};

export const MainPage = () => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [savedQuery] = useStorageQuery('searchQuery', '');
  const [isCardVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (savedQuery) {
      filteredData(savedQuery);
    } else {
      fetchDataState();
    }
  }, []);

  const fetchDataState = async (uri: string = URL): Promise<void> => {
    try {
      const result = await getResultApi(uri);
      setIsLoading(true);
      setState((prevState) => ({
        ...prevState,
        nextPage: result.next,
        prevPage: result.previous,
        searchData: result.results
      }));
    } catch (error) {
      console.log('Fetching application data error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = async (query: string): Promise<void> => {
    try {
      setIsLoading(true);

      const allResults = await fetchAllPages();
      const filteredResults = filterResults(allResults, query);
      setState((prevState) => ({
        ...prevState,
        searchData: filteredResults,
        prevPage: null,
        nextPage: null
      }));
    } catch (error) {
      console.error('Fetching filtered application data error: ', error);
      setState((prevState) => ({
        ...prevState,
        searchData: []
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (state.nextPage) {
      fetchDataState(state.nextPage);
    }
  };

  const handlePrevPage = () => {
    if (state.prevPage) {
      fetchDataState(state.prevPage);
    }
  };

  return (
    <div className='page'>
      <Search filteredData={filteredData} fetchData={fetchDataState} />
      <div className='data'>
        <h2>Starwars database:</h2>
        <Pagination onNext={handleNextPage} onPrev={handlePrevPage} />
        <div className={`${isCardVisible ? 'not-hidden' : 'hidden'} results`}>
          <Results data={state.searchData} isLoading={isLoading} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
