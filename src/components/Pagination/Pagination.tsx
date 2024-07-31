import { FC } from 'react';
import { Button } from '../ui/Button/Button';
import styles from './Pagination.module.css';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <div className={styles.pagination}>
      <Button
        disabled={currentPage === 1}
        type='button'
        onClick={() =>
          currentPage > 1 ? onPageChange(currentPage - 1) : currentPage
        }
      >
        Previous
      </Button>
      <span className={styles.page}>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        disabled={currentPage === totalPages}
        type='button'
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};
