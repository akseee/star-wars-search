import { FC } from 'react';
import { ResultItem } from '../../services/types';

type CardProps = {
  item: ResultItem;
};

export const PreviewCard: FC<CardProps> = ({ item }) => <>{item.name}</>;
