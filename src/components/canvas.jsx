import React, { useEffect } from "react";
import draw from "../actions/draw";

function Canvas(props) {
  const coorindates = [
    { node: "s", x: 100, y: 200 },
    { node: "a", x: 250, y: 200 },
    { node: "b", x: 250, y: 300 },
    { node: "c", x: 400, y: 100 },
    { node: "d", x: 400, y: 300 },
    { node: "t", x: 550, y: 200 },
  ];

  const adjacencyList = [
    {
      node: "s",
      connections: [
        { node: "a", capacity: "13" },
        { node: "c", capacity: "8" },
      ],
    },
    {
      node: "a",
      connections: [
        { node: "c", capacity: "8" },
        { node: "b", capacity: "10" },
      ],
    },
    {
      node: "b",
      connections: [
        { node: "c", capacity: "1" },
        { node: "d", capacity: "3" },
      ],
    },
    {
      node: "c",
      connections: [{ node: "t", capacity: "10" }],
    },
    {
      node: "d",
      connections: [
        { node: "c", capacity: "8" },
        { node: "t", capacity: "7" },
      ],
    },
  ];

  const canvasRef = React.useRef(null); //used to refer to the canvas element
  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");

    draw(ctx);
  }, []);

  return (
    <div>
      <canvas
        //className="canvas-size"
        ref={canvasRef}
        id="myCanvas"
        resize="true"
      ></canvas>
    </div>
  );
}

export default Canvas;
