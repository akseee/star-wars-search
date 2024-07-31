import React from 'react';
import { Button } from '../ui/Button/Button';

type brokenState = {
  counter: number;
};

class BrokenButton extends React.Component<Record<string, never>, brokenState> {
  state: brokenState = { counter: 0 };

  handleClick = () => {
    this.setState((prevState: brokenState) => ({
      counter: prevState.counter + 1
    }));
  };

  render() {
    if (this.state.counter === 1) {
      throw new Error('I crashed!');
    }
    return (
      <Button type='button' onClick={this.handleClick}>
        Click to destroy!
      </Button>
    );
  }
}

export default BrokenButton;
