import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import useAuth from './hooks/useAuth';
import routes from './routes';
import { initServiceWorker } from './ServiceWorkers/initServiceWorker';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getUserData } = useAuth();

  initServiceWorker();

  useEffect(() => {
    (async () => {
      const user = await getUserData();
      if (user && pathname === '/') navigate(`/${routes.mainPage}`);
    })();
  }, []);

  return <Outlet />;
};

export default App;
