import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import useAuth from './hooks/useAuth';
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

  return <Outlet />;
};

export default App;
