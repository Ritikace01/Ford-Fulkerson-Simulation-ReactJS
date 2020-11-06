import insertNode from "./insertNode";
import insertEdge from "./insertEdge";

const draw = (ctx) => {
  insertEdge(ctx, 100, 200, 250, 100, "black");

  insertEdge(ctx, 250, 300, 400, 100, "black");

  insertNode(ctx, 100, 200, "a", "black", "white");

  insertNode(ctx, 250, 100, "b", "black", "white");

  insertNode(ctx, 250, 300, "c", "black", "white");

  insertNode(ctx, 400, 100, "d", "black", "white");

  insertNode(ctx, 400, 300, "e", "black", "white");

  insertNode(ctx, 550, 200, "f", "black", "white");
};

export default draw;
