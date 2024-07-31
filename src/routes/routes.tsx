import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { DetaieldView } from '../components/DetailedView/DetailedView';
import { MainPage } from '../pages/MainPage/MainPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [{ path: '', element: <DetaieldView /> }]
  }
]);
