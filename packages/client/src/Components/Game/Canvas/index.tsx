import React, { useEffect, useRef } from 'react';
import Engine from '../Engine';
import {
  openModalFailure,
  openModalSuccess,
} from '../../../store/slices/Modal';
import { useAppDispatch } from '../../../hooks/redux';

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
          openFailure
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
