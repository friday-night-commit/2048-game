import { Button } from '@material-tailwind/react';
import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input';
import { UserFields } from '../../pages/Profile/models/UserFields.enum';
import routes from '../../routes';

type FormProps = {
  openChangePasswordModal: () => void;
};

type TProps = FC<FormProps>;

const ProfileForm: TProps = ({ openChangePasswordModal }: FormProps) => {
  const handleSubmit = useCallback(function (e: React.FormEvent) {
    e.preventDefault();
  }, []);

  return (
    <form className='w-full' onSubmit={handleSubmit}>
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
        name={UserFields.login}
        type='text'
        label='Логин'
        validationType='login'
        required
      />
      <Input
        name={UserFields.email}
        type='email'
        label='Почта'
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

      <div className='mt-4 mb-4 flex flex-col'>
        <Button
          onClick={() => openChangePasswordModal()}
          color='amber'
          className='small'>
          Изменить пароль
        </Button>
      </div>

      <div className='mb-4 flex flex-col'>
        <Button className='mt-6 mb-4' type='submit'>
          Сохранить
        </Button>
        <Link
          to={routes.gamePage}
          className='font-medium text-blue-500 transition-colors hover:text-blue-700 text-center block'>
          Вернуться Назад
        </Link>
      </div>
    </form>
  );
};
export default ProfileForm;
