import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import useAuth from './hooks/useAuth';
import { routesArr } from './router';
import routes from './routes';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getUserData } = useAuth();

  useEffect(() => {
    (async () => {
      const user = await getUserData();
      if (user && pathname === '/') navigate(`/${routes.mainPage}`);
    })();
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
