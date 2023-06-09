import routes from './routes';

import AuthPage from './pages/Auth';
import RegisterPage from './pages/Register';
import MainPage from './pages/Main';
import GamePage from './pages/Game';
import Leaderboard from './pages/Leaderboard';
import ProfilePage from './pages/Profile';
import NoMatch from './pages/NoMatch';

import ProtectedRoute from './Components/ProtectedRoute';

export const routesArr = [
  { path: `/${routes.authPage}`, element: <AuthPage /> },
  { path: `/${routes.registerPage}`, element: <RegisterPage /> },
  {
    path: `/${routes.profilePage}`,
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${routes.mainPage}`,
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${routes.gamePage}`,
    element: (
      <ProtectedRoute>
        <GamePage />
      </ProtectedRoute>
    ),
  },
  {
    path: `/${routes.leaderboardPage}`,
    element: (
      <ProtectedRoute>
        <Leaderboard />
      </ProtectedRoute>
    ),
  },
  // {
  //   path: `/${routes.forumPage}`,
  //   element: <ForumPage />
  // },
  // {
  //   path: `/${routes.forumPage}${routes.postsPage}/:id`,
  //   element: <FullPost />,
  // },
  { path: '*', element: <NoMatch /> },
];

// export default createBrowserRouter(routesArr);
