import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { routesArr } from './router';
import { loadMe } from './store/slices/User';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { selectIsAuthenticated } from './store/slices/User';
import routes from './routes';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadMe());
    const [completed, isAuthenticated] = useAppSelector(selectIsAuthenticated);

    if (completed && isAuthenticated && pathname === '/') {
      navigate(`/${routes.mainPage}`);
    }
    if (completed && !isAuthenticated && pathname === '/') {
      navigate(`/${routes.authPage}`);
    }
  }, []);

  return (
    <Routes>
      {routesArr.map(route => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default App;
