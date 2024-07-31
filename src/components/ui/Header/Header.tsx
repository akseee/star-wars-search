import { FC, ReactNode } from 'react';
import styles from './Header.module.css';

type HeaderProps = {
  children: ReactNode;
};

export const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Starwars database</h1>
      {children}
    </header>
  );
};
