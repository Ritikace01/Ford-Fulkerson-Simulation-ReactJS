const drawAngledPipe = (ctx, xFrom, yFrom, xTo, yTo) => {
  const lengthOfPipe = Math.sqrt(
    Math.pow(xTo - xFrom, 2) + Math.pow(yTo - yFrom, 2)
  );

  const angle = Math.atan((yTo - yFrom) / (xTo - xFrom));

  function lineToAngle(x1, y1, length, angle) {
    var x2 = x1 + length * Math.cos(angle),
      y2 = y1 + length * Math.sin(angle);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    return { x: x2, y: y2 };
  }

  let { x, y } = lineToAngle(xFrom, yFrom, 7.5, Math.PI / 2 + angle);
  lineToAngle(xTo, yTo, 7.5, Math.PI / 2 + angle);
  ctx.lineTo(x, y);
  let { x: xDash, y: yDash } = lineToAngle(
    xFrom,
    yFrom,
    7.5,
    (3 * Math.PI) / 2 + angle
  );
  lineToAngle(xTo, yTo, 7.5, (3 * Math.PI) / 2 + angle);
  ctx.lineTo(xDash, yDash);

  //arrow:
  ctx.lineWidth = 0.7;
  const midPointX = Math.abs(xFrom - xTo) / 2 + Math.min(xFrom, xTo);
  const midPointY = Math.abs(yFrom - yTo) / 2 + Math.min(yFrom, yTo);

  console.log("(x,y):", xFrom, yFrom, "(x',y'): ", xTo, yTo);
  console.log("angle: ", angle);
  let { x: arrowEndX, y: arrowEndY } = lineToAngle(
    midPointX,
    midPointY,
    20,
    angle
  );

  if (xFrom < xTo) {
    //straight direction:
    lineToAngle(arrowEndX, arrowEndY, 10, Math.PI + angle + Math.PI / 9);
    lineToAngle(arrowEndX, arrowEndY, 10, Math.PI + angle - Math.PI / 9);
  } else {
    if (xFrom == xTo) {
      if (yFrom < yTo) {
        //straight direction:
        lineToAngle(arrowEndX, arrowEndY, 10, Math.PI + angle + Math.PI / 9);
        lineToAngle(arrowEndX, arrowEndY, 10, Math.PI + angle - Math.PI / 9);
      } else {
        //reverse direction:
        lineToAngle(midPointX, midPointY, 10, angle + Math.PI / 9);
        lineToAngle(midPointX, midPointY, 10, angle - Math.PI / 9);
      }
    } else {
      //reverse direction:
      lineToAngle(midPointX, midPointY, 10, angle + Math.PI / 9);
      lineToAngle(midPointX, midPointY, 10, angle - Math.PI / 9);
    }
  }

  ctx.stroke();
};

export default drawAngledPipe;
