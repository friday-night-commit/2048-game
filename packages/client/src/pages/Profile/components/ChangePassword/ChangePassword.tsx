import React, { FC, FormEvent, useCallback, useState } from 'react';
import Modal from '../../../../Components/Modal';
import { Button } from '@material-tailwind/react';
import Input from '../../../../Components/Input';
import Toast from '../../../../Components/Toast';
import { UserFields } from '../../models/UserFields.enum';

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
    function (e: FormEvent<HTMLFormElement>) {
      e.preventDefault();
      let error = '';
      const repeatPassword = (
        e.currentTarget.elements.namedItem(
          UserFields.repeat_password
        ) as HTMLInputElement
      ).value;
      const newPassword = (
        e.currentTarget.elements.namedItem(
          UserFields.new_password
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
      title='Изменить пароль'
      open={open}
      handleOpen={handleOpen}
      className='game-modal'>
      <div className='box-border '>
        {error && <Toast text={error} />}
        <form onSubmit={handleSubmit}>
          <Input
            name={UserFields.old_password}
            type='password'
            validationType='password'
            label='Старый пароль'
            required
          />
          <Input
            name={UserFields.new_password}
            type='password'
            validationType='password'
            label='Новый пароль'
            required
          />
          <Input
            name={UserFields.repeat_password}
            type='password'
            validationType='password'
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
