import { Utils } from '../utils/Utils';

export type Position = {
  x: number;
  y: number;
};

export class Cell {
  protected readonly value: number;
  protected position: Position;
  private size: number;

  protected readonly fontText = '20px Arial';
  protected readonly baselineText = 'middle';
  protected readonly textColor = 'black';
  protected readonly alignText = 'center';

  constructor(position: Position, size: number, value?: number) {
    this.value = value || Utils.generateValue();
    this.position = position;
    this.size = size;
  }

  getValue(): number {
    return this.value;
  }

  setPosition(newPosition: Position): Cell {
    this.position = newPosition;
    return this;
  }

  getPosition(): Position {
    return this.position;
  }

  private changeColor() : string {
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

  render(context: CanvasRenderingContext2D) {
    context.fillStyle = this.changeColor();
    const { x, y } = this.getPosition();
    context.fillRect(x * this.size, y * this.size, this.size, this.size);
    context.font = this.fontText;
    context.textBaseline = this.baselineText;
    context.fillStyle = this.textColor;
    context.textAlign = this.alignText;
    context.fillText(String(this.value), x * this.size + (this.size / 2), y * this.size + (this.size / 2));
  }
}