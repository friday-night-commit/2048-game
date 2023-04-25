import { Button, Typography } from '@material-tailwind/react'
import { useState } from 'react'
import cx from 'classnames'
import { useNavigate } from 'react-router-dom'

import PageContainer from '../../Components/PageContainer'
import Game from '../../Components/Game'
import Modal from '../../Components/Modal'
import routes from '../../routes'

export default function GamePage() {
  const navigate = useNavigate();

  const [confirmRestart, setConfirmRestart] = useState(false);
  const [openFinalModal, setOpenFinalModal] = useState(false);

  const handleOpenFinalModal = () => setOpenFinalModal(!openFinalModal);

  const handleRestart = () => {
    if (confirmRestart) {
      // restart();
      handleOpenFinalModal();
    }
    setConfirmRestart(!confirmRestart);
  }

  const restart = () => {
    return;
  }

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
          <Modal
            title='Поздравляем! Цель достигнута!'
            open={openFinalModal}
            handleOpen={handleOpenFinalModal}
            className='game-modal'
          >
            <div className='text-center'>
              <Typography variant='h6' className='mb-8 font-normal'>
                <b>2048</b> в твоем зачете! Продолжай набирать очки и иди на рекорд, или найди свое имя в рейтинге самых успешных игроков!
              </Typography>
              <div>
                <Button className='game-button small mr-4' onClick={() => handleOpenFinalModal()}>
                  Продолжить игру
                </Button>
                <Button className='game-button small' onClick={() => navigate(routes.liderboardPage)}>
                  Посмотреть рейтинг
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </>
    </PageContainer>
  )
}
