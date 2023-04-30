import { cloneDeep } from 'lodash'

const matrix = Array.from({ length: 4 }, () =>
  Array.from({ length: 4 }, () => 0)
);

export function getEmptyMatrixCoordinates() {
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

export function addCellToMatrix(cell: any) {
  const { x, y } = cell.getPosition()
  matrix[y][x] = cell
}

export function removeCellFromMatrix(oldPosition: {x: number, y: number}) {
  const { x, y } = oldPosition;
  matrix[y][x] = 0;
}

export function getPrevMatrix(matrix: number[][])
{
  return cloneDeep(matrix)
}

export default function getMatrix() {
  return matrix;
}