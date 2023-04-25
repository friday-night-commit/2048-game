import { Card, Input, Button, Typography } from '@material-tailwind/react'
import { Form } from '../Form'
import { Link } from 'react-router-dom'
import { routes } from '../../router'
import { FormEvent, useState } from 'react'

function AuthForm() {
  const [formInputsData, setFormInputsData] = useState({
    login: '',
    password: '',
  })

  const onSubmit = () => {
    // Temp console log
    console.log(formInputsData);
  }

  return (
    <Card color="white" className="p-12 max-w-md w-full" shadow={false}>
      <Typography variant="h4" color="blue-gray" className="text-center mb-8">
        Авторизация
      </Typography>
      <Form className="w-full" handleSubmit={onSubmit}>
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Логин"
            name="login"
            onChange={event => {
              setFormInputsData({
                ...formInputsData,
                login: event.target.value,
              })
            }}
          />
          <Input
            type="password"
            size="lg"
            label="Пароль"
            name="password"
            onChange={event => {
              setFormInputsData({
                ...formInputsData,
                password: event.target.value,
              })
            }}
          />
        </div>
        <Button className="mt-6 mb-4" fullWidth type="submit">
          Войти
        </Button>
        <Link
          to={routes.registerPage}
          className="font-medium text-blue-500 transition-colors hover:text-blue-700 text-center block">
          Регистрация
        </Link>
      </Form>
    </Card>
  )
}

export default AuthForm
