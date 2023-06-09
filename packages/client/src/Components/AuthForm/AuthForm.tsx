import { Button, Typography } from '@material-tailwind/react';
import { useCallback, ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import Toast from '../Toast';
import Input from '../Input';

import routes from '../../routes';
import useAuth from '../../hooks/useAuth';
import { UserFields } from '../../pages/Profile/models/UserFields.enum';
import { getAppId, getRedirectUri } from '../../Controllers/YandexController';

const AuthForm = function () {
  const { login, loginError } = useAuth();

  const [formInputsData, setFormInputsData] = useState<SigninData>({
    login: '',
    password: '',
  });

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      login(formInputsData);
    },
    [formInputsData]
  );

  const updateInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputName = event.target.getAttribute('name') as keyof SigninData;
      const inputValue = event.target.value;

      setFormInputsData(formInputsData => ({
        ...formInputsData,
        [inputName]: inputValue,
      }));
    },
    [formInputsData]
  );

  const authByYandex = useCallback(async () => {
    const appId = await getAppId();
    const redirectUri = getRedirectUri();
    window.location.replace(
      `https://oauth.yandex.ru/authorize?response_type=code&client_id=${appId}&redirect_uri=${redirectUri}`
    );
  }, []);

  return (
    <>
      <Typography variant='h4' color='blue-gray' className='text-center mb-8'>
        Авторизация
      </Typography>
      <form className='w-full' onSubmit={onSubmit} data-testid='auth-form'>
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            name={UserFields.login}
            type='text'
            label='Логин'
            validationType='login'
            onChange={e => updateInput(e)}
            required
            data-testid='login-input'
          />
          <Input
            name={UserFields.password}
            type='password'
            label='Пароль'
            validationType='password'
            onChange={e => updateInput(e)}
            required
            data-testid='password-input'
          />
        </div>
        {loginError && <Toast text={loginError} />}
        <Button className='mt-6 mb-4' fullWidth type='submit'>
          Войти
        </Button>
        <Link
          to={`/${routes.registerPage}`}
          className='font-medium text-blue-500 transition-colors hover:text-blue-700 text-center block'>
          Регистрация
        </Link>
      </form>
      <Button onClick={authByYandex}>Войти через Yandex OAuth</Button>
    </>
  );
};

export default AuthForm;
