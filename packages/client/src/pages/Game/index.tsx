import { Button, Typography } from '@material-tailwind/react';
import React from 'react';

import PageContainer from '../../Components/PageContainer';
import Game from '../../Components/Game';
import RestartButton from './components/RestartButton';
import SuccessModal from './components/SuccessModal';
import FailureModal from './components/FailureModal';
import { useAppSelector } from '../../hooks/redux';
import { closeModalFailure, closeModalSuccess, openModalFailure, openModalSuccess } from '../../store/slices/Modal';
import { useDispatch } from 'react-redux';

export default function GamePage() {

  const modalSuccess = useAppSelector(store => store.modalSlice.isOpenSuccess);
  const modalFailure = useAppSelector(store => store.modalSlice.isOpenFailure);
  const dispatch = useDispatch();

  let successModal;
  let failModal;

  if(!modalSuccess) {
    successModal = () => dispatch(openModalSuccess());
  } else {
    successModal = () => dispatch(closeModalSuccess());
  }

  if(!modalFailure) {
    failModal = () => dispatch(openModalFailure());
  } else {
    failModal = () => dispatch(closeModalFailure());
  }


  return (
    <PageContainer>
      <>
        <div className='game-page-container large'>
          <div className='flex justify-between'>
            <div>
              <Typography
                variant='h6'
                className='mb-8 font-normal leading-[1.2]'>
                Используй <b>стрелки на клавиатуре</b>, чтобы двигать элементы.
                <br />
                Когда одинаковые элементы соединяются, они объединяются в один.
              </Typography>
            </div>
            <div>
              <Button className='game-button small mr-4' id='btn-step-back'>
                Шаг назад
              </Button>
              {/* [just for tests] open modal on restart click */}
              <RestartButton restart={ successModal } />
            </div>
          </div>
        </div>
        <div className='game-page-container'>
          <Game />
           <SuccessModal
            open={modalSuccess}
            handleOpen={ successModal }
          />
          <FailureModal
            open={ modalFailure }
            handleOpen={ failModal }
          />
        </div>
      </>
    </PageContainer>
  );
}
