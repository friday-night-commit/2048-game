import { generateValue } from '../utils/getValue'
import { ThemeProvider } from '@material-tailwind/react'
import value = ThemeProvider.propTypes.value

export type Position = {
  x: number,
  y: number
}


export class Cell {
  protected readonly _value: number
  protected _position: Position
  protected context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D, position: Position) {
    // TODO Игра управляет ячейками, сама ячейка не знает ничего, кроме значения и позиции
    this.context = context;
    this._value = generateValue();
    this._position = position;
  }

  get value(): number {
    return this._value
  }

  setPosition(newPosition: Position) {
    this._position = newPosition;
  }

  get position(): Position {
    return this._position
  }

  changeColor() : string {
    switch (this.value) {
      case 2:
        return 'rgb(224, 222, 220)';
      case 4:
        return 'rgb(209, 206, 203)';
      case 8:
        return 'rgb(194, 190, 186)';
      case 16:
        return 'rgb(179, 174, 169)';
      case 32:
        return 'rgb(164, 158, 152)';
      case 64:
        return 'rgb(149, 142, 135)';
      case 128:
        return 'rgb(255, 216, 107)';
      case 256:
        return 'rgb(255, 186, 0)';
      case 512:
        return 'rgb(211, 143, 74)';
      case 1024:
        return 'rgb(205, 127, 50)';
      case 2048:
        return 'rgb(237, 111, 49)';
      case 4096:
        return 'rgb(255, 31, 31)';
      default:
        return 'gray';
    }
  }

  render() {
    this.context.fillStyle = this.changeColor();
    const { x, y } = this.position
    this.context.fillRect(x*75,y*75,75,75);
    this.context.textBaseline = 'middle';
    this.context.fillStyle = 'black';
    this.context.textAlign = 'center';
    this.context.fillText(String(this.value), x*75+37, y*75+35);
  }
}