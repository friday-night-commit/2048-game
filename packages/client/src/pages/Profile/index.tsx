import { Form } from '../../Components/Form'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../models/enums'
import { FormEvent } from 'react'
import Input from '../../Components/Input/Input'
import { Button, Card, Typography } from '@material-tailwind/react'
import './profile.scss'
import Avatar from '../../Components/Avatar'

export enum UserFields {
  first_name = 'first_name',
  second_name = 'second_name',
  login = 'login',
  email = 'email',
  phone = 'phone',
  password = 'password',
  avatar = 'avatar',
}

export default function ProfilePage() {
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Отправляем данные формы', e.target)
    navigate(ROUTES.mainPage)
  }

  return (
    <div className='profile-page'>
      <Card color='white' className='p-12 max-w-md w-full' shadow={false}>
        <Typography variant='h3' className='text-center mb-8'>
          Настройки профиля
        </Typography>
        <div className='mb-8 flex justify-center'>
          <Avatar alert='photo' />
        </div>
        <Form className='w-full'
              handlerSubmit={handleSubmit}>
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
          <Input
            name={UserFields.password}
            type='password'
            placeholder='Введите новый пароль'
            required={true}
          />

          <div className='mb-4 flex flex-col'>
            <Button
              className='mt-6 mb-4'
              type='submit'
            >
              Сохранить
            </Button>
            <Button
              className='mt-2 mb-4'
              onClick={() => navigate(-1)}
            >
              Вернуться Назад
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}
