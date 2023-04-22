import { Button, Typography } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

import CardContainer from '../../Components/CardContainer'

export default function ServerError() {
  const navigate = useNavigate()
  return (
    <CardContainer className='server-error-page'>
      <Typography variant='h1' color='blue-gray' className='text-center mb-8'>
        500
      </Typography>
      <Typography variant='h3' color='blue-gray' className='text-center mb-8'>
        Ooooops!
      </Typography>
      <Typography variant='h6' color='blue-gray' className='text-center mb-8'>
        Мы уже работаем над устранением технических неполадок
      </Typography>
      <Button
        className='mt-6 mb-4'
        fullWidth
        onClick={() => navigate(-1)}
      >
        Вернуться Назад
      </Button>
    </CardContainer>
  )
}
