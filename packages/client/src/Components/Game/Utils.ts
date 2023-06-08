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

  static fullscreenOpen(idComponent: string): void {
    const toggler = document.getElementById(idComponent) as HTMLButtonElement;
    const navbar = document.getElementById('navbar-item-menu') as HTMLDivElement;

    toggler.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        activateFullscreen(document.documentElement);
        toggler.textContent = 'Выключить полноэкранный режим';
        toggler.style.border = '3px solid black';
        navbar.style.display = 'none';
      } else {
        deactivateFullscreen();
        toggler.textContent = 'Включить полноэкранный режим';
        toggler.style.border = 'none';
        navbar.style.display = 'block';
      }
    });

    const activateFullscreen = (element: HTMLElement) => {
      element.requestFullscreen();
    };

    const deactivateFullscreen = () => {
      document.exitFullscreen();
    };

  }
}
