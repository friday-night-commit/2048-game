import { Engine } from '../Engine/Engine'

export type Position = {
  x: number,
  y: number
}


export class Cell {
  protected readonly value: number
  protected position: Position
  protected context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D, position: Position) {
    // TODO Игра управляет ячейками, сама ячейка не знает ничего, кроме значения и позиции
    this.context = context;
    this.value = this.generateValue();
    this.position = position;
  }

  getValue(): number {
    return this.value
  }

  setPosition(newPosition: Position): void {
    this.position = newPosition;
  }

  getPosition(): Position {
    return this.position
  }

  private generateValue(): number {
    return Math.random() > 0.75 ? 4 : 2
  }

  render() {
    this.context.fillStyle = 'gray';
    const { x, y } = this.getPosition()
    this.context.fillRect(x*75,y*75,75,75);
    this.context.font = "20px Arial";
    this.context.textBaseline = 'middle';
    this.context.fillStyle = 'black';
    this.context.textAlign = 'center';
    this.context.fillText(String(this.value), x*75+37, y*75+35);
  }

  // getCellPosition() {
  //   const emptyCoordinates = this.engine.getEmptyMatrixCoordinates()
  //   const randomCoordinateIndex = this.engine.generateRandom(0, emptyCoordinates.length - 1)
  //
  //   return emptyCoordinates[randomCoordinateIndex]
  // }

  // setPosition(newPosition: Position) {
  //   const oldPosition = this.position
  //   this.position = newPosition
  //   this.cellEl = this.engine.reDrawCellElem(oldPosition, this.position, this.context, this.value)
  //   this.engine.addCellToMatrix(this)
  //   this.engine.removeCellFromMatrix(oldPosition)
  // }
  //

  //
  // move(moveDirection: Direction)
  // {
  //   const matrix = this.getMatrix();
  //   const { x, y } = this.getPosition();
  //
  //   switch (moveDirection) {
  //     case "left": {
  //       this.engine.findCellHorizontalPosition({
  //         cell: this,
  //         x,
  //         y,
  //         matrix,
  //         startCondition: (x: number) => !x,
  //         endCondition: (currentX: number) => currentX > 0,
  //         changeMethod: (currentX: number) => currentX - 1
  //       });
  //       break;
  //     }
  //     case "right": {
  //       this.engine.findCellHorizontalPosition({
  //         cell: this,
  //         x,
  //         y,
  //         matrix,
  //         startCondition: (x: number) => x === 3,
  //         endCondition: (currentX: number) => currentX < 3,
  //         changeMethod: (currentX: number) => currentX + 1
  //       });
  //       break;
  //     }
  //    }
  //}
}