import { Utils } from './Utils';

describe('Utils for game engine', () => {
  describe('generateValue util', () => {
    const result = [...Array(10)].map(() => Utils.generateValue());

    it('should always return result', () => {
      expect(result).toHaveLength(10);
    });

    it('should return 2 or 4 numbers only', () => {
      const filtered = result.filter(n => n !== 2 && n !== 4);
      expect(filtered).toHaveLength(0);
    });
  });

  describe('generateRandom util', () => {
    it('should return a number in 0..100 range by default', () => {
      const result = Utils.generateRandom();
      expect(result).toBeLessThanOrEqual(100);
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('shoul return a number in specified range', () => {
      const result = Utils.generateRandom(20, 30);
      expect(result).toBeLessThanOrEqual(30);
      expect(result).toBeGreaterThanOrEqual(20);
    });

    it('should return a number in one member range', () => {
      let result = Utils.generateRandom(100);
      expect(result).toBe(100);

      result = Utils.generateRandom(0, 0);
      expect(result).toBe(0);
    });

    it('should throw error for invalid range', () => {
      expect(() => {
        Utils.generateRandom(200, 100);
      }).toThrow('Invalid min and max arguments');
    });
  });

  describe('generateMatrix util', () => {
    it('should return 4x4 matrix by default', () => {
      const result = Utils.generateMatrix();
      expect(result).toHaveLength(4);
      expect(result[0]).toHaveLength(4);
    });

    it('should return matrix of indefined values', () => {
      const result = Utils.generateMatrix();
      const filtered = Array.prototype.concat
        .apply([], result)
        .filter(el => el !== undefined);
      expect(filtered).toHaveLength(0);
    });

    it('should return matrix of specified size', () => {
      const result = Utils.generateMatrix(3);
      expect(result).toHaveLength(3);
      expect(result[0]).toHaveLength(3);
    });
  });
});
