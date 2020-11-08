import insertNode from "./insertNode";

const drawPipeAnimation = (ctx, xFrom, yFrom, xTo, yTo) => {
  const angle = Math.atan((yTo - yFrom) / (xTo - xFrom));

  const length = Math.sqrt(Math.pow(xFrom - xTo, 2) + Math.pow(yFrom - yTo, 2));

  function lineToAngle(x1, y1, length, angle) {
    var x2 = x1 + length * Math.cos(angle),
      y2 = y1 + length * Math.sin(angle);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);

    return { x: x2, y: y2 };
  }

  let count = 1;

  const pipeFilling = () => {
    ctx.save();
    ctx.beginPath();
    if (count >= length) return;
    let { x: prevX, y: prevY } = lineToAngle(
      xFrom,
      yFrom,
      5.5,
      Math.PI / 2 + angle
    );
    let nextX, nextY;

    const drawStraightFlow = () => {
      nextX = prevX + count * Math.cos(angle);
      nextY = prevY + count * Math.sin(angle);
    };

    const drawReverseFlow = () => {
      //reverse direction:
      nextX = prevX - count * Math.cos(angle);
      nextY = prevY - count * Math.sin(angle);
    };
    if (xFrom < xTo) {
      drawStraightFlow();
    } else {
      if (xFrom === xTo) {
        if (yFrom > yTo) {
          if (angle < 0) {
            drawStraightFlow();
          } else {
            drawReverseFlow();
          }
        } else {
          drawStraightFlow();
        }
      } else {
        drawReverseFlow();
      }
    }

    count += 2; //increase this to increase the flow speed

    lineToAngle(nextX, nextY, 3, Math.PI / 2 + angle);
    ctx.lineTo(prevX, prevY);
    let { x: xDash, y: yDash } = lineToAngle(
      xFrom,
      yFrom,
      5.5,
      (3 * Math.PI) / 2 + angle
    );
    lineToAngle(nextX, nextY, 5.5, (3 * Math.PI) / 2 + angle);
    ctx.lineTo(xDash, yDash);

    ctx.fillStyle = "rgb(0, 153, 255)";
    ctx.fill();
    //draw the nodes again:
    insertNode(ctx, 100, 200, "a", "black", "white");

    insertNode(ctx, 250, 100, "b", "black", "white");

    insertNode(ctx, 250, 300, "c", "black", "white");

    insertNode(ctx, 400, 100, "d", "black", "white");

    insertNode(ctx, 400, 300, "e", "black", "white");

    insertNode(ctx, 550, 200, "f", "black", "white");

    window.requestAnimationFrame(pipeFilling);
  };
  pipeFilling();
};

export default drawPipeAnimation;
