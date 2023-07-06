import routes from './routes';

import AuthPage from './pages/Auth';
import RegisterPage from './pages/Register';
import MainPage from './pages/Main';
import GamePage from './pages/Game';
import Leaderboard from './pages/Leaderboard';
import ProfilePage from './pages/Profile';
import ForumPage from './pages/Forum';
import FullPost from './pages/FullPost';
import NoMatch from './pages/NoMatch';

import ProtectedRoute from './Components/ProtectedRoute';
import { loadMe } from './store/slices/User';
import { AppDispatch } from './store';

const commonLoader = (dispatch: AppDispatch) => {
  return dispatch(loadMe());
};

export const routesArr = [
  { path: '/', element: <></>, loader: commonLoader },
  { path: `/${routes.authPage}`, element: <AuthPage />, loader: commonLoader },
  {
    path: `/${routes.registerPage}`,
    element: <RegisterPage />,
    loader: commonLoader,
  },
  {
    path: `/${routes.profilePage}`,
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
    loader: commonLoader,
  },
  {
    path: `/${routes.mainPage}`,
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
    loader: commonLoader,
  },
  {
    path: `/${routes.gamePage}`,
    element: (
      <ProtectedRoute>
        <GamePage />
      </ProtectedRoute>
    ),
    loader: commonLoader,
  },
  {
    path: `/${routes.leaderboardPage}`,
    element: (
      <ProtectedRoute>
        <Leaderboard />
      </ProtectedRoute>
    ),
    loader: commonLoader,
  },
  {
    path: `/${routes.forumPage}`,
    element: (
      <ProtectedRoute>
        <ForumPage />
      </ProtectedRoute>
    ),
    loader: commonLoader,
  },
  {
    path: `/${routes.forumPage}/${routes.postsPage}/:id`,
    element: (
      <ProtectedRoute>
        <FullPost />
      </ProtectedRoute>
    ),
    loader: commonLoader,
  },
  { path: '*', element: <NoMatch /> },
];
