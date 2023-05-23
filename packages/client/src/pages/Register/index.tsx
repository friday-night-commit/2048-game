import { useNavigate } from 'react-router-dom';

import RegisterForm from '../../Components/RegisterForm';
import CardContainer from '../../Components/CardContainer';

import routes from '../../routes';
import useAuth from '../../hooks/useAuth';

export default function RegisterPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) navigate(`/${routes.mainPage}`);

  return (
    <CardContainer className='register-page'>
      <RegisterForm />
    </CardContainer>
  );
}
