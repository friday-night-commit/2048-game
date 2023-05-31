import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import useAuth from './hooks/useAuth';
import routes from './routes';
import { useAppDispatch } from './hooks/redux';
import { setUser } from './store/slices/User';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getUserData } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const user = await getUserData();
      if(user) {
        dispatch(setUser(user));
      }
      if (user && pathname === '/') navigate(`/${routes.mainPage}`);
    })();
  }, []);

  return <Outlet />;
};

export default App;
