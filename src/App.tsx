import './App.css';
import { useEffect, useState } from 'react';
import { Results } from './components/pages/Results';
import { ResultItem } from './services/types';
import { Search } from './components/Search';
import { fetchAllPages } from './services/api';

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
        <Results data={state.searchData} />
      </section>
    </div>
  );
};
