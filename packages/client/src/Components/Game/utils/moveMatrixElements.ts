import getMatrix, { addCellToMatrix, getPrevMatrix } from './matrix'
import { cloneDeep, isEqual } from 'lodash'
import createCell from './createCell'

export default function moveMatrixElements(moveDirection: string, context: CanvasRenderingContext2D) {
  const matrix = getMatrix();
  const oldMatrix = getPrevMatrix(getMatrix());


  if (moveDirection === "left") {
    for (let index = 1; index < matrix.length; index++) {
      matrix.forEach((matrixLine) => {
        const cell = matrixLine[index];
        if (cell) {
          cell.move(moveDirection);
        }
      });
    }
  } else if (moveDirection === "right") {
    for (let index = matrix.length - 2; index > -1; index--) {
      matrix.forEach((matrixLine) => {
        const cell = matrixLine[index];
        if (cell) {
          cell.move(moveDirection);
        }
      });
    }
  } else if (moveDirection === "up") {
    matrix.forEach((matrixLine) => {
      matrixLine.forEach((cell) => {
        if (cell) {
          cell.move(moveDirection);
        }
      });
    });
  } else if (moveDirection === "down") {
    for (let index = matrix.length - 2; index > -1; index--) {
      matrix[index].forEach((cell) => {
        if (cell) {
          cell.move(moveDirection);
        }
      });
    }
  }

  const isSameMatrix = isEqual(oldMatrix, cloneDeep(matrix));
  if (!isSameMatrix) {
    const newCell = createCell(context);
    addCellToMatrix(newCell);
  }
}