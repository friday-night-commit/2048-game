import { Button } from '@material-tailwind/react';
import { useState, useCallback, FC } from 'react';
import cx from 'classnames';
import { renewMatrix } from '../../../../store/slices/Modal';
import { useAppDispatch } from '../../../../hooks/redux';

const RestartButton: FC = () => {
  const [confirmRestart, setConfirmRestart] = useState(false);
  const dispatch = useAppDispatch();

  const handleRestart = useCallback(() => {
    if (confirmRestart) {
      dispatch(renewMatrix());
    }
    setConfirmRestart(!confirmRestart);
  }, [confirmRestart]);

  return (
    <Button
      className={cx('game-button', 'small', { alert: confirmRestart })}
      onClick={() => handleRestart()}>
      {confirmRestart ? 'Нажми еще раз' : 'Начать заново'}
    </Button>
  );
};

export default RestartButton;
