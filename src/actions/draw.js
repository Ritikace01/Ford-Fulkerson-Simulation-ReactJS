import insertEdge from "./insertEdge";
import drawAllNodes from "./drawAllNodes";
import coordinates from "./nodeCoordinates";
import fordFulkerson from "./fordFulkerson";
import drawPipeAnimation from "./drawPipeAnimation";
import cutCoordinates from "./cutCoordinates";

const draw = (
  ctx,
  adjacencyList,
  isActive,
  canvas,
  setCurrentAugmentingIndex,
  setAugmentingPaths,
  setBottlenecks,
  setMaxFlowPath,
  setMaxFlow
) => {
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

  // cutCoordinates.forEach((cut) => {
  //   ctx.moveTo(cut.xFrom, cut.yFrom);
  //   ctx.lineTo(cut.xTo, cut.yTo);
  //   ctx.stroke();
  // });

  //draw edges:
  drawEdges();
  ctx.save();
  if (isActive) {
    //fordFulkerson::::::::::::::::::::::::
    const {
      flowGraph,
      flowOfGraph,
      maxFlow,
      augmentingPaths,
      residueGraphs,
      bottlenecks,
    } = fordFulkerson(adjacencyList);

    setBottlenecks(bottlenecks);
    setMaxFlowPath(flowOfGraph);
    setMaxFlow(maxFlow);
    setAugmentingPaths(augmentingPaths);

    augmentingPaths.forEach((path, outerIndex) => {
      //iterating through each augmenting path:
      setTimeout(() => {
        setCurrentAugmentingIndex(outerIndex);
        //setting flow of every path to false:
        adjacencyList.map((node) => {
          node.connections.map((c) => {
            c.isFlowing = false;
            return c;
          });
          return node;
        });

        //clearing canvas and drawing all the pipes and nodes again:
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawEdges();
        drawAllNodes(ctx);

        //
        path.forEach((node, innerIndex) => {
          //iterating through each node through the augmenting path
          if (node === -1) return; //if there is no parent, then skip this iteration

          const fromNodeIndex = adjacencyList.findIndex(
            (n) => n.nodeId === node
          );
          const toNodeIndex = adjacencyList[
            fromNodeIndex
          ].connections.findIndex((n) => n.nodeId === innerIndex);

          //finding the coordinates of the source node:
          const fromNode = coordinates.find(
            (node) => node.nodeId === adjacencyList[fromNodeIndex].nodeId
          );

          //finding the index of the to destination node:
          const toNode = coordinates.find(
            (node) =>
              node.nodeId ===
              adjacencyList[fromNodeIndex].connections[toNodeIndex].nodeId
          );

          //set the isFlowing property to true for this particular pipe
          adjacencyList[fromNodeIndex].connections[
            toNodeIndex
          ].isFlowing = true;

          //change label:
          let text =
            adjacencyList[fromNodeIndex].connections[toNodeIndex].capacity;
          const currentBottleneck = bottlenecks[outerIndex];
          if (text.indexOf("/") === -1) {
            text = currentBottleneck.toString() + "/" + text;
          } else {
            let residue = parseInt(text.split("/")[0]) + currentBottleneck;
            const total = text.split("/")[1];
            text = residue.toString() + "/" + total;
          }
          adjacencyList[fromNodeIndex].connections[toNodeIndex].capacity = text;

          setTimeout(() => {
            //draw pipe animation for this particular pipe:
            drawPipeAnimation(ctx, fromNode.x, fromNode.y, toNode.x, toNode.y);
          }, 1000 * innerIndex);
        });
      }, (augmentingPaths.length + 1) * 2000 * outerIndex);
    });

    //drawing the ideal path:
    setTimeout(() => {
      setCurrentAugmentingIndex(augmentingPaths.length);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawEdges();
      for (let i = 0; i < flowOfGraph.length; i++) {
        setTimeout(() => {
          for (let j = 0; j < flowOfGraph[i].length; j++) {
            if (flowOfGraph[i][j] !== 0) {
              const fromNode = coordinates[i];
              const toNode = coordinates[j];
              drawPipeAnimation(
                ctx,
                fromNode.x,
                fromNode.y,
                toNode.x,
                toNode.y
              );
            }
          }
        }, i * 1000);
      }
      drawAllNodes(ctx);
    }, augmentingPaths.length * 9000);
  }
  //draw nodes:
  drawAllNodes(ctx);
};

export default draw;
