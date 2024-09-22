import styles from './MainPage.module.css';

import { useCallback, useEffect, useState } from 'react';

import { Search } from '../../components/Search/Search';
import { Header } from '../../components/ui/Header/Header';
import { getFetchData, MAIN_PAGE } from '../../services/api';
import { ResultItem } from '../../services/types';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Main } from '../../components/ui/Main/Main';
import { Pagination } from '../../components/Pagination/Pagination';
import { Results } from '../../components/Results/Results';
import { enumSearchParams } from '../../services/params';
import useStorageQuery from '../../hooks/useStorageQuery';
import Loader from '../../components/Loader/Loader';

type PageState = {
  total: number;
  nextPage: string | null;
  prevPage: string | null;
};

type InfoState = { searchData: ResultItem[] };

const initialInfoState: InfoState = { searchData: [] };
const initialPageState: PageState = {
  total: 0,
  nextPage: '2',
  prevPage: null
};

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentQuery = searchParams.get(enumSearchParams.SEARCH) || '';
  const currentPage = parseInt(searchParams.get(enumSearchParams.PAGE) || '1');
  const currentCard = searchParams.get(enumSearchParams.CARD || false);

  const [savedQuery] = useStorageQuery('storaged-query', currentQuery);

  const [pageState, setPageState] = useState(initialPageState);
  const [infoState, setInfoState] = useState(initialInfoState);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const query = currentQuery || savedQuery || '';
        const data = await getFetchData(query, currentPage);
        setPageState((prevState) => ({
          ...prevState,
          nextPage: data.next,
          prevPage: data.previous,
          total: Math.ceil(data.count / 10)
        }));
        setInfoState((prevState) => ({
          ...prevState,
          searchData: data.results
        }));
      } catch (error) {
        console.error('Fetching application data error: ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [currentPage, currentQuery, savedQuery]);

  useEffect(() => {
    if (
      (!savedQuery && !Number.isNaN(currentPage)) ||
      Number.isInteger(currentPage) ||
      currentPage <= MAIN_PAGE
    ) {
      searchParams.set(enumSearchParams.PAGE, currentPage.toString());
      setSearchParams(searchParams);
    }
  }, [pageState, currentPage, searchParams, setSearchParams, savedQuery]);

  const handlePageChange = useCallback(
    (pageNumber: number): void => {
      searchParams.set(enumSearchParams.PAGE, String(pageNumber));
      setSearchParams(searchParams);
    },
    [setSearchParams, searchParams]
  );

  return (
    <>
      <Header>
        <Search />
      </Header>
      <Main className={styles.result}>
        <div className={styles.list}>
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={pageState.total}
          />
          {isLoading && <Loader />}
          {!isLoading && (
            <Results data={infoState.searchData} isLoading={isLoading} />
          )}
        </div>
        {currentCard && (
          <div className={styles.detailedView}>
            <Outlet />
          </div>
        )}
      </Main>
    </>
  );
};
