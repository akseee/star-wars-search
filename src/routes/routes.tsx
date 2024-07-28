import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../components/MainPage';
import { ErrorPage } from '../components/pages/ErrorPage';
import { DetaieldView } from '../components/pages/DetailedView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [{ path: '', element: <DetaieldView /> }]
  }
]);
