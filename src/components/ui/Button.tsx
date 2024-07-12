import { FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  type: 'submit' | 'reset' | 'button' | undefined;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({ children, type, onClick }) => {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
