import React, { FC, FormEvent, useCallback, useState } from 'react';
import Modal from '../../../../Components/Modal';
import { Button } from '@material-tailwind/react';
import Input from '../../../../Components/Input';
import Form from '../../../../Components/Form';
import Toast from '../../../../Components/Toast';

enum PASSWORDS_TYPE {
  OLD_PASSWORD = 'oldPassword',
  NEW_PASSWORD = 'newPassword',
  REPEAT_PASSWORD = 'repeatPassword',
}

type TChangePasswordProps = {
  onClose?: () => void;
  open: boolean;
  handleOpen: () => void;
};

export const ChangePasswordModal: FC<TChangePasswordProps> = ({
  open,
  handleOpen,
}) => {
  const [error, setError] = useState('');

  const handleSubmit = useCallback(
    function (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      let error = '';
      const repeatPassword = (
        e.currentTarget.elements.namedItem(
          PASSWORDS_TYPE.REPEAT_PASSWORD
        ) as HTMLInputElement
      ).value;
      const newPassword = (
        e.currentTarget.elements.namedItem(
          PASSWORDS_TYPE.NEW_PASSWORD
        ) as HTMLInputElement
      ).value;

      if (repeatPassword !== newPassword) {
        error = 'Новый пароль отличается';
      }
      setError(error);
    },
    [error]
  );

  return (
    <Modal
      title="Изменить пароль"
      open={open}
      handleOpen={handleOpen}
      className="game-modal">
      <div className=" py-5 box-border ">
        {error && <Toast text={error} />}
        <Form handlerSubmit={handleSubmit}>
          <Input
            name={PASSWORDS_TYPE.OLD_PASSWORD}
            type="password"
            validationType="password"
            label="Старый пароль"
            placeholder="Введите старый пароль"
            required={true}
          />
          <Input
            name={PASSWORDS_TYPE.NEW_PASSWORD}
            type="password"
            validationType="password"
            label="Новый пароль"
            placeholder="Введите новый пароль"
            required={true}
          />
          <Input
            name={PASSWORDS_TYPE.REPEAT_PASSWORD}
            type="password"
            validationType="password"
            label="Повторите пароль"
            placeholder="Повторите новый пароль"
            required={true}
          />
          <div className="flex mt-2 justify-between ">
            <Button
              color="amber"
              className="mt-2 mb-4"
              type="submit"
              onClick={handleOpen}>
              Отмена
            </Button>
            <Button className="mt-2 mb-4" type="submit">
              Изменить
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};
