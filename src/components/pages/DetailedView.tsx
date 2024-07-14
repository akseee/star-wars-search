import React, { FC, useEffect, useRef } from 'react';
import { CardDetailed } from '../ui/CardDetailed';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { Button } from '../ui/Button';

export const DetaieldView: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const [isCardVisible, setIsCardVisible] =
    useOutletContext<
      [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    >();

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setIsCardVisible(false);
      navigate(location.state?.prevPage || '/');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isCardVisible && (
        <div ref={cardRef} className={`detailed-card`}>
          <Button
            type='button'
            onClick={() => {
              setIsCardVisible(false);
              navigate(location.state?.prevPage || '/');
            }}
          >
            x
          </Button>
          <CardDetailed item={location.state} />
        </div>
      )}
    </>
  );
};
