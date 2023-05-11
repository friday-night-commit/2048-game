import { useNavigate } from 'react-router-dom';

import { AuthForm } from '../../Components/AuthForm';
import CardContainer from '../../Components/CardContainer';

import routes from '../../routes';
import useAuth from '../../hooks/useAuth';

export default function AuthPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) navigate(`/${routes.mainPage}`);

  return (
    <CardContainer className='auth-page'>
      <AuthForm />
    </CardContainer>
  );
}
