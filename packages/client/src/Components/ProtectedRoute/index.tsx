import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { selectIsAuthenticated } from '../../store/slices/User';
import Preloader from '../Preloader';
import routes from '../../routes';

type ProtectedRouteProps = {
  children: JSX.Element | JSX.Element[];
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const [completed, isAuthenticated] = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  
  if (!isAuthenticated) navigate(`/${routes.authPage}`);

  return <Preloader>{completed ? children : undefined}</Preloader>;
};

export default ProtectedRoute;
