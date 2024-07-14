import { FC } from 'react';
import { CardDetailed } from '../ui/CardDetailed';

export const DetaieldView: FC = () => {
  const mock = {
    name: '123',
    height: '312',
    mass: '312',
    hair_color: '123123',
    skin_color: '123123',
    eye_color: '123123',
    birth_year: '123',
    gender: '123123'
  };
  return <CardDetailed item={mock}></CardDetailed>;
};
