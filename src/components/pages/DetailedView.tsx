import React, { FC, useEffect, useRef } from 'react';
import { CardDetailed } from '../ui/CardDetailed';
import { useLocation, useOutletContext } from 'react-router-dom';
import { Button } from '../ui/Button';

export const DetaieldView: FC = () => {
  const location = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);

  const [isCardVisible, setIsCardVisible] =
    useOutletContext<
      [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    >();

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setIsCardVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!location.state?.data) {
    return null;
  }

  return (
    <>
      {isCardVisible && (
        <div ref={cardRef} className='detailed-card'>
          <Button type='button' onClick={() => setIsCardVisible(false)}>
            x
          </Button>
          <CardDetailed item={location.state.data} />
        </div>
      )}
    </>
  );
};
