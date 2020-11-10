import React, { useEffect } from "react";
import draw from "../actions/draw";

function Canvas(props) {
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const {
    isActive,
    setAugmentingPaths,
    setCurrentAugmentingIndex,
    setMaxFlowPath,
    setBottlenecks,
    setMaxFlow,
  } = props;

  //const [adjacencyList, setAdjacencyList] = React.useState([]);

  const canvasRef = React.useRef(null); //used to refer to the canvas element

  useEffect(() => {
    forceUpdate();
    props.setIsGraphChanged(false);
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");

    draw(
      ctx,
      props.adjacencyList,
      isActive,
      canvas,
      setCurrentAugmentingIndex,
      setAugmentingPaths,
      setBottlenecks,
      setMaxFlowPath,
      setMaxFlow
    );
  }, [isActive, props.adjacencyList, props.isGraphChanged]);

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
