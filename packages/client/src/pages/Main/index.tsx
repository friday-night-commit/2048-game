import { Button, Typography } from '@material-tailwind/react'
import { Link, useNavigate } from 'react-router-dom'

import PageContainer from '../../Components/PageContainer'
import { ROUTES } from '../../models/enums'

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <>
        <Typography variant='h3' className='mb-8 font-normal'>
          Соединяй одинаковые элементы, пока не получишь 2048!
        </Typography>
        <Typography variant='h5' className='mb-8 font-normal'>
          {'Пользуйся подсказками, вдохновляйся '}
          <Link to={ROUTES.liderboardPage}>лучшими результатами</Link>
          {' и общайся на нашем '}
          <Link to={ROUTES.forumPage}>форуме</Link>
          {'!'}
        </Typography>
        <Button size='lg' className='game-button' onClick={() => navigate(ROUTES.gamePage)}>
          START!
        </Button>
      </>
    </PageContainer>
  )
}
