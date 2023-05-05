import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

import MainPage from './pages/Main';
import AuthPage from './pages/Auth';
import GamePage from './pages/Game';
import NoMatch from './pages/NoMatch';
import ProfilePage from './pages/Profile';
import ForumPage from './pages/Forum';
import Leaderboard from './pages/Leaderboard';
import FullPost from './pages/FullPost';
// import Post from './pages/Post';

export default createBrowserRouter([
  { path: routes.mainPage, element: <MainPage /> },
  { path: routes.authPage, element: <AuthPage /> },
  { path: routes.gamePage, element: <GamePage /> },
  { path: routes.profilePage, element: <ProfilePage /> },
  { path: routes.leaderboardPage, element: <Leaderboard /> },
  { path: routes.forumPage, element: <ForumPage /> },
  { path: `${routes.postsPage}/:id`, element: <FullPost /> },
  { path: '*', element: <NoMatch /> },
]);


