import React, { useEffect, useRef } from 'react';
import Engine from '../Engine';
import { openModalFailure, openModalSuccess, wasRenewedMatrix } from '../../../store/slices/Modal';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  width: number;
};

const Canvas:React.FC<CanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement | null >(null);
  const dispatch = useAppDispatch();
  const isNewMatrix = useAppSelector(store => store.modalSlice.isNewMatrix);
  const isOpenModalSuccess = useAppSelector(store => store.modalSlice.isOpenFailure);
  const isOpenModalFail = useAppSelector(store => store.modalSlice.isOpenSuccess);
  const isContinuePlay = useAppSelector(store => store.modalSlice.isContinuePlay);

  const openSuccess = () => dispatch(openModalSuccess());
  const openFailure = () => dispatch(openModalFailure());

  useEffect(() => {
    dispatch(wasRenewedMatrix());
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');

      const toggler = document.getElementById('btn-fullscreen-mode') as HTMLButtonElement;

      toggler.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          activateFullscreen(document.documentElement);
          document.documentElement.style.color = 'white';
          toggler.textContent = 'Выключить полноэкранный режим';
          toggler.style.border = '3px solid black';
        } else {
          deactivateFullscreen();
          toggler.textContent = 'Включить полноэкранный режим';
          toggler.style.border = 'none';
        }
      });

      const activateFullscreen = (element: HTMLElement) => {
        element.requestFullscreen();
      };

      const deactivateFullscreen = () => {
        document.exitFullscreen();
      };


      if (context) {
        const engine = new Engine(context, canvas.offsetWidth, 4, openSuccess, openFailure, isOpenModalSuccess, isOpenModalFail, isContinuePlay);

        return () => {
          engine.destroy();
        };
      }
    }

  },[isNewMatrix, isContinuePlay]);

  return (
    <canvas ref={canvasRef} width={props.width} height={props.width}/>
  );
};

export default Canvas;
