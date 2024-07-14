import { useEffect, useState } from 'react';
import { ResultItem } from '../services/types';
import { fetchAllPages } from '../services/api';
import { Pagination } from './ui/Pagination';
import { Search } from './Search';
import { Outlet, useSearchParams } from 'react-router-dom';
import useStorageQuery from '../hooks/useStorageQuery';
import filterResults from '../utils/FilterResults';
import { Results } from './Results';

type AppState = {
  data: ResultItem[];
  searchData: ResultItem[];
  prevPage: number | null;
  nextPage: number | null;
};

const initialState: AppState = {
  data: [],
  searchData: [],
  prevPage: null,
  nextPage: 2
};
export const MainPage = () => {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [savedQuery] = useStorageQuery('searchQuery', '');
  const [isCardVisible] = useState(false);
  const [searchParams] = useSearchParams();

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
    const searchValue = searchParams.get('search') || '';
    if (searchValue) {
      applyFilter(searchValue, state.data);
    } else {
      setState((prevState) => ({
        ...prevState,
        searchData: []
      }));
    }
  }, [searchParams, state.data]);

  return (
    <div className='page'>
      <Search />
      <div className='data'>
        <h2>Starwars database:</h2>
        <Pagination
          onNext={() => console.log('nextpage')}
          onPrev={() => console.log('prevpage')}
        />
        <div className={`${isCardVisible ? 'not-hidden' : 'hidden'} results`}>
          <Results
            data={state.searchData.length !== 0 ? state.searchData : state.data}
            isLoading={isLoading}
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
