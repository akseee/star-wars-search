import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';

import ErrorBoundary from './utils/ErrorBoundary';
import { router } from './routes/routes';

const App: FC = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
