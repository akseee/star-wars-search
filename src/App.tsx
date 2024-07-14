import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import { DetaieldView } from './components/pages/DetailedView';
import { ErrorPage } from './components/pages/ErrorPage';

const App: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}>
        <Route path=':name' element={<DetaieldView />} />
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
