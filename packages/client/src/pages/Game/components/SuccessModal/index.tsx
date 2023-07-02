import { Button, Typography } from '@material-tailwind/react';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../../Components/Modal';

import routes from '../../../../routes';
import { useAppDispatch } from '../../../../hooks/redux';
import { closeModalSuccess, renewMatrix } from '../../../../store/slices/Modal';

type ModalProps = {
  open: boolean;
  handleOpen: () => void;
};

const SuccessModal: FC<ModalProps> = ({ open, handleOpen }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const restart = useCallback(() => {
    dispatch(renewMatrix());
    dispatch(closeModalSuccess());
  }, []);

  const goToLeaderboard = useCallback(() => {
    dispatch(closeModalSuccess());
    navigate(`/${routes.leaderboardPage}`);
  }, []);

  return (
    <Modal
      title='Поздравляем! Цель достигнута!'
      open={open}
      handleOpen={handleOpen}
      className='game-modal'>
      <div className='text-center'>
        <Typography variant='h6' className='mb-8 font-normal'>
          <b>2048</b> в твоем зачете! Попробуй еще раз (за меньшее число шагов
          ;) ), или найди свое имя в рейтинге самых успешных игроков!
        </Typography>
        <div>
          <Button className='game-button small mr-4' onClick={restart}>
            Начать сначала
          </Button>
          <Button className='game-button small' onClick={goToLeaderboard}>
            Посмотреть рейтинг
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
