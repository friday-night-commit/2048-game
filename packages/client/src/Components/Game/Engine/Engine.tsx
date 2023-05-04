import { Cell } from '../Cell/Cell'

export class Engine {
  // Максимальное использовать свойства класса, а не передать их в методы
  protected readonly context: CanvasRenderingContext2D;
  protected cells: (Cell | undefined)[]
  private maxValue: number = 0


  constructor(context: CanvasRenderingContext2D) {
    this.context = context
    this.cells = [];
    //this.generateField()

  }

  //мы создаем матрицу
  // ней массив с позициями
  // каждый раз рисуем массив заново
  //выставляя позиции после сдвига ячеек


  static generateRandom(min = 0, max = 100) {
    const difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  }

  generateCell(): void {
    const randomCoordinates = this.generateRandomCellPosition();
    const newCell = new Cell(this.context, randomCoordinates);
    this.cells?.push(newCell)
  }

  createListeners() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      this.moveMatrixElements(listeners[(event as KeyboardEvent).keyCode]);
    });
  }

  generateRandomCellPosition() {
    const emptyCoordinates = this.getEmptyMatrixCoordinates()
    const randomCoordinateIndex = Engine.generateRandom(0, emptyCoordinates.length - 1)

    return emptyCoordinates[randomCoordinateIndex]
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
    matrix[y][x] = cell;
  }

  removeCellFromMatrix(oldPosition: {x: number, y: number}): void {

  }

  // getMatrix(): number[][] {
  //   return matrix;
  // }

  moveMatrixElements(moveDirection: Direction): void {
    if (moveDirection === Direction.LEFT) {
      this.cells.forEach((item) => {
        const cellPositionX = item?.getPosition().x;
        const cellPositionY = item?.getPosition().y;
        let minIndex = 0;

        if(cellPositionX && cellPositionY) {
          for(let i = 4; i > 0; i--) {
            let leftNeighbor = this.cells.find(element => element?.getPosition().x === cellPositionX - i && element?.getPosition().y === cellPositionY);
            if(leftNeighbor) {
              minIndex++;
            }
          }
        }

        let position = {x: minIndex, y: cellPositionY!};
        if(item && item.getPosition().x !== minIndex) {
          item.setPosition(position);
          this.render();
        }
      })
      }
    }

  drawGrid (): void {
    const w = 800;
    const h = 400;
    const step = 75;

    this.context.beginPath();
    this.context.fillStyle = 'white'

    for (let x=0;x<=w;x+=step) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, h);
    }

    this.context.strokeStyle = 'rgb(143, 122, 102)';
    this.context.lineWidth = 3;
    this.context.stroke();

    this.context.beginPath();
    for (let y=0;y<=h;y+=step) {
      this.context.moveTo(0, y);
      this.context.lineTo(w, y);
    }
    this.context.strokeStyle = 'rgb(143, 122, 102)';
    this.context.lineWidth = 3;
    this.context.stroke();
  }

  clear() {
    this.context.clearRect(0, 0, 300, 300);
  }

  // для одного кадра
  render() {
    this.clear();
    this.drawGrid();
    this.generateCell();
    this.renderCells();
  }

  // checkCollision(cell1, cell2) {
  //   if(cell1.x === cell2.x && cell1.y === cell2.y && cell1.value === cell2.vlaue){
  //     const value = cell1.value * 2
  //     const cell = new Cell(context, value)
  //     // кладем в нужное место в матрице
  //   }
  // }

  renderCells(){
    console.log(this.cells)
    for(let cell of this.cells){
      if(cell) {
        cell.render()
      }
    }
  }

}

enum Direction {
  UP    = "up",
  DOWN  = "down",
  LEFT  = "left",
  RIGHT = "right",
}

const listeners:Record<number, Direction> = {
  37: Direction.LEFT,
  38: Direction.UP,
  39: Direction.RIGHT,
  40: Direction.DOWN
};

const matrix: number[][] = Array.from({ length: 4 }, () =>
  Array.from({ length: 4 }, () => 0)
);