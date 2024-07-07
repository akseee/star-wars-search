import React, { ReactNode } from 'react';
interface ButtonProps {
  children: ReactNode;
  type: 'submit' | 'reset' | 'button' | undefined;
}
class Button extends React.Component<ButtonProps> {
  render() {
    return <button type={this.props.type}>{this.props.children}</button>;
  }
}

export default Button;
