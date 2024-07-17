import { FC, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ResultItem } from '../services/types';
import { PreviewCard } from './ui/Card';

type ResultFieldProps = {
  data: ResultItem[];
  isLoading: boolean;
};

export const Results: FC<ResultFieldProps> = ({ data, isLoading }) => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const location = useLocation();

  return (
    <>
      {!isLoading && (
        <>
          <div className={`${isCardVisible ? 'not-hidden' : 'hidden'} results`}>
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
                    onClick={() => {
                      setIsCardVisible(true);
                    }}
                    to={`${item.name}${location.search}`}
                    className={({ isActive }) =>
                      isActive ? 'card-active' : ''
                    }
                    state={{ data: item, page: location.search }}
                  >
                    <PreviewCard item={item} />
                  </NavLink>
                </li>
              ))}
            </ul>
            <Outlet context={[isCardVisible, setIsCardVisible]} />
          </div>
        </>
      )}
    </>
  );
};
