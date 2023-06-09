import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

import RegisterForm from '../../Components/RegisterForm';
import CardContainer from '../../Components/CardContainer';
import { selectIsAuthenticated } from '../../store/slices/User';

import routes from '../../routes';
import Preloader from '../../Components/Preloader';

export default function RegisterPage() {
  const [completed, isAuthenticated] = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  if (isAuthenticated) navigate(`/${routes.mainPage}`);

  return (
    <Preloader>
      {completed ? (
        <CardContainer className='register-page'>
          <RegisterForm />
        </CardContainer>
      ) : undefined}
    </Preloader>
  );
}
