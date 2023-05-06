import React, { useEffect, useRef } from 'react'
import { Engine } from '../Engine/Engine'

type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>

const Canvas:React.FC<CanvasProps> = ({ ...props}) => {
  const canvasRef = useRef<HTMLCanvasElement | null >(null);

  useEffect(() => {
      const canvas = canvasRef.current
      if (canvas) {
        const context = canvas.getContext('2d')

        if (context) {
          const engine = new Engine(context);
          engine.init()
        }
      }

      return;
    },[])

  return (
    <canvas ref={canvasRef} width={props.width} height={props.height}/>
  )
}

export default Canvas;