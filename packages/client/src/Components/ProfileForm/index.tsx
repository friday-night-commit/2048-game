import { Button } from '@material-tailwind/react';
import { FC, useCallback } from 'react';
import { UserFields } from '../../pages/Profile';
import { useNavigate } from 'react-router-dom';
import Form from '../Form';
import Input from '../Input';

type FormProps = {
  openChangePasswordModal: () => void;
};

type TProps = FC<FormProps>;

const ProfileForm: TProps = ({ openChangePasswordModal }) => {
  const navigate = useNavigate();
  const handleSubmit = useCallback(function (e: React.FormEvent) {
    e.preventDefault();
  }, []);

  return (
    <Form className="w-full" handlerSubmit={handleSubmit}>
      <Input
        name={UserFields.first_name}
        type="text"
        placeholder="Имя"
        validationType="name"
        required={true}
      />
      <Input
        name={UserFields.second_name}
        type="text"
        placeholder="Фамилия"
        validationType="name"
        required={true}
      />
      <Input
        name={UserFields.login}
        type="text"
        placeholder="Логин"
        validationType="login"
        required={true}
      />
      <Input
        name={UserFields.email}
        type="email"
        placeholder="Почта"
        validationType="email"
        required={true}
      />
      <Input
        name={UserFields.phone}
        type="tel"
        validationType="phone"
        placeholder="+7999888999"
        required={true}
      />

      <div className="mt-4 mb-4 flex flex-col">
        <Button
          onClick={() => openChangePasswordModal()}
          className="small game-button">
          Изменить пароль
        </Button>
      </div>

      <div className="mb-4 flex flex-col">
        <Button className="mt-6 mb-4" type="submit">
          Сохранить
        </Button>
        <Button
          color="amber"
          className="mt-2 mb-4"
          onClick={() => navigate(-1)}>
          Вернуться Назад
        </Button>
      </div>
    </Form>
  );
};
export default ProfileForm;
