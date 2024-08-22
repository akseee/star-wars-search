import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getPersonData } from '../../services/api';
import { ResultItem } from '../../services/types';
import { CardDetailed } from '../ui/CardDetailed/CardDetailed';
import { Button } from '../ui/Button/Button';
import styles from './DetailedView.module.css';
import { enumSearchParams } from '../../services/params';
import Loader from '../Loader/Loader';

export const DetaieldView: FC = () => {
  const [heroData, setHeroData] = useState<ResultItem | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, isLoading] = useState(false);
  const currentCard = searchParams.get(enumSearchParams.CARD);

  useEffect(() => {
    const fetchHero = async () => {
      isLoading(true);
      if (!currentCard) return;
      try {
        const res = await getPersonData(currentCard);
        setHeroData(res);
      } catch (error) {
        console.log('error getching hero');
      } finally {
        console.log('Detailed view set up');
        isLoading(false);
      }
    };
    fetchHero();
  }, [currentCard]);

  const handleCloseButton = () => {
    searchParams.delete(enumSearchParams.CARD);
    setSearchParams(searchParams);
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className={styles.container}>
          <Button
            className={styles.closeButton}
            type='button'
            onClick={handleCloseButton}
          >
            x
          </Button>
          <CardDetailed item={heroData} className={styles.detailedCard} />
        </div>
      )}
    </>
  );
};
