import './App.css';
import { useEffect, useState } from 'react';
import { Results } from './components/pages/Results';
import { ResultItem } from './services/types';
import { fetchAllPages } from './services/api';
import { Pagination } from './components/ui/Pagination';
import { Search } from './components/Search';

type AppState = {
  searchData: ResultItem[];
  query: string;
};

const initialState: AppState = {
  searchData: [],
  query: ''
};

export const App = () => {
  const [state, setState] = useState(initialState);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      setState((prevState) => ({
        ...prevState,
        query: savedQuery
      }));
      fetchData(savedQuery);
    } else {
      fetchData('');
    }
  }, []);

  const fetchData = async (query: string): Promise<void> => {
    try {
      const allResults = await fetchAllPages('https://swapi.dev/api/people/');
      const filteredResults = allResults.filter((item: ResultItem) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setState((prevState) => ({
        ...prevState,
        searchData: filteredResults
      }));
    } catch (error) {
      console.error('Fetch error: ', error);
      setState({ ...state, searchData: [] });
    }
  };

  return (
    <div>
      <section className='section__search'>
        <Search fetchData={fetchData} />
      </section>
      <section className='section__result'>
        <h2>Data Base:</h2>
        <Pagination />
        <Results data={state.searchData} />
      </section>
    </div>
  );
};
