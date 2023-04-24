import { Input, Button, Typography } from '@material-tailwind/react'
import { Link, useNavigate } from 'react-router-dom'

import CardContainer from '../../Components/CardContainer'
import { Form } from '../../Components/Form'
import routes from '../../routes'


export default function AuthPage() {
  const navigate = useNavigate();

  const onSubmit = (formData: FormData) => {
    // Temp console log
    for (const pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
    }
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
          handleSubmit={onSubmit}>
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
