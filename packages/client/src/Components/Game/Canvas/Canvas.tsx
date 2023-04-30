import React, { useEffect, useRef } from 'react'
import createCell from '../utils/createCell'
import { addCellToMatrix } from '../utils/matrix'
import createListeners from '../utils/listeners'

type CanvasProps = React.DetailedHTMLProps<
  React.CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {draw: (context: CanvasRenderingContext2D) => void}

const Canvas:React.FC<CanvasProps> = ({draw, ...props}) => {
  const canvasRef = useRef<HTMLCanvasElement | null >(null);

  useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) {
        return
      }

      const context = canvas.getContext('2d')
      if (!context) {
        return
      }

      draw(context);

      function creatingBox (context: CanvasRenderingContext2D) {
        const newCell = createCell(context);
        addCellToMatrix(newCell);
        createListeners(context);
      }

      creatingBox(context);

    },[draw])

  return (
    <canvas ref={canvasRef} width={props.width} height={props.height}/>
  )
}

export default Canvas;