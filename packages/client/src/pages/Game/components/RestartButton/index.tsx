import { Button } from '@material-tailwind/react';
import { useState, useCallback, FC } from 'react';
import cx from 'classnames';

type RestartButtonProps = {
  restart: () => void
};

const RestartButton: FC<RestartButtonProps> = ({ restart }) => {
  const [confirmRestart, setConfirmRestart] = useState(false);

  const handleRestart = useCallback(() => {
    if (confirmRestart) {
      restart();
    }
    setConfirmRestart(!confirmRestart);
  }, [confirmRestart]);

  return (
    <Button className={cx('game-button', 'small', { alert: confirmRestart })} onClick={() => handleRestart()}>
      {confirmRestart ? 'Нажми еще раз' : 'Начать заново'}
    </Button>
  );
};

export default RestartButton;
