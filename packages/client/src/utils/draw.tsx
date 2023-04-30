export const drawGrid = (context: CanvasRenderingContext2D) => {
  const w = 800;
  const h = 400;
  const step = 75;

  context.beginPath();
  context.fillStyle = 'white'

  for (let x=0;x<=w;x+=step) {
    context.moveTo(x, 0);
    context.lineTo(x, h);
  }
  // set the color of the line
  context.strokeStyle = 'rgb(143, 122, 102)';
  context.lineWidth = 3;
  // the stroke will actually paint the current path
  context.stroke();
  // for the sake of the example 2nd path
  context.beginPath();
  for (let y=0;y<=h;y+=step) {
    context.moveTo(0, y);
    context.lineTo(w, y);
  }
  // set the color of the line
  context.strokeStyle = 'rgb(143, 122, 102)';
  // just for fun
  context.lineWidth = 3;
  // for your original question - you need to stroke only once
  context.stroke();
}

export const drawCellElem = (position: {x: number, y: number}, context: CanvasRenderingContext2D, value: number) => {

  drawRect(context, position, value);

  return context;
}

export const reDrawCellElem = (oldPosition: {x: number, y: number},position: {x: number, y: number}, context: CanvasRenderingContext2D, value: number) => {
  context.clearRect(oldPosition.x*75,oldPosition.y*75,75,75)
  drawGrid(context);
  drawRect(context, position, value);

  return context;
}

export const removeCellElem = (oldPosition: {x: number, y: number}, context: CanvasRenderingContext2D) => {
  context.clearRect(oldPosition.x*75,oldPosition.y*75,75,75)
  drawGrid(context);

  return context;
}

const drawRect = (context: CanvasRenderingContext2D, position: {x: number, y: number}, value: number) => {
  context.fillStyle = 'gray';
  const { x, y } = position
  console.log(position)
  context.fillRect(x*75,y*75,75,75)
  context.font = "20px Arial"
  context.textBaseline = 'middle'
  context.fillStyle = 'black'
  context.textAlign = 'center'
  context.fillText(String(value), x*75+37, y*75+35)
}
