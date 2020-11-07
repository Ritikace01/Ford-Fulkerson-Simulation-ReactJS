import drawPipe from "./drawPipe";
import drawAngledPipe from "./drawAngledPipe";

const insertEdge = (ctx, xFrom, yFrom, xTo, yTo, color, isAnimationActive) => {
  const lengthOfPipe = Math.sqrt(
    Math.pow(xTo - xFrom, 2) + Math.pow(yTo - yFrom, 2)
  );

  let midPointX = Math.abs(xTo - xFrom) / 2 + Math.min(xTo, xFrom);
  let midPointY = Math.abs(yTo - yFrom) / 2 + Math.min(yTo, yFrom);

  drawAngledPipe(ctx, xFrom, yFrom, xTo, yTo);

  if (isAnimationActive) {
    setInterval(() => {}, 1);
  }

  //adding label:
  ctx.font = "20px arial";
  ctx.fillStyle = "black";
  ctx.fillText("lol", midPointX - 15, midPointY - 15);

  ctx.lineWidth = 1;
};

export default insertEdge;
