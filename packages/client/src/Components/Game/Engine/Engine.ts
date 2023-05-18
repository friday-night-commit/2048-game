import { Cell, Position } from '../Cell/Cell';
import { Utils } from '../utils/Utils';

export type MatrixArray = (Cell | undefined)[][];

enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

const MAX_VALUE = 2048;

const listeners: Record<number, Direction> = {
  37: Direction.LEFT,
  38: Direction.UP,
  39: Direction.RIGHT,
  40: Direction.DOWN,
};

export class Engine {
  protected readonly context: CanvasRenderingContext2D;
  private maxValue: number = MAX_VALUE;
  private currentMaxNumber = 0;
  protected _matrix: MatrixArray;
  private readonly _size: number;
  private readonly _canvasSize: number;
  private readonly eventListeners: ((event: KeyboardEvent) => void)[];
  private readonly cellSize: number;

  protected readonly fontText = '20px Arial';
  protected readonly border = 'rgb(143, 122, 102)';
  protected readonly widthBorder = 3;
  protected readonly background = 'white';

  constructor(
    context: CanvasRenderingContext2D,
    canvasSize: number,
    size: number
  ) {
    this.context = context;
    this._matrix = Utils.generateMatrix();
    this._size = size;
    this._canvasSize = canvasSize;
    this.cellSize = canvasSize / size;

    this.eventListeners = [];

    this.init();
  }

  init() {
    this.createListeners();
    this.render();
  }

  get size(): number {
    return this._size;
  }

  createListeners(): void {
    const listener = (event: KeyboardEvent) => {
      this.moveMatrixElements(listeners[(event as KeyboardEvent).keyCode]);
    };
    this.eventListeners.push(listener);
    document.addEventListener('keydown', listener);
  }

  generateCell(): void {
    let emptyCellExists = false;

    for (let i = 0; !emptyCellExists && i < this._matrix.length; i++) {
      for (let j = 0; !emptyCellExists && j < this._matrix[i].length; j++) {
        if (!this._matrix[i][j]) {
          emptyCellExists = true;
        }
      }
    }

    if (emptyCellExists) {
      const randomCoordinates = this.generateRandomCellPosition();
      const newCell = new Cell(randomCoordinates, this.cellSize);
      this.addCellToMatrix(newCell);
    }
  }

  generateRandomCellPosition(): Position {
    const randomX = Utils.generateRandom(0, this._size);
    const randomY = Utils.generateRandom(0, this._size);
    if (this._matrix[randomY][randomX]) {
      return this.generateRandomCellPosition();
    }
    return { x: randomX, y: randomY };
  }

  addCellToMatrix(cell: Cell, newPosition?: Position): void {
    let x: number, y: number;

    if (newPosition) {
      x = newPosition.x;
      y = newPosition.y;
    } else {
      x = cell.position.x;
      y = cell.position.y;
    }

    this._matrix[y][x] = cell;
  }

  copyCell(position: Position, value: number): Cell {
    return new Cell(position, this.cellSize, value);
  }

  removeCellFromMatrix(cell: Cell, oldPosition?: Position): void {
    let x: number, y: number;

    if (oldPosition) {
      x = oldPosition.x;
      y = oldPosition.y;
    } else {
      x = cell.position.x;
      y = cell.position.y;
    }

    this._matrix[y][x] = undefined;
  }

  moveCell(cell: Cell, direction: Direction): void {
    const { x, y } = cell.position;
    let newX = x;
    let newY = y;

    switch (direction) {
      case Direction.LEFT:
        newX--;
        break;
      case Direction.DOWN:
        newY++;
        break;
      case Direction.RIGHT:
        newX++;
        break;
      case Direction.UP:
        newY--;
        break;
      default:
        return;
    }

    if (newX < 0 || newX == this._size || newY < 0 || newY == this._size) {
      return;
    }

    const neighborCell = this._matrix[newY][newX];
    const copyCell = this.copyCell({ x, y }, cell.value);

    if (neighborCell && this.checkCollision(neighborCell, copyCell)) {
      const increasedValue = cell.value * 2;

      if (increasedValue > this.currentMaxNumber) {
        this.currentMaxNumber = increasedValue;
      }

      this.removeCellFromMatrix(neighborCell);
      this.removeCellFromMatrix(cell);

      this.addCellToMatrix(this.copyCell({ x: newX, y: newY }, increasedValue));

      this.moveCell(cell, direction);
    } else {
      if (this._matrix[newY][newX]) {
        return;
      }

      cell.position = { x: newX, y: newY };
      this.removeCellFromMatrix(cell, { x, y });
      this.addCellToMatrix(cell, { x: newX, y: newY });

      this.moveCell(cell, direction);
    }
  }

  checkCollision(cell1: Cell, cell2: Cell): boolean {
    return cell1.value === cell2.value;
  }

  checkCollisionNeighbors(cell: Cell): boolean {
    const { x: currentX, y: currentY } = cell.position;
    const copyCell = this.copyCell(cell.position, cell.value);

    return this.findingNeighbors(this._matrix, currentY, currentX).every(
      neighbor => {
        copyCell.position = neighbor.position;
        return !this.checkCollision(copyCell, neighbor);
      }
    );
  }

  findingNeighbors(myArray: MatrixArray, i: number, j: number): Cell[] {
    const neighbors: Cell[] = [];

    if (j > 0 && myArray[i][j - 1]) {
      neighbors.push(<Cell>myArray[i][j - 1]);
    }
    if (myArray[i]?.length > j + 1 && myArray[i][j + 1]) {
      neighbors.push(<Cell>myArray[i][j + 1]);
    }
    if (myArray?.length > i + 1 && myArray[i + 1][j]) {
      neighbors.push(<Cell>myArray[i + 1][j]);
    }
    if (i > 0 && myArray[i - 1][j]) {
      neighbors.push(<Cell>myArray[i - 1][j]);
    }

    return neighbors;
  }

  moveMatrixElements(moveDirection: Direction): void {
    switch (moveDirection) {
      case Direction.UP:
      case Direction.LEFT:
        for (const row of this._matrix) {
          for (const cell of row) {
            if (cell) {
              this.moveCell(cell, moveDirection);
            }
          }
        }
        break;

      case Direction.DOWN:
      case Direction.RIGHT:
        for (
          let rowNumber = this._matrix.length - 1;
          rowNumber >= 0;
          rowNumber--
        ) {
          for (
            let colNumber = this._matrix[rowNumber].length - 1;
            colNumber >= 0;
            colNumber--
          ) {
            const cell = this._matrix[rowNumber][colNumber];
            if (cell) {
              this.moveCell(cell, moveDirection);
            }
          }
        }
        break;
      default:
        return;
    }
    if (!this.checkEndGame()) {
      this.render();
    } else {
      alert('Игра окончена!');
    }
  }

  checkEndGame(): boolean {
    //Набралось ли максимальное количество баллов?
    if (this.currentMaxNumber < this.maxValue) {
      // Существуют ли пустые ячейки?
      for (const row of this._matrix) {
        for (const cell of row) {
          if (!cell) {
            return false;
          }
        }
      }

      // Проверки коллизий
      for (const row of this._matrix) {
        for (const cell of row) {
          if (cell && !this.checkCollisionNeighbors(cell)) {
            return false;
          }
        }
      }
    }

    return true;
  }

  drawGrid(): void {
    const w = this._canvasSize;
    const h = this._canvasSize;
    const step = this.cellSize;

    this.context.beginPath();
    this.context.fillStyle = this.background;

    for (let x = 0; x <= w; x += step) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, h);
    }
    this.context.font = this.fontText;

    this.context.strokeStyle = this.border;
    this.context.lineWidth = this.widthBorder;
    this.context.stroke();

    this.context.beginPath();
    for (let y = 0; y <= h; y += step) {
      this.context.moveTo(0, y);
      this.context.lineTo(w, y);
    }
    this.context.strokeStyle = this.border;
    this.context.lineWidth = this.widthBorder;
    this.context.stroke();
  }

  clear() {
    this.context.clearRect(0, 0, this._canvasSize, this._canvasSize);
  }

  render() {
    this.clear();
    this.drawGrid();
    this.generateCell();
    this.renderCells();
  }

  renderCells() {
    for (const row of this._matrix) {
      for (const cell of row) {
        if (cell) {
          cell.render(this.context);
        }
      }
    }
  }

  destroy() {
    this.removeListeners();
  }

  removeListeners() {
    for (const listener of this.eventListeners) {
      document.removeEventListener('keydown', listener);
    }
  }
}
