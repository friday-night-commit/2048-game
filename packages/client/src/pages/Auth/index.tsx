import './style.scss'
import { FormEvent } from 'react'
import { Card, Input, Button, Typography } from '@material-tailwind/react'
import { Form } from '../../Components/Form'
import { Link } from 'react-router-dom'
import { routes } from '../../router'


export default function AuthPage() {

  const onSubmit = (e: FormEvent) => {
    const formData = new FormData(e.target as HTMLFormElement);
    // Temp console log
    for (const pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
  }
  }

  return (
    <div className="auth-page">
      <Card color="white" className='p-12 max-w-md w-full' shadow={false}>
        <Typography variant="h4" color="blue-gray" className="text-center mb-8">
          Авторизация
        </Typography>
        <Form
          className="w-full"
          handleSubmit={onSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Логин" name='login' />
            <Input type="password" size="lg" label="Пароль" name='password'/>
          </div>
          <Button className="mt-6 mb-4" fullWidth type="submit">
            Войти
          </Button>
          <Link
            to={routes.registrationPage}
            className="font-medium text-blue-500 transition-colors hover:text-blue-700 text-center block">
            Регистрация
          </Link>
        </Form>
      </Card>
    </div>
  )
}
