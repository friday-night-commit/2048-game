import { Button, Typography } from '@material-tailwind/react';
import React, { FC, useCallback } from 'react';

import Modal from '../../../../Components/Modal';

type ModalProps = {
  open: boolean;
  handleOpen: () => void;
};

const FailureModal: FC<ModalProps> = ({ open, handleOpen }) => {
  const refreshPage = useCallback(
    function () {
      window.location.reload();
    },[]
  );

  return (
    <Modal
      title='Ничего страшного! Попробуйте еще раз!'
      open={open}
      handleOpen={handleOpen}
      className='game-modal'>
      <div className='text-center'>
        <Typography variant='h6' className='mb-8 font-normal'>
          Ну что, еще поборемся за <b>2048</b>??
        </Typography>
        <div>
          <Button className='game-button small' onClick={ refreshPage }>
            Начать сначала
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FailureModal;
