const drawPipe = (ctx, xFrom, yFrom, lengthOfPipe) => {
  ctx.beginPath(xFrom, yFrom);
  ctx.lineTo(xFrom, yFrom - 7.5); //line up
  ctx.lineTo(xFrom + lengthOfPipe, yFrom - 7.5); //line to right
  ctx.lineTo(xFrom + lengthOfPipe, yFrom + 7.5); //line to bottom
  ctx.lineTo(xFrom, yFrom + 7.5); //line to left
  ctx.lineTo(xFrom, yFrom - 7.5); //line up

  const midPointX = xFrom + lengthOfPipe / 2;
  const midPointY = yFrom;

  //arrow:
  ctx.lineWidth = 0.5;
  ctx.moveTo(midPointX - 25, midPointY);
  ctx.lineTo(midPointX + 50 - 25, midPointY);
  ctx.lineTo(midPointX + 45 - 25, midPointY - 5);
  ctx.moveTo(midPointX + 50 - 25, midPointY);
  ctx.lineTo(midPointX + 45 - 25, midPointY + 5);

  ctx.stroke();

  ctx.lineWidth = 1;
};

export default drawPipe;
