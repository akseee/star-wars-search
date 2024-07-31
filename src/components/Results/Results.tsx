import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ResultItem } from '../../services/types';
import styles from './Results.module.css';
import { PreviewCard } from '../ui/Card/Card';

type ResultFieldProps = {
  data: ResultItem[];
  isLoading: boolean;
};

export const Results: FC<ResultFieldProps> = ({ data }) => {
  return (
    <ul className={styles.list}>
      {data.map((item, index) => (
        <li className={styles.card} key={index}>
          <NavLink
            to={`?card=${item.name}`}
            className={({ isActive }) => (isActive ? `styles.active` : '')}
            onClick={() => console.log('card click')}
          >
            <PreviewCard item={item} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
