import React, { SyntheticEvent } from 'react';
import Button from './Button';
import SearchBar from './SearchBar';

type SearchProps = {
  fetchData: (query: string) => void;
};

type SearchState = {
  query: string;
};

class Search extends React.Component<SearchProps, SearchState> {
  state: SearchState = {
    query: ''
  };
  constructor(props: SearchProps) {
    super(props);
    this.handlesubmit = this.handlesubmit.bind(this);
  }
  // Если запрос есть, то значение из LS подставляется в поле ввода.
  // Если запроса нет, то поле ввода остается пустым.
  // Когда пользователь вводит текст в поле ввода, он может нажать кнопку "Search" для выполнения поиска.
  // Поисковый запрос очищается от лишних пробелов перед отправкой.
  // Запрос сохраняется в LS.
  // Выполняется запрос к API с текущим значением поискового запроса.

  componentDidMount(): void {
    // При монтировании компонента проверяется локальное хранилище (Local Storage, LS) на наличие ранее сохраненного поискового запроса.
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.setState({ query: savedQuery });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleClean = () => {
    this.setState({ query: '' });
  };

  handlesubmit(e: SyntheticEvent) {
    e.preventDefault();
    const trimmedQuery = this.state.query.trim();
    if (trimmedQuery) {
      localStorage.setItem('searchQuery', trimmedQuery);
      console.log('Search query:', trimmedQuery);
    }
  }
  render() {
    return (
      <form onSubmit={this.handlesubmit}>
        <SearchBar
          type='text'
          name='search'
          placeholder='Search...'
          value={this.state.query}
          onChange={this.handleChange}
        >
          Give it a try!
        </SearchBar>
        <Button type='submit'>Search</Button>
        <Button type='button'>Click to destroy!</Button>
      </form>
    );
  }
}

export default Search;
