import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../routes';
import useAuth from '../../hooks/useAuth';

type ProtectedRouteProps = {
  children: JSX.Element | JSX.Element[];
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) navigate(`/${routes.authPage}`);

  return <>{children}</>;
};

export default ProtectedRoute;
