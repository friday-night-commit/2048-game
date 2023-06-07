import { useNavigate } from 'react-router-dom';

import { AuthForm } from '../../Components/AuthForm';
import CardContainer from '../../Components/CardContainer';

import routes from '../../routes';
import { useAppSelector } from '../../hooks/redux';

export default function AuthPage() {
  const navigate = useNavigate();
  const user = useAppSelector(store => store.userSlice.user);

  if (user) navigate(`/${routes.mainPage}`);

  return (
    <CardContainer className='auth-page'>
      <AuthForm />
    </CardContainer>
  );
}
