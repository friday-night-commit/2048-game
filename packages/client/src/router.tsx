import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

import MainPage from './pages/Main';
import AuthPage from './pages/Auth';
import GamePage from './pages/Game';
import NoMatch from './pages/NoMatch';
import ProfilePage from './pages/Profile';

export default createBrowserRouter([
  { path: routes.mainPage, element: <MainPage /> },
  { path: routes.authPage, element: <AuthPage /> },
  { path: routes.gamePage, element: <GamePage /> },
  { path: routes.profilePage, element: <ProfilePage /> },
  { path: '*', element: <NoMatch /> },
]);
