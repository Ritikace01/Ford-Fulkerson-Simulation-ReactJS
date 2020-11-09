import React, { useEffect } from "react";
import draw from "../actions/draw";

function Canvas(props) {
  const {
    isActive,
    setAugmentingPaths,
    setCurrentAugmentingIndex,
    setMaxFlowPath,
    setBottlenecks,
    setMaxFlow,
  } = props;

  const adjacencyList = [
    {
      nodeId: 0,
      node: "s",
      connections: [
        { nodeId: 1, node: "a", capacity: "13", isFlowing: false },
        { nodeId: 3, node: "c", capacity: "8", isFlowing: false },
      ],
    },
    {
      nodeId: 1,
      node: "a",
      connections: [
        { nodeId: 3, node: "c", capacity: "8", isFlowing: false },
        { nodeId: 2, node: "b", capacity: "10", isFlowing: false },
      ],
    },
    {
      nodeId: 2,
      node: "b",
      connections: [
        { nodeId: 3, node: "c", capacity: "1", isFlowing: false },
        { nodeId: 4, node: "d", capacity: "3", isFlowing: false },
      ],
    },
    {
      nodeId: 3,
      node: "c",
      connections: [{ nodeId: 5, node: "t", capacity: "10", isFlowing: false }],
    },
    {
      nodeId: 4,
      node: "d",
      connections: [
        { nodeId: 3, node: "c", capacity: "8", isFlowing: false },
        { nodeId: 5, node: "t", capacity: "7", isFlowing: false },
      ],
    },
    {
      nodeId: 5,
      node: "t",
      connections: [],
      isFlowing: false,
    },
  ];

  const canvasRef = React.useRef(null); //used to refer to the canvas element
  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");

    draw(
      ctx,
      adjacencyList,
      isActive,
      canvas,
      setCurrentAugmentingIndex,
      setAugmentingPaths,
      setBottlenecks,
      setMaxFlowPath,
      setMaxFlow
    );
  }, [isActive]);

  return (
    <React.Fragment>
      <canvas
        //className="canvas-size"
        ref={canvasRef}
        id="myCanvas"
        resize="true"
      ></canvas>
    </React.Fragment>
  );
}

export default Canvas;
