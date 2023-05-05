import { Cell, Position } from '../Cell/Cell'
import { generateRandom } from '../utils/generateRandom'

export class Engine {
  // Максимальное использовать свойства класса, а не передать их в методы
  protected readonly context: CanvasRenderingContext2D;
  protected cells: (Cell | undefined)[]
  private maxValue: number = 0


  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.cells = [];
    //this.generateField()

    this.render()

  }

  //мы создаем матрицу
  // ней массив с позициями
  // каждый раз рисуем массив заново
  //выставляя позиции после сдвига ячеек

  generateCell(): void {
    const randomCoordinates = this.generateRandomCellPosition();
    const newCell = new Cell(this.context, randomCoordinates);
    this.cells?.push(newCell)
  }

  movingMatrixElements(event: KeyboardEvent): void {
    this.moveMatrixElements(listeners[event.keyCode]);
  }

  createListeners() {
    document.addEventListener("keydown", this.movingMatrixElements.bind(this));
  }

  removeListeners(): void {
    document.removeEventListener("keydown", this.movingMatrixElements);
  }

  generateRandomCellPosition(): Position {
    const emptyCoordinates = this.getEmptyMatrixCoordinates()
    const randomCoordinateIndex = generateRandom(0, emptyCoordinates.length - 1)

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

  moveMatrixElements(moveDirection: Direction): void {
    switch (moveDirection) {
      case Direction.DOWN:
        for (let item of this.cells) {
          this.moveElement(3, 'down', true, false, item);
        }
        break;
      case Direction.LEFT:
        for (let item of this.cells) {
          this.moveElement(0, 'left', false, true, item);
        }
        break;
      case Direction.RIGHT:
        for (let item of this.cells) {
          this.moveElement(3, 'right', false, false, item);
        }
        break;
      case Direction.UP:
        for (let item of this.cells) {
          this.moveElement(0, 'up', true, true, item);
        }
        break;
    }

    this.removeListeners();
    this.render();
  }

  moveElement(minIndex: number, direction: string, isVertical: boolean, increasing: boolean, item: Cell|undefined): void {
      const cellPositionX = item?.position.x;
      const cellPositionY = item?.position.y;

      let startIndex;
      let conditionEdge;
      let position;
      let positionCheck;

      switch (isVertical) {
        case true:
          conditionEdge = cellPositionY;
          positionCheck = item!.position.y;
          break;
        case false:
          conditionEdge = cellPositionX;
          positionCheck = item!.position.x;
          break;
      }

      switch (increasing) {
        case true:
          startIndex = 0;

          if(conditionEdge) {
            for(let i = startIndex; i < conditionEdge; i++) {
              let neighbor;

              neighbor = isVertical
                ? this.cells.find(element => element?.position.x === cellPositionX! && element?.position.y === i)
                : this.cells.find(element => element?.position.x === i && element?.position.y === cellPositionY!);

              if(neighbor) {
                minIndex++;
              }
            }
          }
          break;
        case false:
          startIndex = 3;

          if(conditionEdge !== startIndex) {
            for(let i = startIndex; i > conditionEdge!; i--) {
              let neighbor;

              neighbor =  isVertical
               ? this.cells.find(element => element?.position.x === cellPositionX! && element?.position.y === i)
               : this.cells.find(element => element?.position.x === i && element?.position.y === cellPositionY!);

              if(neighbor) {
                minIndex--;
              }
            }
          }
          break;
      }

      switch (isVertical) {
        case true:
          position = {x: Number(cellPositionX!), y: Number(minIndex)};
          break;
        case false:
          position = {x: Number(minIndex), y: Number(cellPositionY!)};
          break;
      }


    if(item && positionCheck !== minIndex) {
        item.setPosition(position);
    }
  }

  drawGrid (): void {
    const w = 800;
    const h = 400;
    const step = 75;

    this.context.beginPath();
    this.context.fillStyle = 'white';

    for (let x=0;x<=w;x+=step) {
      this.context.moveTo(x, 0);
      this.context.lineTo(x, h);
    }
    this.context.font = "20px Arial";

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
    this.createListeners();
  }

  // checkCollision(cell1, cell2) {
  //   if(cell1.x === cell2.x && cell1.y === cell2.y && cell1.value === cell2.vlaue){
  //     const value = cell1.value * 2
  //     const cell = new Cell(context, value)
  //     // кладем в нужное место в матрице
         // удаляем ячейку и добавляем туда новую  сновым значением
  //   }
  // }

  renderCells(){
    for(let cell of this.cells){
      if(cell) {
        cell.render();
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