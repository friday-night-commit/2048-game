import { MatrixArray } from '../Engine/Engine';

export class Utils {

  static generateValue(): number {
    return Math.random() > 0.75 ? 4 : 2;
  }

  static generateRandom(min = 0, max = 100): number {
    const difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  }

  static generateMatrix(): MatrixArray {
    return Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => undefined)
    );
  }
}