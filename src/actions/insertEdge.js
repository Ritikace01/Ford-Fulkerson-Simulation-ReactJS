const insertEdge = (ctx, xFrom, yFrom, xTo, yTo, color) => {
  // ctx.globalCompositeOperation = "destination-atop";

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.moveTo(xFrom, yFrom);
  ctx.lineTo(xTo, yTo);
  ctx.stroke();
  ctx.lineWidth = 1;
};

export default insertEdge;
