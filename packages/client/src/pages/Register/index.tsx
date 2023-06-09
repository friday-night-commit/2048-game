import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';

import RegisterForm from '../../Components/RegisterForm';
import CardContainer from '../../Components/CardContainer';
import { selectIsAuthenticated } from '../../store/slices/User';

import routes from '../../routes';
import { useEffect } from 'react';

export default function RegisterPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, isAuthenticated] = useAppSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(`/${routes.mainPage}`);
  }, [isAuthenticated]);

  return (
    <CardContainer className='register-page'>
      <RegisterForm />
    </CardContainer>
  );
}
