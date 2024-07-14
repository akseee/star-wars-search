import { FC } from 'react';
import { ResultItem } from '../../services/types';

type CardProps = {
  item: ResultItem;
};

export const CardDetailed: FC<CardProps> = ({ item }) => {
  return (
    <div>
      <span
        style={{
          fontWeight: 'bold'
        }}
      >
        {item.name}
      </span>
      <span>
        <strong>Gender</strong>: {item.gender}
      </span>
      <span>
        <strong>Birth year</strong>: {item.birth_year}
      </span>
      <span>
        <strong>Height</strong>: {item.height}
      </span>
      <span>
        <strong>Hair color</strong>: {item.hair_color}
      </span>
      <span>
        <strong>Skin color</strong>: {item.skin_color}
      </span>
      <span>
        <strong>Eye color</strong>: {item.eye_color}
      </span>
      <span>
        <strong>Mass</strong>: {item.mass}
      </span>
    </div>
  );
};
