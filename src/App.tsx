import React from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Search from './components/Search';
import Results from './components/Results';

type SearchResult = {
  name: string;
  description: string;
};

interface AppState {
  searchData: SearchResult[] | null; // Замените на реальный тип данных, возвращаемых API
}

class App extends React.Component<unknown, AppState> {
  state = {
    searchData: null
  };
  componentDidMount(): void {
    this.fetchData();
    localStorage.getItem('searchQuery');
    console.log(localStorage.getItem('searchQuery'));
  }

  fetchData = (query = '') => {
    // Логика выполнения запроса к API
    // Здесь должен быть реальный URL API и логика для отправки запроса
    // Для примера используем заглушку
    const apiUrl = `https://swapi.dev/api/${query}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response answered with an errror');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ searchData: data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  render() {
    const { searchData } = this.state;
    return (
      <ErrorBoundary>
        <div className='content'>
          <section className='section__search'>
            <Search fetchData={this.fetchData} />
          </section>
          <section className='section__result'>
            {searchData && <Results data={searchData} />}
          </section>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
