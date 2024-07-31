import { FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: () => void;
};

export const Button: FC<ButtonProps> = ({
  children,
  type = 'button',
  disabled = false,
  onClick
}) => {
  return (
    <button type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
