import React, { ReactNode } from 'react';
type ButtonProps = {
  children: ReactNode;
  type: 'submit' | 'reset' | 'button' | undefined;
  onClick?: () => void;
};
class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <button type={this.props.type} onClick={this.props.onClick}>
        {this.props.children}
      </button>
    );
  }
}

export default Button;
