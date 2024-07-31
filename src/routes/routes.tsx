import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from '../pages/MainPage/MainPage';
import { ErrorPage } from '../pages/ErrorPage/ErrorPage';
import { DetaieldView } from '../components/DetailedView/DetailedView';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [{ path: '', element: <DetaieldView /> }]
  }
]);
