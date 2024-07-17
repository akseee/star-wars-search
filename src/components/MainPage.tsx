import { useEffect, useState } from 'react';
import { ResultItem } from '../services/types';

import { Search } from './Search';
import useStorageQuery from '../hooks/useStorageQuery';
import { Results } from './Results';
import Loader from '../utils/Loader';
import { getBaseData, getSearchedData } from '../services/api';
import { useSearchParams } from 'react-router-dom';

type AppState = {
  searchData: ResultItem[];
  nextPage: string | null;
  prevPage: string | null;
};

const initialState: AppState = {
  searchData: [],
  nextPage: '2',
  prevPage: null
};

export const MainPage = () => {
  const [state, setState] = useState(initialState);

  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const [savedQuery] = useStorageQuery('storageQuery', '');

  // const currentQuery = searchParams.get('search') || '';
  // const currentPage = parseInt(searchParams.get('page') || '1', 10);
  // const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const query = searchParams.get('search') || savedQuery || '';
        if (query) {
          const data = await getSearchedData(query);
          console.log(data);
          setState((prevState) => ({
            ...prevState,
            searchData: data.results,
            nextPage: data.next,
            prevPage: data.previous
          }));
        } else {
          const data = await getBaseData();
          console.log(data);
          setState((prevState) => ({
            ...prevState,
            searchData: data.results,
            nextPage: data.next,
            prevPage: data.previous
          }));
        }
      } catch (error) {
        console.log('Fetching application data error: ', error);
      } finally {
        setIsLoading(false);
        console.log(savedQuery);
      }
    };
    fetchData();
  }, [savedQuery, searchParams]);

  // const handleNextPage = () => {
  //   navigate('/');
  //   const totalPages = Math.ceil(
  //     (state.searchData.length || state.data.length) / itemsPerPage
  //   );
  //   if (currentPage < totalPages) {
  //     setSearchParams({ page: (currentPage + 1).toString() });
  //   }
  // };

  // const handlePrevPage = () => {
  //   navigate('/');
  //   if (currentPage > 1) {
  //     setSearchParams({ page: (currentPage - 1).toString() });
  //   }
  // };

  // const paginatedData = (
  //   state.searchData.length !== 0 ? state.searchData : state.data
  // ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className='page'>
      <Search />
      <div className='data'>
        <h2>Starwars database:</h2>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            {/* <Pagination
              onNext={() => {}}
              onPrev={() => {}}
              currentPage={1}
              totalPages={10}
            /> */}
            <Results data={state.searchData} isLoading={isLoading} />
          </>
        )}
      </div>
    </div>
  );
};
