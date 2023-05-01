import { cloneDeep, isEqual } from 'lodash'
import { Cell } from '../Cell/Cell'

export class Engine {
  public context: CanvasRenderingContext2D;
  matrix: number[][]

  constructor(context: CanvasRenderingContext2D) {
    this.context = context
    this.matrix = this.getMatrix();
  }

  findCellHorizontalPosition ({cell, x, y, matrix, startCondition, endCondition, changeMethod}: any) {
    if (startCondition(x)) return
    const cellLine = matrix[y]
    let currentX = x
    let foundX = x

    do {
      currentX = changeMethod(currentX)

      const anotherCell = cellLine[currentX]

      if (anotherCell) {
        if (anotherCell.getValue() === cell.getValue()) {
          foundX = currentX
          cell.mergeCellValue()
          anotherCell.kill()
        }

        break
      } else {
        foundX = currentX
      }
    } while (endCondition(currentX))
    cell.setPosition({
      x: foundX,
      y
    })
  }

  generateRandom(min = 0, max = 100) {
    const difference = max - min;

    let rand = Math.random();

    rand = Math.floor(rand * difference);

    rand = rand + min;

    return rand;
  }

  createListeners(context: CanvasRenderingContext2D) {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      this.moveMatrixElements(listeners[(event as KeyboardEvent).keyCode], context);
    });
  }

  getEmptyMatrixCoordinates() {
    //type for emptycord ?
    return matrix.reduce((emptyCoordinates: any, matrixLine, y: number) => {
      matrixLine.forEach((elem: number, x: number) => {
        if (!elem) {
          emptyCoordinates.push({ x , y });
        }
      });

      return emptyCoordinates;
    }, []);
  }

  addCellToMatrix(cell: any): void {
    const { x, y } = cell.getPosition()
    matrix[y][x] = cell
  }

  removeCellFromMatrix(oldPosition: {x: number, y: number}): void {
    const { x, y } = oldPosition;
    matrix[y][x] = 0;
  }

  getPrevMatrix(matrix: number[][]): number[][]
  {
    return cloneDeep(matrix)
  }

  getMatrix(): number[][] {
    return matrix;
  }

  moveMatrixElements(moveDirection: string, context: CanvasRenderingContext2D) {
    const matrix = this.getMatrix();
    const oldMatrix = this.getPrevMatrix(matrix);


    if (moveDirection === "left") {
      for (let index = 1; index < matrix.length; index++) {
        matrix.forEach((matrixLine) => {
          const cell = matrixLine[index];
          if (cell) {
            cell.move(moveDirection);
          }
        });
      }
    } else if (moveDirection === "right") {
      for (let index = matrix.length - 2; index > -1; index--) {
        matrix.forEach((matrixLine) => {
          const cell = matrixLine[index];
          if (cell) {
            cell.move(moveDirection);
          }
        });
      }
    } else if (moveDirection === "up") {
      matrix.forEach((matrixLine) => {
        matrixLine.forEach((cell) => {
          if (cell) {
            cell.move(moveDirection);
          }
        });
      });
    } else if (moveDirection === "down") {
      for (let index = matrix.length - 2; index > -1; index--) {
        matrix[index].forEach((cell) => {
          if (cell) {
            cell.move(moveDirection);
          }
        });
      }
    }

    const isSameMatrix = isEqual(oldMatrix, cloneDeep(matrix));
    if (!isSameMatrix) {
      const newCell = new Cell(context, this);
      this.addCellToMatrix(newCell);
    }
  }
}

const listeners:Record<number, string> = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

const matrix = Array.from({ length: 4 }, () =>
  Array.from({ length: 4 }, () => 0)
);