import React, { useCallback, useEffect, useRef } from 'react';
import Engine from '../Engine';
import { openModalFailure, openModalSuccess, setRecord, wasRenewedMatrix } from '../../../store/slices/Modal';
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
  const maxValue = useAppSelector(store => store.modalSlice.maxValue);
  const newMatrix = maxValue.newMatrix;

  const openSuccess = () => dispatch(openModalSuccess());
  const openFailure = () => dispatch(openModalFailure());

  const handleSubmit = useCallback((maxScore: number) => {
    if (maxScore > maxValue.maxValue) {
      dispatch(setRecord({ maxValue: maxScore } ));
    }
  }, []);

  useEffect(() => {
    dispatch(wasRenewedMatrix());
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');

      if (context) {
        const engine = new Engine(context, canvas.offsetWidth, 4, openSuccess, openFailure, handleSubmit);

        return () => {
          engine.destroy();
        };


      }
    }

  },[newMatrix]);

  return (
    <canvas ref={canvasRef} width={props.width} height={props.width}/>
  );
};

export default Canvas;
