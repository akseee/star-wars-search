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
  componentDidMount(): void {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.setState({ query: savedQuery });
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handlesubmit(e: SyntheticEvent) {
    e.preventDefault();
    const trimmedQuery = this.state.query.trim();
    if (trimmedQuery) {
      localStorage.setItem('searchQuery', trimmedQuery);
      this.props.fetchData(trimmedQuery);
    } else {
      this.props.fetchData('');
      localStorage.removeItem('searchQuery');
    }
  }
  render() {
    return (
      <form onSubmit={this.handlesubmit}>
        <SearchBar
          type='text'
          name='search'
          placeholder='Enter a character within the Star Wars universe'
          value={this.state.query}
          onChange={this.handleChange}
        >
          {' '}
        </SearchBar>
        <Button type='submit'>Search</Button>
        <Button type='button'>Click to destroy!</Button>
      </form>
    );
  }
}

export default Search;
