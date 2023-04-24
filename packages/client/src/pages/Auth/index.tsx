import { Card, Input, Button, Typography } from '@material-tailwind/react'
import { FormEvent } from 'react'
import { Form } from '../../Components/Form'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../../models/enums'
import './style.module.scss'


export default function AuthPage() {
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log('Отправляем данные формы', e.target);
    navigate(ROUTES.mainPage);
  }

  return (
    <div className='auth-page'>
      <Card color='white' className='p-12 max-w-md w-full' shadow={false}>
        <Typography variant='h4' color='blue-gray' className='text-center mb-8'>
          Авторизация
        </Typography>
        <Form
          className='w-full'
          handlerSubmit={handleLogin}>
          <div className='mb-4 flex flex-col gap-6'>
            <Input size='lg' label='Логин' name='login' />
            <Input type='password' size='lg' label='Пароль' name='password'/>
          </div>
          <Button className='mt-6 mb-4' fullWidth type='submit'>
            Войти
          </Button>
          <Link
            to={ROUTES.registrationPage}
            className='font-medium text-blue-500 transition-colors hover:text-blue-700 text-center block'>
            Регистрация
          </Link>
        </Form>
      </Card>
    </div>
  )
}
