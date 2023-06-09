import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

import { AuthForm } from '../../Components/AuthForm';
import CardContainer from '../../Components/CardContainer';
import { selectIsAuthenticated } from '../../store/slices/User';

import routes from '../../routes';
import Preloader from '../../Components/Preloader';

export default function AuthPage() {
  const navigate = useNavigate();
  const [completed, isAuthenticated] = useAppSelector(selectIsAuthenticated);

  if (completed && isAuthenticated) navigate(`/${routes.mainPage}`);

  return (
    <Preloader>
      {completed ? (
        <CardContainer className='auth-page'>
          <AuthForm />
        </CardContainer>
      ) : undefined}
    </Preloader>
  );
}
