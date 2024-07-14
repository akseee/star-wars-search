import { FC } from 'react';
import { Button } from './Button';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};
export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrev
}) => {
  return (
    <div className='pagination'>
      <Button type='button' onClick={onPrev}>
        Previous
      </Button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <Button type='button' onClick={onNext}>
        Next
      </Button>
    </div>
  );
};
