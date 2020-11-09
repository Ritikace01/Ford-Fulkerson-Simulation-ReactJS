import insertEdge from "./insertEdge";
import drawAllNodes from "./drawAllNodes";
import coordinates from "./nodeCoordinates";
import fordFulkerson from "./fordFulkerson";
import drawPipeAnimation from "./drawPipeAnimation";

const draw = (ctx, adjacencyList, isActive, canvas) => {
  const drawEdges = () => {
    adjacencyList.forEach((node) => {
      node.connections.forEach((connectedNode) => {
        const fromNode = coordinates.find((n) => node.nodeId === n.nodeId);
        const toNode = coordinates.find(
          (n) => connectedNode.nodeId === n.nodeId
        );
        insertEdge(
          ctx,
          fromNode.x,
          fromNode.y,
          toNode.x,
          toNode.y,
          "black",
          connectedNode.isFlowing,
          connectedNode.capacity
        );
      });
    });
  };

  //draw edges:
  drawEdges();
  ctx.save();
  //fordFulkerson::::::::::::::::::::::::
  const {
    flowGraph,
    flowOfGraph,
    maxFlow,
    augmentingPaths,
    residueGraphs,
  } = fordFulkerson(adjacencyList);

  augmentingPaths.forEach((path, index) => {
    setTimeout(() => {
      adjacencyList.map((node) => {
        node.connections.map((c) => {
          c.isFlowing = false;
          return c;
        });
        return node;
      });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawEdges();
      drawAllNodes(ctx);
      path.forEach((node, index) => {
        if (node === -1) return;
        const fromNodeIndex = adjacencyList.findIndex((n) => n.nodeId === node);
        const toNodeIndex = adjacencyList[fromNodeIndex].connections.findIndex(
          (n) => n.nodeId === index
        );
        const fromNode = coordinates.find(
          (node) => node.nodeId === adjacencyList[fromNodeIndex].nodeId
        );
        const toNode = coordinates.find(
          (node) =>
            node.nodeId ===
            adjacencyList[fromNodeIndex].connections[toNodeIndex].nodeId
        );
        adjacencyList[fromNodeIndex].connections[toNodeIndex].isFlowing = true;
        setTimeout(() => {
          //draw animation:
          drawPipeAnimation(ctx, fromNode.x, fromNode.y, toNode.x, toNode.y);
        }, 1000 * index);
      });
      setTimeout(() => {
        //change labels

        adjacencyList.map((node) => {
          node.connections.map((n) => {
            //change labels here
            return n;
          });
          return node;
        });
      }, 6000);
    }, 8000 * index);
    drawEdges();
  });

  //draw nodes:
  drawAllNodes(ctx);
};

export default draw;
