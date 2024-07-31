import styles from './MainPage.module.css';

import { useEffect, useState } from 'react';
import { ResultItem } from '../../services/types';
import useStorageQuery from '../../hooks/useStorageQuery';
import { Results } from '../../components/Results/Results';
import { getFetchData } from '../../services/api';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Search } from '../../components/Search/Search';
import { Pagination } from '../../components/Pagination/Pagination';
import { Header } from '../../components/ui/Header/Header';
import { Main } from '../../components/ui/Main/Main';

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
  // const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [savedQuery] = useStorageQuery('storageQuery', '');

  const [state, setState] = useState(initialState);
  // const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const currentQuery = searchParams.get('query') || '';
  // const currentPage = parseInt(searchParams.get('page') || '1');

  const handlePageChange = (pageNumber: number) => {
    setSearchParams({ page: pageNumber.toString() });
  };

  useEffect(() => {
    console.log(state);

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const query = currentQuery || savedQuery || '';
        const data = await getFetchData('', 1);
        setState((prevState) => ({
          ...prevState,
          searchData: data.results,
          nextPage: data.next,
          prevPage: data.previous,
          total: Math.ceil(data.count / 10)
        }));
      } catch (error) {
        console.error('Fetching application data error: ', error);
        // setError(true);
      } finally {
        setIsLoading(false);
        console.log(state);
      }
    };
    fetchData();
  }, [searchParams, savedQuery]);

  // const errorElement = (
  //   <>
  //     <h2>Fetching application data error </h2>
  //     <Button
  //       onClick={() => {
  //         setError(false);
  //         navigate(-1);
  //       }}
  //     >
  //       Return
  //     </Button>
  //   </>
  // );
  return (
    <>
      <Header>
        <Search />
      </Header>
      <Main className={styles.result}>
        <div className={styles.list}>
          <Pagination
            currentPage={1}
            onPageChange={handlePageChange}
            totalPages={state.total}
          />
          <Results data={state.searchData} isLoading={isLoading} />
        </div>
        {2 + 2 && (
          <div className={styles.detailedView}>
            <Outlet />
          </div>
        )}
      </Main>
    </>
  );
};
