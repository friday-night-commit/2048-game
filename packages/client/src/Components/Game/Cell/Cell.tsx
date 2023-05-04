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
}