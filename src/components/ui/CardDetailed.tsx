import { FC } from 'react';
import { ResultItem } from '../../services/types';

type CardProps = {
  item: ResultItem;
};

export const CardDetailed: FC<CardProps> = ({ item }) => (
  <>
    <span
      style={{
        fontWeight: 'bold',
        fontSize: '1.5em'
      }}
    >
      {item.name}
    </span>
    <br />
    <strong>Gender:</strong> {item.gender} <br />
    <strong>Birth year:</strong> {item.birth_year} <br />
    <strong>Height:</strong> {item.height} <br />
    <strong>Hair color:</strong> {item.hair_color} <br />
    <strong>Skin color:</strong> {item.skin_color} <br />
    <strong>Eye color:</strong> {item.eye_color} <br />
    <strong>Mass:</strong> {item.mass} <br />
  </>
);
