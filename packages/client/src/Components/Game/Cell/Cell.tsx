import { Engine } from '../Engine/Engine'

type Position = {
  x: number,
  y: number
}

enum Direction {
  TOP = "TOP",
  BOTTOM = "BOTTOM"
}


export class Cell {
  private readonly value: number
  private readonly position: Position
  // public id: number;
  // public cellEl: CanvasRenderingContext2D;
  public context: CanvasRenderingContext2D;
  // public matrix: number[][]
  // public engine: Engine

  constructor(context: CanvasRenderingContext2D) {
    // TODO Игра управляет ячейками, сама ячейка не знает ничего, кроме значения и позиции
    this.context = context;
    // this.engine = engine;
    // this.id = engine.generateRandom(0,999999);
    // this.matrix = engine.getMatrix();
    this.value = this.generateValue()
    // this.position = this.getCellPosition()
    // this.cellEl = this.engine.drawCellElem(this.position, this.context, this.value);
  }

  getMatrix(): number[][] {
    return this.matrix;
  }

  getValue(): number {
    return this.value
  }

  getPosition(): { x: number, y: number } {
    return this.position
  }

  getId(): number {
    return this.id;
  }

  getCellPosition() {
    const emptyCoordinates = this.engine.getEmptyMatrixCoordinates()
    const randomCoordinateIndex = this.engine.generateRandom(0, emptyCoordinates.length - 1)

    return emptyCoordinates[randomCoordinateIndex]
  }

  setPosition(newPosition: Position) {
    const oldPosition = this.position
    this.position = newPosition
    this.cellEl = this.engine.reDrawCellElem(oldPosition, this.position, this.context, this.value)
    this.engine.addCellToMatrix(this)
    this.engine.removeCellFromMatrix(oldPosition)
  }

  private generateValue(): number {
    return Math.random() > 0.75 ? 4 : 2
  }

  kill() {
    this.cellEl = this.engine.removeCellElem(this.position, this.context)
  }

  mergeCellValue() {
    this.value = this.value * 2;
    //const shouldChangeColor;
    //if 2048 win?
  }



  move(moveDirection: Direction)
  {
    const matrix = this.getMatrix();
    const { x, y } = this.getPosition();

    switch (moveDirection) {
      case "left": {
        this.engine.findCellHorizontalPosition({
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
        this.engine.findCellHorizontalPosition({
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
    }
  }
}