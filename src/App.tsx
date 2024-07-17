import { FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import { DetaieldView } from './components/pages/DetailedView';
import ErrorBoundary from './utils/ErrorBoundary';
import { ErrorPage } from './components/pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      { path: ':name', element: <DetaieldView />, errorElement: <ErrorPage /> }
    ]
  }
]);

const App: FC = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
