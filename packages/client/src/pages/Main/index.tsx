import { Button, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';

import PageContainer from '../../Components/PageContainer';
import routes from '../../routes';

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <div className='text-center'>
        <Typography variant='h3' className='mb-8 font-normal'>
          Соединяй одинаковые элементы, пока не получишь 2048!
        </Typography>
        <Typography variant='h5' className='mb-8 font-normal'>
          {'Пользуйся подсказками, вдохновляйся '}
          <Link to={routes.leaderboardPage}>лучшими результатами</Link>
          {' и общайся на нашем '}
          <Link to={routes.forumPage}>форуме</Link>
          {'!'}
        </Typography>
        <Button
          className='game-button'
          onClick={() => navigate(routes.gamePage)}>
          START!
        </Button>
      </div>
    </PageContainer>
  );
}
