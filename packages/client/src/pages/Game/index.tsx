import { Button, Typography } from '@material-tailwind/react';
import { useCallback } from 'react';

import PageContainer from '../../Components/PageContainer';
import Game from '../../Components/Game';
import RestartButton from './components/RestartButton';

export default function GamePage() {
  const restart = useCallback(() => {
    return;
  }, []);

  return (
    <PageContainer>
      <>
        <div className='game-page-container large'>
          <div className='flex justify-between'>
            <div>
              <Typography variant='h6' className='mb-8 font-normal leading-[1.2]'>
                Используй <b>стрелки на клавиатуре</b>, чтобы двигать элементы.<br />
                Когда одинаковые элементы соединяются, они объединяются в один.
              </Typography>
            </div>
            <div>
              <Button className='game-button small mr-4' disabled>
                Шаг назад
              </Button>
              <RestartButton restart={restart} />
            </div>
          </div>
        </div>
        <div className='game-page-container'>
          <Game />
        </div>
      </>
    </PageContainer>
  );
}
