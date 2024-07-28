import React, { FC, useEffect, useState } from 'react';
import { CardDetailed } from '../ui/CardDetailed';
import { useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { getPersonData } from '../../services/api';
import { ResultItem } from '../../services/types';

export const DetaieldView: FC = () => {
  const location = useLocation();

  const url = location.state;
  const [heroData, setHeroData] = useState<ResultItem | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      if (!url) return;
      try {
        const res = await getPersonData(url);
        setHeroData(res);
      } catch (error) {
        console.log('error getching hero');
      } finally {
        console.log('Detailed view set up');
      }
    };
    fetchHero();
  }, [url]);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
  //       setIsCardVisible(false);
  //       navigate('/');
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isCardVisible, setIsCardVisible]);

  return (
    <>
      <div className='detailed-card'>
        <Button type='button'>x</Button>
        <CardDetailed item={heroData} />
      </div>
    </>
  );
};
