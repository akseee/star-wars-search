import { FC } from 'react';
import { Button } from '../ui/Button';
import { useNavigate, useRouteError } from 'react-router-dom';

export const ErrorPage: FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();
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
      <h2>Sorry, an unexpected error has occurred.</h2>
      <h2>
        {error.statusText || error.message}: {error.status}
      </h2>

      <Button type='button' onClick={() => navigate('/')}>
        Return to the main page
      </Button>
    </>
  );
};
