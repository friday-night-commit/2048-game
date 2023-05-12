import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import Input from '../../Components/Input/index';
import { Button, Typography } from '@material-tailwind/react';
import Avatar from '../../Components/Avatar';
import routes from '../../routes';
import CardContainer from '../../Components/CardContainer';
import { ChangePasswordModal } from './components/ChangePassword/ChangePassword';

export enum UserFields {
  first_name = 'first_name',
  second_name = 'second_name',
  login = 'login',
  email = 'email',
  phone = 'phone',
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [visibilityChangePasswordModal, setVisibilityChangePasswordModal] =
    useState(false);

  const openChangePasswordModal = () => {
    setVisibilityChangePasswordModal(prev => !prev);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(routes.mainPage);
  };

  const handleOpenChangePasswordModal = () =>
    setVisibilityChangePasswordModal(prev => !prev);

  return (
    <CardContainer>
      <Typography variant='h3' className='text-center mb-8'>
        Настройки профиля
      </Typography>

      <div className='mb-8 flex justify-center'>
        <Avatar alert='photo' />
      </div>
      <form className='w-full' onSubmit={handleSubmit}>
        <Input
          name={UserFields.first_name}
          type='text'
          placeholder='Имя'
          required={true}
        />
        <Input
          name={UserFields.second_name}
          type='text'
          placeholder='Фамилия'
          required={true}
        />
        <Input
          name={UserFields.login}
          type='text'
          placeholder='Логин'
          required={true}
        />
        <Input
          name={UserFields.email}
          type='email'
          placeholder='Почта'
          required={true}
        />
        <Input
          name={UserFields.phone}
          type='tel'
          placeholder='+7999888999'
          required={true}
        />

        <div className='mt-4 mb-4 flex flex-col'>
          <Button
            onClick={() => openChangePasswordModal()}
            className='small game-button'>
            Изменить пароль
          </Button>
        </div>

        <div className='mb-4 flex flex-col'>
          <Button className='mt-6 mb-4' type='submit'>
            Сохранить
          </Button>
          <Button
            color='amber'
            className='mt-2 mb-4'
            onClick={() => navigate(-1)}>
            Вернуться Назад
          </Button>
        </div>
      </form>

      <ChangePasswordModal
        handleOpen={handleOpenChangePasswordModal}
        onClose={handleOpenChangePasswordModal}
        open={visibilityChangePasswordModal}
      />
    </CardContainer>
  );
}
