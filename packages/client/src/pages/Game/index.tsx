import { Button, Typography } from '@material-tailwind/react'
import { FC, useState } from 'react'
import cx from 'classnames'
import { useNavigate } from 'react-router-dom'

import PageContainer from '../../Components/PageContainer'
import Game from '../../Components/Game'
import Modal from '../../Components/Modal'
import routes from '../../routes'

type TModalProps = {
  open: boolean
  handleOpen: () => void
}

const SuccessModal: FC<TModalProps> = ({open, handleOpen}) => {
  const navigate = useNavigate();

  return (
    <Modal
      title='Поздравляем! Цель достигнута!'
      open={open}
      handleOpen={handleOpen}
      className='game-modal'
    >
      <div className='text-center'>
        <Typography variant='h6' className='mb-8 font-normal'>
          <b>2048</b> в твоем зачете! Продолжай набирать очки и иди на рекорд, или найди свое имя в рейтинге самых успешных игроков!
        </Typography>
        <div>
          <Button className='game-button small mr-4' onClick={() => handleOpen()}>
            Продолжить игру
          </Button>
          <Button className='game-button small' onClick={() => navigate(routes.liderboardPage)}>
            Посмотреть рейтинг
          </Button>
        </div>
      </div>
    </Modal>
  );
}

const FailureModal: FC<TModalProps & {restart: () => void}> = ({ open, handleOpen, restart }) => {
  return (
    <Modal
      title='Ничего страшного! Попробуйте еще раз!'
      open={open}
      handleOpen={handleOpen}
      className='game-modal'
    >
      <div className='text-center'>
        <Typography variant='h6' className='mb-8 font-normal'>
          Ну что, еще поборемся за <b>2048</b>??
        </Typography>
        <div>
          <Button className='game-button small' onClick={() => restart()}>
            Начать сначала
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default function GamePage() {

  const [confirmRestart, setConfirmRestart] = useState(false);

  const handleRestart = () => {
    if (confirmRestart) {
      // restart();
      handleOpenSuccessModal();
    }
    setConfirmRestart(!confirmRestart);
  }

  const restart = () => {
    return;
  }

  const [openSuccessModal, setOpenFinalModal] = useState(false);
  const handleOpenSuccessModal = () => setOpenFinalModal(!openSuccessModal);

  const [openFailureModal, setOpenFailureModal] = useState(false);
  const handleOpenFailureModal = () => setOpenFailureModal(!openFailureModal);

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
              <Button className={cx('game-button', 'small', {alert: confirmRestart})} onClick={() => handleRestart()}>
                {confirmRestart ? 'Нажми еще раз' : 'Начать заново'}
              </Button>
            </div>
          </div>
        </div>
        <div className='game-page-container'>
          <Game />
          <SuccessModal open={openSuccessModal} handleOpen={handleOpenSuccessModal} />
          <FailureModal open={openFailureModal} handleOpen={handleOpenFailureModal} restart={restart} />
        </div>
      </>
    </PageContainer>
  )
}
