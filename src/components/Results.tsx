import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ResultItem } from '../services/types';
import Loader from '../utils/Loader';
import { PreviewCard } from './ui/Card';

type ResultFieldProps = {
  data: ResultItem[];
  isLoading: boolean;
};

export const Results: FC<ResultFieldProps> = ({ data, isLoading }) => {
  return (
    <ul className={`wide-grid results__list`}>
      {isLoading ? (
        <Loader />
      ) : (
        data.map((item, index) => (
          <li
            key={index}
            style={{
              fontWeight: 'bold',
              fontSize: '1.5em'
            }}
          >
            <NavLink
              to={`/${item.name}`}
              className={({ isActive }) => (isActive ? 'card-active' : '')}
              state={item}
            >
              <PreviewCard item={item} />
            </NavLink>
          </li>
        ))
      )}
    </ul>
  );
};
