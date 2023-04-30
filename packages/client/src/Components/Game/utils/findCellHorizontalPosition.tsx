export default function findCellHorizontalPosition
({cell, x, y, matrix, startCondition, endCondition, changeMethod}: any)
{
  if (startCondition(x)) return
  const cellLine = matrix[y]
  let currentX = x
  let foundX = x

  do {
    currentX = changeMethod(currentX)

    const anotherCell = cellLine[currentX]

    if (anotherCell) {
      if (anotherCell.getValue() === cell.getValue()) {
        foundX = currentX
        cell.mergeCellValue()
        anotherCell.kill()
      }

      break
    } else {
      foundX = currentX
    }
  } while (endCondition(currentX))
  cell.setPosition({
    x: foundX,
    y
  })
}