import drawPipeAnimation from "./drawPipeAnimation";

const drawAngledPipe = (
  ctx,
  xFrom,
  yFrom,
  xTo,
  yTo,
  color = "black",
  isAnimationActive
) => {
  const angle = Math.atan((yTo - yFrom) / (xTo - xFrom));

  function lineToAngle(x1, y1, length, angle) {
    var x2 = x1 + length * Math.cos(angle),
      y2 = y1 + length * Math.sin(angle);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    return { x: x2, y: y2 };
  }

  //drawing the rectangle:
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

  //arrow's line:
  ctx.lineWidth = 0.7;
  const midPointX = Math.abs(xFrom - xTo) / 2 + Math.min(xFrom, xTo);
  const midPointY = Math.abs(yFrom - yTo) / 2 + Math.min(yFrom, yTo);

  let { x: arrowEndX, y: arrowEndY } = lineToAngle(
    midPointX,
    midPointY,
    20,
    angle
  );

  const drawStraightDirection = () => {
    lineToAngle(arrowEndX, arrowEndY, 10, Math.PI + angle + Math.PI / 9);
    lineToAngle(arrowEndX, arrowEndY, 10, Math.PI + angle - Math.PI / 9);
  };

  const drawReverseDirection = () => {
    lineToAngle(midPointX, midPointY, 10, angle + Math.PI / 9);
    lineToAngle(midPointX, midPointY, 10, angle - Math.PI / 9);
  };

  //conditions for the array's direction according to the angle:
  if (xFrom < xTo) {
    //straight direction:
    drawStraightDirection();
  } else {
    if (xFrom === xTo) {
      if (yFrom > yTo) {
        if (angle < 0) {
          //straight direction:
          drawStraightDirection();
        } else {
          //reverse direction:
          drawReverseDirection();
        }
        // //straight direction:
        // drawStraightDirection();
      } else {
        //straight direction:
        drawStraightDirection();
      }
    } else {
      //reverse direction:
      drawReverseDirection();
    }
  }
  // if (isAnimationActive) {
  //   drawPipeAnimation(ctx, xFrom, yFrom, xTo, yTo);
  // }
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.stroke();
};

export default drawAngledPipe;
