import { FC } from 'react';
import { useAppSelector } from '../../hooks/redux';
import { selectIsAuthenticated } from '../../store/slices/User';
import AuthPage from '../../pages/Auth';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [completed, isAuthenticated] = useAppSelector(selectIsAuthenticated);

  if (!completed) {
    return <></>;
  }

  if (isAuthenticated) {
    return children;
  }

  return <AuthPage />;
};

export default ProtectedRoute;
