import { Cell, Position } from '../Cell/Cell';
import { Utils } from '../../../../../../../../../../Desktop/кккк/Game/utils/Utils';

export type MatrixArray = (Cell | undefined)[][];

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export type DeltaTime = {
  x: number;
  y: number;
};

type AnimationCell = {
  cell: Cell,
  id: number,
  x: number;
  y: number; 
  newX: number;
  newY: number;
  value: number;
  newValue: number;
};

const MAX_VALUE = 2048;
export const PIXELS_PER_FRAME = 25;

const listeners:Record<number, Direction> = {
  37: Direction.LEFT,
  38: Direction.UP,
  39: Direction.RIGHT,
  40: Direction.DOWN
};

export class Engine {
  protected readonly context: CanvasRenderingContext2D;
  private maxValue: number = MAX_VALUE;
  private currentMaxNumber = 0;
  protected _matrix: MatrixArray;
  protected _historyMatrix: MatrixArray;

  private readonly _size: number;
  private readonly _canvasSize: number;
  private readonly eventListeners: ((event: KeyboardEvent) => void)[];
  private readonly cellSize: number;

  private newPosAnimate: Position;
  private oldPosAnimate: Position;
  private endAnimation: boolean;
  private requestId: number;
  private previousValue: number;
  private newValue: number;
  private deltaTime: DeltaTime;
  private timingAnimation: number;
  private cellAnimate?: AnimationCell[];
  private animationDirection: string;


  protected readonly fontText = '20px Arial';
  protected readonly border = 'rgb(143, 122, 102)';
  protected readonly widthBorder = 3;
  protected readonly background = 'white';
  public _openSuccess: () => void;
  public _openFailure: () => void;


  constructor(
    context: CanvasRenderingContext2D,
    canvasSize: number,
    size: number,
    openSuccess: ()=>void,
    openFailure: ()=>void,
  ) {
    this.context = context;
    this._openSuccess = openSuccess;
    this._openFailure = openFailure;

    this._matrix = Utils.generateMatrix();
    this._historyMatrix = Utils.generateMatrix();

    this._size = size;
    this._canvasSize = canvasSize;
    this.cellSize = canvasSize / size;
    this.endAnimation = false;
    this.requestId = 0;

    this.newPosAnimate = { x: 0, y: 0 };
    this.oldPosAnimate = { x: 0, y: 0 };
    this.previousValue = 2;
    this.newValue = 2;
    this.animationDirection = '';
    this.deltaTime = { x: 0, y: 0 };
    this.timingAnimation = 0;
    this.cellAnimate = [];

    this.eventListeners = [];

    this.animate = this.animate.bind(this);

    this.init();
  }

  init() {
    this.createListeners();
    this.render();
  }

  get size(): number {
    return this._size;
  }

  animate() {
    if(!this.cellAnimate) {
      return;
    }

    for (const cell of this.cellAnimate) {
      const animationCell = cell.cell;
      const newPosX = cell.newX;
      const newPosY = cell.newY;
      const value = cell.value;

      this.requestId = requestAnimationFrame(() => this.animate());

      switch (this.animationDirection) {
        case Direction.LEFT:
          if (cell.x && newPosX < cell.x) {
            animationCell.update(this.context, cell.x, cell.y, value, this.animationDirection, this.deltaTime.x);
            cell.x -= this.deltaTime.x;
          } else {
            this.endingAnimation(cell, this.deltaTime.x);
          }
          break;
        case Direction.RIGHT:
          if (cell.x <= this._canvasSize && newPosX > cell.x) {
            animationCell.update(this.context, cell.x, cell.y, value, this.animationDirection, this.deltaTime.x);
            cell.x += this.deltaTime.x;
          } else {
            this.endingAnimation(cell, this.deltaTime.x);
          }
          break;
        case Direction.UP:
          if (cell.y && newPosY < cell.y) {
            animationCell.update(this.context, cell.x, cell.y, value, this.animationDirection, this.deltaTime.y);
            cell.y -= this.deltaTime.y;
          } else {
            this.endingAnimation(cell, this.deltaTime.y);
          }
          break;
        case Direction.DOWN:
          if (cell.y<= this._canvasSize && newPosY >= cell.y) {
            animationCell.update(this.context, cell.x, cell.y, value, this.animationDirection, this.deltaTime.y);
            cell.y += this.deltaTime.y;
          } else {
            this.endingAnimation(cell, this.deltaTime.y);
          }
          break;
      }
    }

    this.drawGrid();
  }

  endingAnimation(cell: AnimationCell, delta: number): void {
      this.endAnimation = true;
      cell.cell.update(this.context, cell.newX, cell.newY, cell.newValue, this.animationDirection, delta);

      this.drawGrid();

      cancelAnimationFrame(this.requestId);
      return;
  }

  createListeners(): void {
    const listener = (event: KeyboardEvent) => {
      this.moveMatrixElements(listeners[(event as KeyboardEvent).keyCode]);
    };
    this.eventListeners.push(listener);

    const stepBackBtn = document.getElementById('btn-step-back');
    const historyBack = () => {
      this.render(true);
    };

    document.addEventListener('keydown', listener);
    if(stepBackBtn) stepBackBtn.addEventListener('click', historyBack);
  }

  generateCell(): void {
    let emptyCellExists = false;

    for(let i = 0; !emptyCellExists && i < this._matrix.length; i++){
      for(let j = 0; !emptyCellExists && j < this._matrix[i].length; j++){
         if(!this._matrix[i][j]) {
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
    let x: number,y: number;
    this.requestId = 0;
    if (newPosition) {
      requestAnimationFrame(this.animate);
      this.endAnimation = false;
      x = newPosition.x;
      y = newPosition.y;
    } else {
      this.endAnimation = true;
      x = cell.position.x;
      y = cell.position.y;
    }

    this._matrix[y][x] = cell;
  }

  copyCell(position: Position, value: number): Cell {
    return new Cell(position, this.cellSize, value);
  }

  removeCellFromMatrix(cell: Cell, oldPosition?: Position): void {
    let x: number,y: number;

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
        this.animationDirection = Direction.LEFT;
        newX--;
        break;
      case Direction.DOWN:
        this.animationDirection = Direction.DOWN;
        newY++;
        break;
      case Direction.RIGHT:
        this.animationDirection = Direction.RIGHT;
        newX++;
        break;
      case Direction.UP:
        this.animationDirection = Direction.UP;
        newY--;
        break;
      default:
        return;
    }

    if (newX < 0 || newX == this._size || newY < 0 || newY == this._size) {
      return;
    }

    const neighborCell = this._matrix[newY][newX];
    const copyCell = this.copyCell({ x, y },cell.value);

    if (neighborCell && this.checkCollision(neighborCell,copyCell)) {

      const increasedValue = cell.value * 2;

      if(increasedValue > this.currentMaxNumber) {
        this.currentMaxNumber = increasedValue;
      }

      this.removeCellFromMatrix(neighborCell);
      this.removeCellFromMatrix(cell);

      if(this.addedCellForAnimation(cell.id) === -1) {
        this.cellAnimate?.push(
          {
            x: x * this.cellSize,
            newX:newX * this.cellSize,
            y: y * this.cellSize,
            newY: newY * this.cellSize,
            cell: cell,
            value: cell.value,
            newValue: increasedValue,
            id: cell.id,
          }
        );
      } else {
        if(!this.cellAnimate) {
          return;
        }

        this.cellAnimate[this.addedCellForAnimation(cell.id)].newX = newX * this.cellSize;
        this.cellAnimate[this.addedCellForAnimation(cell.id)].newY = newY * this.cellSize;
        this.cellAnimate[this.addedCellForAnimation(cell.id)].newValue = increasedValue;
      }

      this.deltaTime.x = Math.abs( (x - newX) * PIXELS_PER_FRAME );
      this.deltaTime.y = Math.abs(( y - newY) * PIXELS_PER_FRAME );

      this.addCellToMatrix(this.copyCell({ x: newX, y: newY }, increasedValue ));

      this.moveCell(cell, direction);

    } else {

      if (this._matrix[newY][newX]) {
        return;
      }

      cell.position = { x: newX, y: newY };
      this.removeCellFromMatrix(cell, { x, y });

      if(this.addedCellForAnimation(cell.id) === -1) {
        this.cellAnimate?.push(
          {
            x: x * this.cellSize,
            newX:newX * this.cellSize,
            y: y * this.cellSize,
            newY: newY * this.cellSize,
            cell: cell,
            value: cell.value,
            newValue: cell.value,
            id: cell.id,
          }
        );
      } else {
        if(!this.cellAnimate) {
          return;
        }

        this.cellAnimate[this.addedCellForAnimation(cell.id)].newX = newX * this.cellSize;
        this.cellAnimate[this.addedCellForAnimation(cell.id)].newY = newY * this.cellSize;
        this.cellAnimate[this.addedCellForAnimation(cell.id)].newValue = cell.value;
      }

      this.deltaTime.x = Math.abs( (x - newX) * PIXELS_PER_FRAME );
      this.deltaTime.y = Math.abs(( y - newY) * PIXELS_PER_FRAME );

      this.addCellToMatrix(cell, { x: newX, y: newY });

      this.moveCell(cell, direction);
    }
  }

  addedCellForAnimation(currentId: number): number {
    if(this.cellAnimate) {
      return this.cellAnimate.findIndex(x => x.id === currentId);
    }
    return -1;
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

    if(j > 0 && myArray[i][j - 1]) {
      neighbors.push(<Cell>myArray[i][j - 1]);
    }
    if(myArray[i]?.length > j + 1 && myArray[i][j + 1]) {
      neighbors.push(<Cell>myArray[i][j + 1]);
    }
    if(myArray?.length > i + 1 && myArray[i + 1][j]) {
      neighbors.push(<Cell>myArray[i + 1][j]);
    }
    if(i > 0 && myArray[i - 1][j]) {
      neighbors.push(<Cell>myArray[i - 1][j]);
    }

    return neighbors;
  }

  moveMatrixElements(moveDirection: Direction): void {

    if (this.cellAnimate) {
      this.cellAnimate.length = 0;
    }

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
      if(this.currentMaxNumber >= this.maxValue) {
        this._openSuccess();
      } else {
        this._openFailure();
      }
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

  drawGrid (): void {
    const w = this._canvasSize;
    const h = this._canvasSize;
    const step = this.cellSize;

    this.context.beginPath();
    this.context.fillStyle = this.background;

    for (let x=0; x<=w; x+=step) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, h);
    }
    this.context.font = this.fontText;

    this.context.strokeStyle = this.border;
    this.context.lineWidth = this.widthBorder;
    this.context.stroke();

    this.context.beginPath();
    for (let y=0; y<=h; y+=step) {
      this.context.moveTo(0, y);
      this.context.lineTo(w, y);
    }
    this.context.strokeStyle = this.border;
    this.context.lineWidth = this.widthBorder;
    this.context.stroke();
  }

  clear() {
    this.context.clearRect(0, 0, this._canvasSize, this._canvasSize,);
  }

  render(history?: boolean) {
    this.clear();
    this.drawGrid();
    if(history) {
      this.renderCells(this._historyMatrix);
    } else {
      this.generateCell();
      this.renderCells(this._matrix);
    }
    this.drawGrid();
  }

  renderCells(matrix: MatrixArray){
    for (const row of matrix) {
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

