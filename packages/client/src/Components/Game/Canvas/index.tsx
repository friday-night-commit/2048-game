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

  const openSuccess = () => dispatch(openModalSuccess());
  const openFailure = () => dispatch(openModalFailure());

  useEffect(() => {
    dispatch(wasRenewedMatrix());
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');

      if (context) {
        const engine = new Engine(context, canvas.offsetWidth, 4, openSuccess, openFailure, isOpenModalSuccess, isOpenModalFail);

        return () => {
          engine.destroy();
        };


      }
    }

  },[isNewMatrix]);

  return (
    <canvas ref={canvasRef} width={props.width} height={props.width}/>
  );
};

export default Canvas;
