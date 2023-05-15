import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

import MainPage from './pages/Main';
import AuthPage from './pages/Auth';
import RegisterPage from './pages/Register';
import GamePage from './pages/Game';
import NoMatch from './pages/NoMatch';
import Leaderboard from './pages/Leaderboard';
import ProfilePage from './pages/Profile';

export default createBrowserRouter([
  { path: routes.mainPage, element: <MainPage /> },
  { path: routes.authPage, element: <AuthPage /> },
  { path: routes.registerPage, element: <RegisterPage /> },
  { path: routes.profilePage, element: <ProfilePage /> },
  { path: routes.gamePage, element: <GamePage /> },
  { path: routes.leaderboardPage, element: <Leaderboard /> },
  { path: '*', element: <NoMatch /> },
]);
