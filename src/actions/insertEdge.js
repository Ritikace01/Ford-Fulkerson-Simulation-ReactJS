import drawAngledPipe from "./drawAngledPipe";
import drawPipeAnimation from "./drawPipeAnimation";

const insertEdge = (ctx, xFrom, yFrom, xTo, yTo, color, isAnimationActive) => {
  let midPointX = Math.abs(xTo - xFrom) / 2 + Math.min(xTo, xFrom);
  let midPointY = Math.abs(yTo - yFrom) / 2 + Math.min(yTo, yFrom);

  const angle = Math.atan((yTo - yFrom) / (xTo - xFrom));
  drawAngledPipe(ctx, xFrom, yFrom, xTo, yTo, color);
  if (isAnimationActive) {
    drawPipeAnimation(ctx, xFrom, yFrom, xTo, yTo);
  }

  //adding label:
  const labelX = midPointX + (Math.cos(angle) === 0 ? -15 : -15);
  const labelY = midPointY + (Math.sin(angle) === 0 ? -20 : -15);
  ctx.font = "20px arial";
  ctx.fillStyle = "black";
  ctx.fillText("lol", labelX, labelY);

  ctx.lineWidth = 1;
};

export default insertEdge;
