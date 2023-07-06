import { Button } from '@material-tailwind/react';

import fullscreenIcon from '../../../../assets/images/full-screen.svg';

export default function FullScreenButton() {
  return (
    <Button
      className='game-button small fullscreen mr-4'
      id='btn-fullscreen-mode'
      style={{ width: 'auto' }}>
      <img width='20' src={fullscreenIcon} alt='Включить полноэкранный режим' />
    </Button>
  );
}
