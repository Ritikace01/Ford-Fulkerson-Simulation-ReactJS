import insertNode from "./insertNode";
import insertEdge from "./insertEdge";
import drawAllNodes from "./drawAllNodes";

const coordinates = [
  { node: "s", nodeId: 0, x: 100, y: 300 },
  { node: "a", nodeId: 1, x: 250, y: 100 },
  { node: "b", nodeId: 2, x: 250, y: 400 },
  { node: "c", nodeId: 3, x: 500, y: 100 },
  { node: "d", nodeId: 4, x: 500, y: 400 },
  { node: "t", nodeId: 5, x: 650, y: 200 },
];

const draw = (ctx, adjacencyList) => {
  //draw edges:
  adjacencyList.forEach((node) => {
    node.connections.forEach((connectedNode) => {
      const fromNode = coordinates.find((n) => node.nodeId === n.nodeId);
      const toNode = coordinates.find((n) => connectedNode.nodeId === n.nodeId);
      insertEdge(
        ctx,
        fromNode.x,
        fromNode.y,
        toNode.x,
        toNode.y,
        "black",
        false,
        connectedNode.capacity
      );
    });
  });

  //draw nodes:
  drawAllNodes(ctx);
};

export default draw;
