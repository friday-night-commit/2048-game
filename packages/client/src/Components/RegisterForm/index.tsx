import { Button, Typography } from '@material-tailwind/react';
import { FormEvent, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../Input';
import Toast from '../Toast';
import { UserFields } from '../../pages/Profile/models/UserFields.enum';
import routes from '../../routes';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [passwordError, setPasswordError] = useState<string | null>(null);

  const onSubmit = useCallback(function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const password = (
      e.currentTarget.elements.namedItem(
        UserFields.password
      ) as HTMLInputElement
    ).value;

    const repeatPassword = (
      e.currentTarget.elements.namedItem(
        UserFields.repeat_password
      ) as HTMLInputElement
    ).value;

    if (password !== repeatPassword) {
      setPasswordError('Пароли отличаются');
    } else {
      navigate(routes.mainPage);
    }
  }, []);

  return (
    <>
      <Typography variant='h4' color='blue-gray' className='text-center mb-8'>
        Регистрация
      </Typography>
      <form className='w-full' onSubmit={onSubmit}>
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            name={UserFields.first_name}
            type='text'
            label='Имя'
            validationType='name'
            required
          />
          <Input
            name={UserFields.second_name}
            type='text'
            label='Фамилия'
            validationType='name'
            required
          />
          <Input
            name={UserFields.email}
            type='email'
            label='Email'
            validationType='email'
            required
          />
          <Input
            name={UserFields.phone}
            type='tel'
            label='Телефон'
            validationType='phone'
            required
          />
          <Input
            name={UserFields.login}
            type='text'
            label='Логин'
            validationType='login'
            required
          />
          <Input
            name={UserFields.password}
            type='password'
            label='Пароль'
            validationType='password'
            required
          />
          <Input
            name={UserFields.repeat_password}
            type='password'
            label='Повторите пароль'
            validationType='password'
            required
          />
          {passwordError && <Toast text={passwordError} />}
        </div>
        <Button className='mt-6 mb-4' fullWidth type='submit'>
          Зарегистрироваться
        </Button>
        <Link
          to={routes.authPage}
          className='font-medium text-blue-500 transition-colors hover:text-blue-700 text-center block'>
          Войти
        </Link>
      </form>
    </>
  );
};

export default RegisterForm;
