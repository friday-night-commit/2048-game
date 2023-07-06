import { Button, Typography } from '@material-tailwind/react';
import { FormEvent, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../Input';
import Toast from '../Toast';

import { UserFields } from '../../pages/Profile/models/UserFields.enum';
import routes from '../../routes';
import useAuth from '../../hooks/useAuth';

const RegisterForm = () => {
  const { signup, loginError } = useAuth();

  const [formInputsData, setFormInputsData] = useState<SignupData>({
    first_name: '',
    second_name: '',
    email: '',
    phone: '',
    login: '',
    password: '',
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);

  const checkPasswords = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      const repeatPassword = (
        e.currentTarget.elements.namedItem(
          UserFields.repeat_password
        ) as HTMLInputElement
      ).value;

      if (formInputsData.password !== repeatPassword) {
        throw new Error('Пароли отличаются');
      }
    },
    [formInputsData]
  );

  const onSubmit = useCallback(
    function (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      try {
        setPasswordError('');
        checkPasswords(e);
        signup(formInputsData);
      } catch (e: unknown) {
        setPasswordError((e as Error).message);
      }
    },
    [formInputsData]
  );

  const updateInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputName = event.target.getAttribute('name') as keyof SignupData;
      const inputValue = event.target.value;

      setFormInputsData(formInputsData => ({
        ...formInputsData,
        [inputName]: inputValue,
      }));
    },
    [formInputsData]
  );

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
            onChange={e => updateInput(e)}
            required
          />
          <Input
            name={UserFields.second_name}
            type='text'
            label='Фамилия'
            validationType='name'
            onChange={e => updateInput(e)}
            required
          />
          <Input
            name={UserFields.email}
            type='email'
            label='Email'
            validationType='email'
            onChange={e => updateInput(e)}
            required
          />
          <Input
            name={UserFields.phone}
            type='tel'
            label='Телефон'
            validationType='phone'
            onChange={e => updateInput(e)}
            required
          />
          <Input
            name={UserFields.login}
            type='text'
            label='Логин'
            validationType='login'
            onChange={e => updateInput(e)}
            required
          />
          <Input
            name={UserFields.password}
            type='password'
            label='Пароль'
            validationType='password'
            onChange={e => updateInput(e)}
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
          {loginError && <Toast text={loginError} />}
        </div>
        <Button className='mt-6 mb-4' fullWidth type='submit'>
          Зарегистрироваться
        </Button>
        <Link
          to={`/${routes.authPage}`}
          className='font-medium text-blue-500 transition-colors hover:text-blue-700 text-center block'>
          Войти
        </Link>
      </form>
    </>
  );
};

export default RegisterForm;
