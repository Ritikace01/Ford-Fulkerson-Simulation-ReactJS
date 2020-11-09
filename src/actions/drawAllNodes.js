import coordinates from "./nodeCoordinates";
import insertNode from "./insertNode";

const drawAllNodes = (ctx) => {
  coordinates.forEach((node) => {
    insertNode(ctx, node.x, node.y, node.node, "black", "white");
  });
};

export default drawAllNodes;
