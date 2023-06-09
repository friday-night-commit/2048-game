import React, { useEffect, useCallback, useRef } from 'react';
import Engine from '../Engine';
import {
  openModalFailure,
  openModalSuccess,
} from '../../../store/slices/Modal';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import LeaderboardController from '../../../Controllers/LeaderboardController';

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  width: number;
};

const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useAppDispatch();

  const openSuccess = () => dispatch(openModalSuccess());
  const openFailure = () => dispatch(openModalFailure());

  const user = useAppSelector(store => store.userSlice.user);

  const addUserToLeaderboard = useCallback(
    async (score: number) => {
      if (user === undefined) return;

      return await LeaderboardController.addRecord({
        userId: user.id,
        userImage: user.avatar,
        score,
        userName: user.display_name || user.first_name,
        timestamp: Date.now(),
      });
    },
    [user]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');

      if (context) {
        const engine = new Engine(
          context,
          canvas.offsetWidth,
          4,
          openSuccess,
          openFailure,
          addUserToLeaderboard
        );

        return () => {
          engine.destroy();
        };
      }
    }
  }, []);

  return <canvas ref={canvasRef} width={props.width} height={props.width} />;
};

export default Canvas;
