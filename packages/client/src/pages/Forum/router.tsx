import { createBrowserRouter } from 'react-router-dom';
import FullPost from '../FullPost';
import routes from '../../routes';

export const forumRoutes = createBrowserRouter([
  { path: `${routes.postsPage}/:id`, element: <FullPost /> },
]);
