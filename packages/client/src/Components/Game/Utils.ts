import { MatrixArray } from './Engine';

export class Utils {
  static generateValue(): number {
    return Math.random() > 0.75 ? 4 : 2;
  }

  static generateRandom(min = 0, max = 100): number {
    const difference = max - min;
    if (difference < 0) {
      throw Error('Invalid min and max arguments');
    }

    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  }

  static generateMatrix(length = 4): MatrixArray {
    return Array.from({ length }, () =>
      Array.from({ length }, () => undefined)
    );
  }

  static initFullScreen(
    targetElementId: string,
    togglerElementId = 'btn-fullscreen-mode'
  ): void {
    const toggler = document.getElementById(togglerElementId);
    const targetElem = document.getElementById(targetElementId);

    if (!toggler || !targetElem) return;

    toggler.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        targetElem.requestFullscreen();
      }
    });
  }
}
