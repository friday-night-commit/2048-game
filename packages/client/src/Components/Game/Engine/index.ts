import Cell, { Position } from '../Cell';
import { Utils } from '../Utils';
import { AudioPlayer, SoundNames } from '../../../WebAPI/AudioPlayer';

export type MatrixArray = (Cell | undefined)[][];
export type HistoryMatrixArray = { stepIndex: number, historyMatrix: MatrixArray }[];


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
  cell: Cell;
  id: number;
  x: number;
  y: number;
  newX: number;
  newY: number;
  value: number;
  newValue: number;
};

const LISTENERS: Record<number, Direction> = {
  37: Direction.LEFT,
  38: Direction.UP,
  39: Direction.RIGHT,
  40: Direction.DOWN,
};

export default class Engine {
  static FINAL_SCORE = 2048;
  static PIXELS_PER_FRAME = 25;
  static MAX_STEP_BACK = 5;

  protected readonly context: CanvasRenderingContext2D;
  private _score = 0;
  private _matrix: MatrixArray;
  private readonly _size: number;
  private readonly _canvasSize: number;
  private readonly eventListeners: ((event: KeyboardEvent) => void)[];
  private readonly cellSize: number;

  private _historyMatrix: HistoryMatrixArray;
  private _stepsBack: number;
  private _isHistoryMove: boolean;
  private historyBack: () => void;
  private historyBtn: HTMLButtonElement;
  private _wasMadeHistoryStep: number;

  private requestId: number;
  private deltaTime: DeltaTime;
  private cellAnimate?: AnimationCell[];
  private animationDirection: string;

  protected readonly fontText = '20px Arial';
  protected readonly border = 'rgb(143, 122, 102)';
  protected readonly widthBorder = 3;
  protected readonly background = 'rgb(187, 173, 160)';

  public _openSuccess: () => void;
  public _openFailure: () => void;
  private _openModalSuccess: boolean;
  private _openModalFail: boolean;
  private _isContinuePlay: boolean;
  private readonly _addUserToLeaderboard: (score: number) => void;

  private readonly audioPlayer: AudioPlayer;

  constructor(
    context: CanvasRenderingContext2D,
    canvasSize: number,
    size: number,
    openSuccess: () => void,
    openFailure: () => void,
    openModalSuccess: boolean,
    openModalFail: boolean,
    isContinuePlay: boolean,
    addUserToLeaderboard: (score: number) => void
  ) {

    if (size < 2) {
      throw Error('Invalid size for cell matrix');
    }

    this.context = context;
    this._openSuccess = openSuccess;
    this._openFailure = openFailure;
    this._openModalSuccess = openModalSuccess;
    this._openModalFail = openModalFail;
    this._isContinuePlay = isContinuePlay;

    this._addUserToLeaderboard = addUserToLeaderboard;

    this._matrix = Utils.generateMatrix(size);
    this._historyMatrix = [];
    this._stepsBack = 0;
    this._isHistoryMove = false;
    this.historyBack = this.historyBackStep.bind(this);
    this.historyBtn = document.getElementById('btn-step-back') as HTMLButtonElement;
    this._wasMadeHistoryStep = 0;

    this._size = size;
    this._canvasSize = canvasSize;
    this.cellSize = canvasSize / size;

    this.requestId = 0;

    this.animationDirection = '';
    this.deltaTime = { x: 0, y: 0 };
    this.cellAnimate = [];

    this.eventListeners = [];

    this.animate = this.animate.bind(this);

    this.eventListeners = [];
    this.audioPlayer = new AudioPlayer();

    this.init();
  }

  init() {
    this.historyBtn.disabled = true;
    this.createListeners();
    this.render();
    this.addHistory();
    this.audioPlayer.init().then();
  }

  get size(): number {
    return this._size;
  }

  animate() {
    if (!this.cellAnimate) {
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
            animationCell.update(
              this.context,
              cell.x,
              cell.y,
              value,
              this.animationDirection,
              this.deltaTime.x
            );
            cell.x -= this.deltaTime.x;
          } else {
            this.endingAnimation(cell, this.deltaTime.x);
          }
          break;
        case Direction.RIGHT:
          if (cell.x <= this._canvasSize && newPosX > cell.x) {
            animationCell.update(
              this.context,
              cell.x,
              cell.y,
              value,
              this.animationDirection,
              this.deltaTime.x
            );
            cell.x += this.deltaTime.x;
          } else {
            this.endingAnimation(cell, this.deltaTime.x);
          }
          break;
        case Direction.UP:
          if (cell.y && newPosY < cell.y) {
            animationCell.update(
              this.context,
              cell.x,
              cell.y,
              value,
              this.animationDirection,
              this.deltaTime.y
            );
            cell.y -= this.deltaTime.y;
          } else {
            this.endingAnimation(cell, this.deltaTime.y);
          }
          break;
        case Direction.DOWN:
          if (cell.y <= this._canvasSize && newPosY >= cell.y) {
            animationCell.update(
              this.context,
              cell.x,
              cell.y,
              value,
              this.animationDirection,
              this.deltaTime.y
            );
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
    cell.cell.update(
      this.context,
      cell.newX,
      cell.newY,
      cell.newValue,
      this.animationDirection,
      delta
    );

    this.drawGrid();

    cancelAnimationFrame(this.requestId);
    return;
  }

  get score(): number {
    return this._score;
  }

  set score(newScore: number) {
    this._score = newScore;
  }

  createListeners(): void {
    const listener = (event: KeyboardEvent) => {
      if(!this._openModalSuccess && !this._openModalFail) {
        this.moveCells(LISTENERS[(event as KeyboardEvent).keyCode]);
        this.historyButtonClick();
      }
    };

    this.eventListeners.push(listener);
    document.addEventListener('keydown', listener);
  }

  addHistory(): void {
    localStorage.clear();
    this._historyMatrix.push({ stepIndex: this._stepsBack, historyMatrix: this.clonePrevMatrix(this._matrix) });
    localStorage.setItem(`key${this._stepsBack}`, JSON.stringify(this._historyMatrix));
    this._stepsBack += 1;
    this._isHistoryMove = true;
  }

  historyButtonClick(): void {
    this._isHistoryMove ? this.historyBtn.disabled = false : this.historyBtn.disabled = true;
    this.historyBtn.addEventListener('click', this.historyBack);
  }

  historyBackStep(): void {
      this._historyMatrix.splice(this._stepsBack-1, 1);
      this._stepsBack -= 1;
      this._wasMadeHistoryStep += 1;

      if(this._historyMatrix.length === 1 || this._wasMadeHistoryStep >= Engine.MAX_STEP_BACK) {
        this._isHistoryMove = false;
        this.historyButtonClick();
      }
      
      this._matrix = this.clonePrevMatrix(this._historyMatrix[this._stepsBack-1].historyMatrix);
      this.render(true);
  }

  generateCell(): Position | undefined {
    const randomCoordinates = this.generateRandomCellPosition();
    if (randomCoordinates) {
      const newCell = new Cell(randomCoordinates, this.cellSize);
      this.addCellToMatrix(newCell);
      return randomCoordinates;
    }
  }

  get emptyCellExists(): boolean {
    return this._matrix.some(row => row.some(el => !el));
  }

  generateRandomCellPosition(): Position | undefined {
    if (this.emptyCellExists) {
      const randomX = Utils.generateRandom(0, this._size);
      const randomY = Utils.generateRandom(0, this._size);
      if (this._matrix[randomY][randomX]) {
        return this.generateRandomCellPosition();
      }
      return { x: randomX, y: randomY };
    }
  }

  addCellToMatrix(cell: Cell, newPosition?: Position): void {
    let x: number, y: number;
    this.requestId = 0;
    this._wasMadeHistoryStep -= 1;
    if (newPosition) {
      requestAnimationFrame(this.animate);
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
    if (neighborCell && this.checkCollision(neighborCell, cell)) {
      const increasedValue = cell.value * 2;

      if (increasedValue > this.score) {
        this.score = increasedValue;
      }

      this.removeCellFromMatrix(neighborCell);
      this.removeCellFromMatrix(cell);

      if (this.addedCellForAnimation(cell.id) === -1) {
        this.cellAnimate?.push({
          x: x * this.cellSize,
          newX: newX * this.cellSize,
          y: y * this.cellSize,
          newY: newY * this.cellSize,
          cell: cell,
          value: cell.value,
          newValue: increasedValue,
          id: cell.id,
        });
      } else {
        if (!this.cellAnimate) {
          return;
        }

        this.cellAnimate[this.addedCellForAnimation(cell.id)].newX =
          newX * this.cellSize;
        this.cellAnimate[this.addedCellForAnimation(cell.id)].newY =
          newY * this.cellSize;
        this.cellAnimate[this.addedCellForAnimation(cell.id)].newValue =
          increasedValue;
      }

      this.deltaTime.x = Math.abs((x - newX) * Engine.PIXELS_PER_FRAME);
      this.deltaTime.y = Math.abs((y - newY) * Engine.PIXELS_PER_FRAME);

      this.addCellToMatrix(this.copyCell({ x: newX, y: newY }, increasedValue));

      this.moveCell(cell, direction);
    } else {
      if (this._matrix[newY][newX]) {
        return;
      }

      cell.position = { x: newX, y: newY };
      this.removeCellFromMatrix(cell, { x, y });

      if (this.addedCellForAnimation(cell.id) === -1) {
        this.cellAnimate?.push({
          x: x * this.cellSize,
          newX: newX * this.cellSize,
          y: y * this.cellSize,
          newY: newY * this.cellSize,
          cell: cell,
          value: cell.value,
          newValue: cell.value,
          id: cell.id,
        });
      } else {
        if (!this.cellAnimate) {
          return;
        }

        this.cellAnimate[this.addedCellForAnimation(cell.id)].newX =
          newX * this.cellSize;
        this.cellAnimate[this.addedCellForAnimation(cell.id)].newY =
          newY * this.cellSize;
        this.cellAnimate[this.addedCellForAnimation(cell.id)].newValue =
          cell.value;
      }

      this.deltaTime.x = Math.abs((x - newX) * Engine.PIXELS_PER_FRAME);
      this.deltaTime.y = Math.abs((y - newY) * Engine.PIXELS_PER_FRAME);

      this.addCellToMatrix(cell, { x: newX, y: newY });

      this.moveCell(cell, direction);
    }
  }

  addedCellForAnimation(currentId: number): number {
    if (this.cellAnimate) {
      return this.cellAnimate.findIndex(x => x.id === currentId);
    }
    return -1;
  }

  checkCollision(cell1: Cell, cell2: Cell): boolean {
    return cell1.value === cell2.value;
  }

  checkCellCollisions(cell: Cell): boolean {
    return this.getCellNeighbors(cell).some(neighbor =>
      this.checkCollision(cell, neighbor)
    );
  }

  getCellNeighbors(cell: Cell): Cell[] {
    const { x, y } = cell.position;
    const isCell = (cell: Cell | undefined): cell is Cell => cell !== undefined;
    return [
      this._matrix[y - 1] && this._matrix[y - 1][x],
      this._matrix[y + 1] && this._matrix[y + 1][x],
      this._matrix[y][x - 1],
      this._matrix[y][x + 1],
    ].filter(isCell);
  }

  clonePrevMatrix(matrix: MatrixArray): MatrixArray{
    // @ts-ignore
    const clone = (items: MatrixArray) => items.map(item => Array.isArray(item) ? clone(item) : item);
    return clone(matrix);
  }

  moveCells(moveDirection: Direction): void {
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

    if (!this.isGameOver) {
      this.render();
      this.addHistory();
    } else {

      if (this.score >= Engine.FINAL_SCORE) {
        this._openSuccess();
      } else {
        this._openFailure();
      }

      this.audioPlayer.getSoundByName(SoundNames.Victory).play();
      this._addUserToLeaderboard(this.score);
    }
  }

  get hasCollisions(): boolean {
    return this._matrix.some(row =>
      row.some(cell => cell && this.checkCellCollisions(cell))
    );
  }

  get isGameOver(): boolean {
    return (
      (this._score >= Engine.FINAL_SCORE && !this._isContinuePlay) || // 2048 reached and it is not game continue OR
      (!this.emptyCellExists && !this.hasCollisions) // no empty cell and possible moves
    );
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

  render(history?: boolean) {
    this.clear();
    this.drawGrid();
    if (history) {
      this.historyRenderCells(this._historyMatrix[this._stepsBack-1].historyMatrix);
    } else {
      this.generateCell();
      this.renderCells(this._matrix);
    }
    this.drawGrid();
  }

  renderCells(matrix: MatrixArray) {
    for (const row of matrix) {
      for (const cell of row) {
        if (cell) {
          cell.render(this.context);
        }
      }
    }
  }

  historyRenderCells(matrix: MatrixArray) {
    for (let i = 0; i<matrix.length; i++) {
      for (let j = 0; j<matrix[i].length; j++){
          if(matrix[i][j]) {
            matrix[i][j]!.position = { x: j, y: i };
            matrix[i][j]!.render(this.context);
          }
      }
    }
  }

  destroy() {
    this.removeListeners();
  }

  removeListeners(): void {
    for (const listener of this.eventListeners) {
      document.removeEventListener('keydown', listener);
    }
    this.historyBtn.removeEventListener('click', this.historyBack);
  }
}
