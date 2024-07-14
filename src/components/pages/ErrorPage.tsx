import { FC } from 'react';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

export const ErrorPage: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1
        style={{
          fontSize: '3em'
        }}
      >
        Oops!
      </h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Button type='button' onClick={() => navigate('/')}>
        Return to the main page
      </Button>
    </>
  );
};
