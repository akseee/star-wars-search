import { FC } from 'react';
import { Button } from '../ui/Button';
import { useNavigate, useRouteError } from 'react-router-dom';

export const ErrorPage: FC = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.error(error);
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
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button type='button' onClick={() => navigate('/')}>
        Return to the main page
      </Button>
    </>
  );
};
