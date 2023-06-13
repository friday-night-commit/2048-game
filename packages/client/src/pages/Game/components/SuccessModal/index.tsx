import { Button, Typography } from '@material-tailwind/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../../Components/Modal';

import routes from '../../../../routes';
import { useAppDispatch } from '../../../../hooks/redux';
import { continuePlay } from '../../../../store/slices/Modal';

type ModalProps = {
  open: boolean;
  handleOpen: () => void;
};

const SuccessModal: FC<ModalProps> = ({ open, handleOpen }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleContinuePlay = () => dispatch(continuePlay());

  return (
    <Modal
      title='Поздравляем! Цель достигнута!'
      open={open}
      handleOpen={handleOpen}
      className='game-modal'>
      <div className='text-center'>
        <Typography variant='h6' className='mb-8 font-normal'>
          <b>2048</b> в твоем зачете! Продолжай набирать очки и иди на рекорд,
          или найди свое имя в рейтинге самых успешных игроков!
        </Typography>
        <div>
          <Button
            className='game-button small mr-4'
            onClick={ handleContinuePlay }>
            Продолжить игру
          </Button>
          <Button
            className='game-button small'
            onClick={() => navigate(`/${routes.leaderboardPage}`)}>
            Посмотреть рейтинг
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
