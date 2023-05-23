import { Utils } from '../utils/Utils';
import { Direction } from '../Engine/Engine';

export type Position = {
  x: number;
  y: number;
};

export class Cell {
  protected readonly _value: number;
  protected _position: Position;
  size: number;
  id: number;

  protected readonly fontText = '20px Arial';
  protected readonly baselineText = 'middle';
  protected readonly textColor = 'black';
  protected readonly alignText = 'center';

  constructor(position: Position, size: number, value?: number) {
    this._value = value || Utils.generateValue();
    this._position = position;
    this.size = size;
    this.id = Utils.generateRandom(0,9999999);
  }

  get value(): number {
    return this._value;
  }

  set position(newPosition: Position) {
    this._position = newPosition;
  }

  get position(): Position {
    return this._position;
  }

  private changeColor(value = this.value) : string {
    switch (value) {
      case 2:
        return 'rgb(238, 228, 218)';
      case 4:
        return 'rgb(237, 224, 200)';
      case 8:
        return 'rgb(255, 216, 107)';
      case 16:
        return 'rgb(242, 177, 121)';
      case 32:
        return 'rgb(255, 186, 0)';
      case 64:
        return 'rgb(245, 149, 99)';
      case 128:
        return 'rgb(246, 124, 95)';
      case 256:
        return 'rgb(255, 112, 76)';
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

  render(context: CanvasRenderingContext2D) {
    context.fillStyle = this.changeColor();
    const { x, y } = this.position;
    context.fillRect(x * this.size, y * this.size, this.size, this.size);
    context.font = this.fontText;
    context.textBaseline = this.baselineText;
    context.fillStyle = this.textColor;
    context.textAlign = this.alignText;
    context.fillText(String(this.value), x * this.size + (this.size / 2), y * this.size + (this.size / 2));
  }

  update(context: CanvasRenderingContext2D, x: number, y: number, value: number, direction: string, delta: number) {
    switch (direction) {
      case Direction.LEFT :
        context.clearRect(x + delta, y, this.size, this.size);
        break;
      case Direction.RIGHT :
        context.clearRect(x - delta, y, this.size, this.size);
        break;
      case Direction.UP :
        context.clearRect(x, y + delta, this.size, this.size);
        break;
      case Direction.DOWN :
        context.clearRect(x, y - delta, this.size, this.size);
        break;
    }

    context.fillStyle = this.changeColor(value);
    context.fillRect(x, y, this.size, this.size);
    context.font = this.fontText;
    context.textBaseline = this.baselineText;
    context.fillStyle = this.textColor;
    context.textAlign = this.alignText;
    context.fillText(String(value), x + (this.size / 2), y + (this.size / 2));
  }

}