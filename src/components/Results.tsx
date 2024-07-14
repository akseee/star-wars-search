import { FC, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ResultItem } from '../services/types';
import { PreviewCard } from './ui/Card';

type ResultFieldProps = {
  data: ResultItem[];
  isLoading: boolean;
};

export const Results: FC<ResultFieldProps> = ({ data, isLoading }) => {
  const [isCardVisible, setIsCardVisible] = useState(false);

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
                    to={`/${item.name}`}
                    className={({ isActive }) =>
                      isActive ? 'card-active' : ''
                    }
                    state={item}
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
