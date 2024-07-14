import { FC } from 'react';
import { CardDetailed } from '../ui/CardDetailed';
import { useLocation } from 'react-router-dom';

export const DetaieldView: FC = () => {
  const location = useLocation();
  return <CardDetailed item={location.state}></CardDetailed>;
};
