import insertNode from "./insertNode";

const coordinates = [
  { node: "s", nodeId: 0, x: 100, y: 300 },
  { node: "a", nodeId: 1, x: 250, y: 100 },
  { node: "b", nodeId: 2, x: 250, y: 400 },
  { node: "c", nodeId: 3, x: 500, y: 100 },
  { node: "d", nodeId: 4, x: 500, y: 400 },
  { node: "t", nodeId: 5, x: 650, y: 200 },
];

const drawAllNodes = (ctx) => {
  coordinates.forEach((node) => {
    insertNode(ctx, node.x, node.y, node.node, "black", "white");
  });
};

export default drawAllNodes;
