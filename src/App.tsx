import './App.css';
import React from 'react';
import { Results } from './components/pages/Results';
import Loader from './utils/Loader';
import { ResultItem } from './services/types';
import { Search } from './components/Search';

type AppState = {
  searchData: ResultItem[];
  query: string;
  loading: boolean;
};

type ApiResponse = {
  results: ResultItem[];
  next: string | null;
};

class App extends React.Component<Record<string, unknown>, AppState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      loading: false,
      searchData: [],
      query: ''
    };
  }

  componentDidMount(): void {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.setState({ query: savedQuery });
      this.fetchData(savedQuery);
    } else {
      this.fetchData('');
    }
  }

  fetchAllPages = async (url: string): Promise<ResultItem[]> => {
    let allResults: ResultItem[] = [];
    let currentPageUrl: string | null = url;

    while (currentPageUrl) {
      try {
        const response: Response = await fetch(currentPageUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();

        if (data.results && Array.isArray(data.results)) {
          allResults = allResults.concat(data.results);
        }

        currentPageUrl = data.next;
      } catch (error) {
        console.error('Fetch error: ', error);
        break;
      }
    }

    return allResults;
  };

  fetchData = async (query: string): Promise<void> => {
    this.setState({ loading: true });

    try {
      const allResults = await this.fetchAllPages(
        'https://swapi.dev/api/people/'
      );
      const filteredResults = allResults.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );

      this.setState({ searchData: filteredResults, loading: false });
    } catch (error) {
      console.error('Fetch error: ', error);
      this.setState({ searchData: [], loading: false });
    }
  };

  render() {
    const { searchData } = this.state;
    return (
      <div>
        <section className='section__search'>
          <Search fetchData={this.fetchData} />
        </section>
        <section className='section__result'>
          <h2>Data Base:</h2>
          {this.state.loading ? <Loader /> : <Results data={searchData} />}
        </section>
      </div>
    );
  }
}

export default App;
