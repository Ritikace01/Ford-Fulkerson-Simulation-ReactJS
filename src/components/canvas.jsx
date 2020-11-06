import React, { useEffect } from "react";
import draw from "../actions/draw";

function Canvas(props) {
  const graph = [
    {
      node: "a",
      neighbours: [
        { node: "b", capacity: "13" },
        { node: "c", capacity: "8" },
      ],
    },
    {
      node: "b",
      neighbours: [
        { node: "a", capacity: "13" },
        { node: "d", capacity: "3" },
      ],
    },
    {
      node: "c",
      neighbours: [
        { node: "a", capacity: "8" },
        { node: "e", capacity: "4" },
      ],
    },
    {
      node: "d",
      neighbours: [
        { node: "b", capacity: "3" },
        { node: "f", capacity: "8" },
      ],
    },
    {
      node: "e",
      neighbours: [
        { node: "c", capacity: "4" },
        { node: "f", capacity: "8" },
      ],
    },
    {
      node: "f",
      neighbours: [
        { node: "d", capacity: "8" },
        { node: "e", capacity: "8" },
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
