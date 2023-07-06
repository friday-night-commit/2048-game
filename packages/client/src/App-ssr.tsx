import { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { routesArr } from './router';
import { authByCode, selectIsAuthenticated } from './store/slices/User';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import routes from './routes';

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, isAuthed] = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthed && pathname === '/' && !search) {
      navigate(`/${routes.mainPage}`);
    }
    if (!isAuthed && pathname === '/' && !search) {
      navigate(`/${routes.authPage}`);
    }
  }, [isAuthed]);

  useEffect(() => {
    const sp = new URLSearchParams(search);
    const code = sp.get('code');

    if (code) {
      dispatch(authByCode(code))
        .unwrap()
        .then(() => navigate(`/${routes.mainPage}`));
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
