import React, { useEffect, useRef } from 'react';
import { Engine } from '../Engine/Engine';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModalFailure, closeModalSuccess, openModalFailure, openModalSuccess } from '../../../store/slices/Modal';

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
>;

const Canvas: React.FC<CanvasProps> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');

      if (context) {
        const engine = new Engine(context, canvas.offsetWidth, 4, props.openModalSuccess, props.openModalFailure);

        return () => {
          engine.destroy();
        };
      }
    }
  }, []);

  return <canvas ref={canvasRef} width={props.width} height={props.width} />;
};

const mapStateToProps = (state: boolean) => ({
  isOpen: state
});

const mapDispatchToProps = {
  openModalSuccess,
  closeModalSuccess,
  openModalFailure,
  closeModalFailure
};

export default connect(mapStateToProps,mapDispatchToProps)(Canvas);

Canvas.propTypes = {
  width: PropTypes.number,
};
