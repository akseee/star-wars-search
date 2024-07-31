import { FC, ReactNode } from 'react';
import styles from './Main.module.css';

type MainProps = {
  children: ReactNode;
  className?: string;
};

export const Main: FC<MainProps> = ({ children, className }) => {
  return <main className={`${styles.main} ${className}`}>{children}</main>;
};
