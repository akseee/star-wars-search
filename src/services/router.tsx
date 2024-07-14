import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from 'react-router-dom';
import { MainPage } from '../components/MainPage';
import { ErrorPage } from '../components/pages/ErrorPage';
import { DetaieldView } from '../components/pages/DetailedView';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainPage />}>
      <Route path='*' element={<ErrorPage />} />
      <Route path='/:name' element={<DetaieldView />} />
    </Route>
  )
);
