import { Button, Typography } from '@material-tailwind/react'
import { Link, useNavigate } from 'react-router-dom'

import PageContainer from '../../Components/PageContainer'
import { routes } from '../../router'

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
          <Link to={routes.liderboardPage}>лучшими результатами</Link>
          {' и общайся на нашем '}
          <Link to={routes.forumPage}>форуме</Link>
          {'!'}
        </Typography>
        <Button size='lg' className='game-button' onClick={() => navigate(routes.gamePage)}>
          START!
        </Button>
      </>
    </PageContainer>
  )
}
