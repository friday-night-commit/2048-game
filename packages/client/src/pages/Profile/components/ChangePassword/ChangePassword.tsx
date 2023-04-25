import React, { FC, FormEvent, useRef, useState } from 'react'
import Modal from '../../../../Components/Modal'
import { Button } from '@material-tailwind/react'
import Input from '../../../../Components/Input'
import Form from '../../../../Components/Form'
import Toast from '../../../../Components/Toast'

type TChangePasswordProps = {
  onClose?: () => void;
  open: boolean
  handleOpen: () => void;
};

export  const ChangePasswordModal: FC<TChangePasswordProps> = ({ onClose, open, handleOpen }) => {
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    console.log('ChangePasswordModal Отправляем данные формы')
    e.preventDefault()
  }
  const containerRef = useRef(null);

  return (
    <Modal
      title='Изменить пароль'
      open={open}
      handleOpen={handleOpen}
      className='game-modal'
    >
      <div ref={containerRef} className=" py-5 box-border ">

        {error && <Toast text={error} />}

        <div className="m-auto w-full max-w-md">
          <Form handlerSubmit={handleSubmit}>
            <Input
              name='oldPassword'
              type='password'
              label='Старый пароль'
              placeholder='Введите старый пароль'
              required={true}
            />
            <Input
              name='newPassword'
              type='password'
              label='Новый пароль'
              placeholder='Введите новый пароль'
              required={true}
            />
            <Input
              name='repeatPassword'
              type='password'
              label='Повторите пароль'
              placeholder='Повторите новый пароль'
              required={true}
            />
            <div className="flex justify-between w-full max-w-md ">
              <Button
                className='mt-2 mb-4'
                type='submit'
                onClick={onClose}
              >
                Отмена
              </Button>
              <Button
                className='mt-2 mb-4'
                type='submit'
              >
                Изменить
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
