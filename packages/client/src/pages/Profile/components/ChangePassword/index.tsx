import React, { FC, FormEvent, useCallback, useState } from 'react';
import Modal from '../../../../Components/Modal';
import { Button } from '@material-tailwind/react';
import Input from '../../../../Components/Input';
import Toast from '../../../../Components/Toast';
import { UserFields } from '../../models/UserFields.enum';
import ProfileController from '../../../../Controllers/ProfileController';

type TChangePasswordProps = {
  open: boolean;
  handleOpen: () => void;
};

export const ChangePasswordModal: FC<TChangePasswordProps> = ({
  open,
  handleOpen,
}) => {
  const [error, setError] = useState('');

  const handleSubmit = useCallback(
    async function (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      let error = '';
      const oldPassword = (
        e.currentTarget.elements.namedItem(
          UserFields.OLD_PASSWORD
        ) as HTMLInputElement
      ).value;
      const repeatPassword = (
        e.currentTarget.elements.namedItem(
          UserFields.REPEAT_PASSWORD
        ) as HTMLInputElement
      ).value;
      const newPassword = (
        e.currentTarget.elements.namedItem(
          UserFields.NEW_PASSWORD
        ) as HTMLInputElement
      ).value;

      if (repeatPassword !== newPassword) {
        error = 'Новый пароль отличается';
      }
      setError(error);

      if (!error) {
        const response = await ProfileController.changePassword({
          newPassword,
          oldPassword,
        });

        if (response !== true && typeof response === 'string') {
          setError(response);
          return;
        }

        handleOpen();
      }
    },
    [error]
  );

  return (
    <Modal
      title='Изменить пароль'
      open={open}
      handleOpen={handleOpen}
      className='game-modal'>
      <div className='box-border '>
        {error && <Toast text={error} />}
        <form onSubmit={handleSubmit}>
          <Input
            name={UserFields.OLD_PASSWORD}
            type='password'
            validationType='default'
            label='Старый пароль'
            required
          />
          <Input
            name={UserFields.NEW_PASSWORD}
            type='password'
            validationType='default'
            label='Новый пароль'
            required
          />
          <Input
            name={UserFields.REPEAT_PASSWORD}
            type='password'
            validationType='default'
            label='Повторите пароль'
            required
          />
          <div className='flex mt-2 justify-between '>
            <Button
              color='amber'
              className='mt-2 mb-4'
              type='submit'
              onClick={handleOpen}>
              Отмена
            </Button>
            <Button className='mt-2 mb-4' type='submit'>
              Изменить
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
