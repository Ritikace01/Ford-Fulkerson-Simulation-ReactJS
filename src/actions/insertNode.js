const insertNode = (ctx, x, y, text, strokeColor, fillStyle) => {
  // ctx.globalCompositeOperation = "destination-atop";

  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = fillStyle;

  ctx.beginPath();
  ctx.arc(x, y, 50, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.stroke();

  ctx.font = "20px arial";
  ctx.fillStyle = "black";
  ctx.fillText(text, x - 5, y + 5);
};

export default insertNode;
