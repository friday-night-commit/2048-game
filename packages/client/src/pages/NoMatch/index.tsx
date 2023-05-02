import { Button, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

import CardContainer from '../../Components/CardContainer';

export default function NoMatch() {
  const navigate = useNavigate();
  return (
    <CardContainer className='no-match-page'>
      <>
        <Typography variant='h1' color='blue-gray' className='text-center mb-8'>
          404
        </Typography>
        <Typography variant='h3' color='blue-gray' className='text-center mb-8'>
          Запрашиваемая страница не найдена
        </Typography>
        <Button
          className='mt-6 mb-4'
          fullWidth
          onClick={() => navigate(-1)}
        >
          Вернуться Назад
        </Button>
      </>
    </CardContainer>
  );
}
