import { Button, Typography } from '@material-tailwind/react';
import { useCallback, ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import routes from '../../routes';
import Input from '../Input';
import { UserFields } from '../../pages/Profile/models/UserFields.enum';

type Form = {
  login: string;
  password: string;
};

const AuthForm = function () {
  const navigate = useNavigate();

  const [formInputsData, setFormInputsData] = useState<Form>({
    login: '',
    password: '',
  });

  const onSubmit = useCallback(
    function (event: React.FormEvent) {
      event.preventDefault();
      // eslint-disable-next-line no-console
      console.log(formInputsData);

      navigate(routes.mainPage);
    },
    [formInputsData]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inputName = event.target.getAttribute('name') as keyof Form;
      const inputValue = event.target.value;

      setFormInputsData({
        ...formInputsData,
        [inputName]: inputValue,
      });
    },
    [formInputsData]
  );

  return (
    <>
      <Typography variant='h4' color='blue-gray' className='text-center mb-8'>
        Авторизация
      </Typography>
      <form className='w-full' onSubmit={onSubmit}>
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            name={UserFields.login}
            type='text'
            label='Имя'
            validationType='name'
            required
          />
          <Input
            name={UserFields.password}
            type='password'
            label='Пароль'
            validationType='password'
            required
          />
        </div>
        <Button className='mt-6 mb-4' fullWidth type='submit'>
          Войти
        </Button>
        <Link
          to={routes.registerPage}
          className='font-medium text-blue-500 transition-colors hover:text-blue-700 text-center block'>
          Регистрация
        </Link>
      </form>
    </>
  );
};

export default AuthForm;
