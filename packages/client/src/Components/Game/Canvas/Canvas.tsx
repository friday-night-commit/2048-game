import React, { useEffect, useRef } from 'react'
import { Cell } from '../Cell/Cell'
import { Engine } from '../Engine/Engine'

type CanvasProps = React.DetailedHTMLProps<React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>

const Canvas:React.FC<CanvasProps> = ({ ...props}) => {
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


      const engine = new Engine(context);

      engine.drawGrid(context)

      const newCell = new Cell(context, engine);
      engine.addCellToMatrix(newCell);
      engine.createListeners(context);


    },[])

  return (
    <canvas ref={canvasRef} width={props.width} height={props.height}/>
  )
}

export default Canvas;