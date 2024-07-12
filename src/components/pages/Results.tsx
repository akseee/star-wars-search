import { FC } from 'react';
import { ResultsProps } from '../../services/types';
import { NavLink, Outlet } from 'react-router-dom';
import { Card } from '../ui/Card';
import { CardDetailed } from '../ui/CardDetailed';

// const mock = {
//   name: 'hey',
//   height: '123',
//   mass: 'string',
//   hair_color: 'string',
//   skin_color: 'string',
//   eye_color: 'string',
//   birth_year: 'string',
//   gender: 'string'
// };

export const Results: FC<ResultsProps> = ({ data }) => {
  return (
    <div className='results'>
      <ul className={data.length > 5 ? '' : 'wide-grid'}>
        {data.map((item, index) => (
          <li key={index}>
            <NavLink to={`/results/${item.name}`}>
              {data.length > 5 ? (
                <Card item={item} />
              ) : (
                <CardDetailed item={item} />
              )}
            </NavLink>
          </li>
        ))}
      </ul>
      <div
        id='details'
        // className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
        {/* <CardDetailed item={mock} className='side-card' /> */}
      </div>
    </div>
  );
};
