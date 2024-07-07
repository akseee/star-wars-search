import React, { ReactNode } from 'react';
type TextInput = {
  name: string;
  type: string;
  placeholder?: string;
  children: ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

class SearchBar extends React.Component<TextInput> {
  render() {
    return (
      <>
        <label htmlFor={this.props.name}>{this.props.children}</label>
        <input
          placeholder={this.props.placeholder}
          type={this.props.type}
          name={this.props.name}
          id={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
        />
      </>
    );
  }
}
export default SearchBar;
