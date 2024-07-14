import { FC } from 'react';
import { Button } from './Button';

type PaginationProps = {
  onPrev: () => void;
  onNext: () => void;
};
export const Pagination: FC<PaginationProps> = ({ onNext, onPrev }) => {
  return (
    <div className='pagination'>
      <Button type='button' onClick={onPrev}>
        Previous Page
      </Button>
      <Button type='button' onClick={onNext}>
        Next Page
      </Button>
    </div>
  );
};
