import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ResultItem } from '../services/types';
import { PreviewCard } from './ui/Card';

type ResultFieldProps = {
  data: ResultItem[];
  isLoading: boolean;
};

export const Results: FC<ResultFieldProps> = ({ data }) => {
  return (
    <ul className={`wide-grid results__list`}>
      {data.map((item, index) => (
        <li
          className='card'
          key={index}
          style={{
            fontWeight: 'bold',
            fontSize: '1.5em'
          }}
        >
          <NavLink
            to={`?card=${item.name}`}
            className={({ isActive }) => (isActive ? 'card-active' : '')}
            state={item.url}
            onClick={() => console.log('card click')}
          >
            <PreviewCard item={item} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
