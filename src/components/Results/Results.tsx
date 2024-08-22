import { FC } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import { ResultItem } from '../../services/types';
import styles from './Results.module.css';
import { PreviewCard } from '../ui/Card/Card';
import { parseIdFromUrl } from '../../services/parseIdFromUrl';
import { enumSearchParams } from '../../services/params';

type ResultFieldProps = {
  data: ResultItem[];
  isLoading: boolean;
};

export const Results: FC<ResultFieldProps> = ({ data }) => {
  const [searchParams] = useSearchParams();
  const updatedSearchParams = new URLSearchParams(searchParams);

  updatedSearchParams.delete(enumSearchParams.CARD);

  return (
    <ul className={styles.list}>
      {data.map((item, index) => (
        <li className={styles.card} key={index}>
          <NavLink
            to={`?${updatedSearchParams.toString()}&${enumSearchParams.CARD}=${parseIdFromUrl(item.url)}`}
            // className={({ isActive }) => (isActive ? `${styles.active}` : '')}
          >
            <PreviewCard item={item} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
