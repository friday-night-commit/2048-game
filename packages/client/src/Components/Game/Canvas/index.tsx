import React, { useEffect, useCallback, useRef } from 'react';
import Engine from '../Engine';
import { openModalFailure, openModalSuccess, wasRenewedMatrix } from '../../../store/slices/Modal';
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
  const isNewMatrix = useAppSelector(store => store.modalSlice.isNewMatrix);
  const isOpenModalSuccess = useAppSelector(store => store.modalSlice.isOpenFailure);
  const isOpenModalFail = useAppSelector(store => store.modalSlice.isOpenSuccess);
  const isContinuePlay = useAppSelector(store => store.modalSlice.isContinuePlay);

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
    dispatch(wasRenewedMatrix());
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
          isContinuePlay,
          isOpenModalSuccess,
          isOpenModalFail,
          addUserToLeaderboard
        );

        return () => {
          engine.destroy();
        };
      }
    }
  },[isNewMatrix]);

  return (
    <canvas ref={canvasRef} width={props.width} height={props.width} id='canvas-game'/>
  );
};

export default Canvas;
