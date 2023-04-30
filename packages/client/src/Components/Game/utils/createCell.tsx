import getMatrix, { addCellToMatrix, getEmptyMatrixCoordinates, removeCellFromMatrix } from './matrix'
import generateRandom from './generateRandom'
import { drawCellElem, reDrawCellElem, removeCellElem } from '../../../utils/draw'
import findCellHorizontalPosition from './findCellHorizontalPosition'

export class Cell {
  private value: number
  private position: {x: number, y:number}
  public id: number;
  public cellEl: CanvasRenderingContext2D;
  public context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.id = generateRandom(0,99999)
    this.value = getValue()
    this.position = getCellPosition()
    this.cellEl = drawCellElem(this.position, this.context, this.value);
  }

  getValue() {
    return this.value
  }

  getPosition() {
    return this.position
  }

  getId() {
    return this.id;
  }

  setPosition(newPosition: {x: number, y:number}) {
    const oldPosition = this.position
    this.position = newPosition
    this.cellEl = reDrawCellElem(oldPosition, this.position, this.context, this.value)
    addCellToMatrix(this)
    removeCellFromMatrix(oldPosition)
  }

  kill() {
    this.cellEl = removeCellElem(this.position, this.context)
  }

  mergeCellValue() {
    this.value = this.value * 2;
    //const shouldChangeColor;
    //if 2048 win?
  }

  move(moveDirection: string)
  {
    const matrix = getMatrix();
    const { x, y } = this.getPosition();

    switch (moveDirection) {
      case "left": {
        findCellHorizontalPosition({
          cell: this,
          x,
          y,
          matrix,
          startCondition: (x: number) => !x,
          endCondition: (currentX: number) => currentX > 0,
          changeMethod: (currentX: number) => currentX - 1
        });
        break;
      }
      case "right": {
        findCellHorizontalPosition({
          cell: this,
          x,
          y,
          matrix,
          startCondition: (x: number) => x === 3,
          endCondition: (currentX: number) => currentX < 3,
          changeMethod: (currentX: number) => currentX + 1
        });
        break;
      }
      default:
        return;
    }
  }
}

function getCellPosition() {
  const emptyCoordinates = getEmptyMatrixCoordinates()
  const randomCoordinateIndex = generateRandom(0, emptyCoordinates.length - 1)

  return emptyCoordinates[randomCoordinateIndex]
}

function getValue() {
  return Math.random() > 0.75 ? 4 : 2
}

export default function createCell(context: CanvasRenderingContext2D): Cell
{
  return new Cell(context)
}