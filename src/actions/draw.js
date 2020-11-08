import insertNode from "./insertNode";
import insertEdge from "./insertEdge";

const draw = (ctx) => {
  insertEdge(ctx, 100, 200, 250, 100, "black"); //a->b

  console.log("c->b");
  insertEdge(ctx, 250, 300, 250, 100, "black"); //c->b

  insertEdge(ctx, 250, 300, 400, 100, "black"); //c->d

  insertEdge(ctx, 250, 300, 100, 200, "black"); //c->a

  insertEdge(ctx, 250, 100, 400, 100, "black"); //b->d

  insertNode(ctx, 100, 200, "a", "black", "white");

  insertNode(ctx, 250, 100, "b", "black", "white");

  insertNode(ctx, 250, 300, "c", "black", "white");

  insertNode(ctx, 400, 100, "d", "black", "white");

  insertNode(ctx, 400, 300, "e", "black", "white");

  insertNode(ctx, 550, 200, "f", "black", "white");
};

export default draw;
