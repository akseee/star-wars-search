import { FC } from 'react';
import { ResultItem } from '../../services/types';

type CardProps = {
  item: ResultItem;
};

export const Card: FC<CardProps> = ({ item }) => (
  <div
    style={{
      fontWeight: 'bold',
      fontSize: '1.5em'
    }}
  >
    {item.name}
  </div>
);
