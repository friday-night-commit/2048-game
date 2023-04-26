import { Input, Button, Typography } from '@material-tailwind/react'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../../Components/Form'
import CardContainer from '../../Components/CardContainer'
import routes from '../../routes'
import { FormEvent } from 'react'


export default function AuthPage() {
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    navigate(routes.mainPage);
  }

  return (
    <CardContainer className='auth-page'>
      <>
        <Typography variant='h4' color='blue-gray' className='text-center mb-8'>
          Авторизация
        </Typography>
        <Form
          className="w-full"
          handlerSubmit={onSubmit}>
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Логин" name='login' />
            <Input type="password" size="lg" label="Пароль" name='password'/>
          </div>
          <Button className='mt-6 mb-4' fullWidth type='submit'>
            Войти
          </Button>
          <Link
            to={routes.registerPage}
            className='font-medium text-blue-500 transition-colors hover:text-blue-700 text-center block'>
            Регистрация
          </Link>
        </Form>
      </>
    </CardContainer>
  )
}
