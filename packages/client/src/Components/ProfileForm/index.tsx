import { Button } from '@material-tailwind/react';
import { FC, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Input from '../Input';

import { UserFields } from '../../pages/Profile/models/UserFields.enum';
import routes from '../../routes';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import ProfileController from '../../Controllers/ProfileController';
import { setUser } from '../../store/slices/User';

type FormProps = {
  openChangePasswordModal: () => void;
};

type TProps = FC<FormProps>;

const ProfileForm: TProps = ({ openChangePasswordModal }: FormProps) => {
  const navigate = useNavigate();

  const { logout } = useAuth();
  const doLogout = async () => {
    await logout();
    navigate(`/${routes.authPage}`);
  };
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(store => store.userSlice.user);

  const handleSubmit = useCallback(
    async function (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const userData: Partial<User> = {};
      for (const pair of formData.entries()) {
        const [key, value] = pair as [UserFields, string];
        // @ts-ignore
        userData[key] = value;
      }

      const updatedUser = await ProfileController.changeUser(userData);
      if (updatedUser) {
        dispatch(setUser(updatedUser));
      }
    },
    [currentUser]
  );

  return (
    <form className='w-full' onSubmit={handleSubmit}>
      <Input
        name={UserFields.DISPLAY_NAME}
        type='text'
        label='Никнейм'
        validationType='default'
        value={currentUser?.display_name}
        required
      />
      <Input
        name={UserFields.FIRST_NAME}
        type='text'
        label='Имя'
        validationType='name'
        value={currentUser?.first_name}
        required
      />
      <Input
        name={UserFields.SECOND_NAME}
        type='text'
        label='Фамилия'
        validationType='name'
        value={currentUser?.second_name}
        required
      />
      <Input
        name={UserFields.LOGIN}
        type='text'
        label='Логин'
        validationType='login'
        value={currentUser?.login}
        required
      />
      <Input
        name={UserFields.EMAIL}
        type='email'
        label='Почта'
        validationType='email'
        value={currentUser?.email}
        required
      />
      <Input
        name={UserFields.PHONE}
        type='tel'
        label='Телефон'
        validationType='phone'
        value={currentUser?.phone}
        required
      />

      <div className='mb-4 flex flex-col'>
        <Button className='mt-6 mb-4' type='submit'>
          Сохранить
        </Button>
      </div>

      <div className='flex flex-col'>
        <Button
          onClick={() => openChangePasswordModal()}
          color='amber'
          className='mb-3'>
          Изменить пароль
        </Button>
        <Button className='mb-3' color='red' onClick={() => doLogout()}>
          Выйти
        </Button>
        <Link
          to={`/${routes.mainPage}`}
          className='font-medium text-blue-500 transition-colors hover:text-blue-700 text-center block'>
          Вернуться на главную
        </Link>
      </div>
    </form>
  );
};

export default ProfileForm;
