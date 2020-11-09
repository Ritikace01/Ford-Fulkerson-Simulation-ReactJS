import Canvas from "./components/canvas.jsx";
import PreparedBy from "./components/preparedBy";
import "bootstrap/dist/css/bootstrap.css";
import Configs from "./components/configs.jsx";
import React from "react";

function App() {
  const [isActive, setIsActive] = React.useState(false);
  const [augmentingPaths, setAugmentingPaths] = React.useState([]);
  const [currentAugmentingIndex, setCurrentAugmentingIndex] = React.useState(0);
  const [bottlenecks, setBottlenecks] = React.useState(null);
  const [maxFlowPath, setMaxFlowPath] = React.useState([]);
  const [maxFlow, setMaxFlow] = React.useState(null);

  return (
    <div className="container">
      <h3 className="display-4 text-center">
        Ford Fulkerson Algorithm and Min-Cut Simulation
      </h3>
      <PreparedBy />
      <hr />
      <div className="row">
        <div className="col-12 col-lg-8 order-2 order-lg-1">
          <Canvas
            isActive={isActive}
            setAugmentingPaths={setAugmentingPaths}
            setCurrentAugmentingIndex={setCurrentAugmentingIndex}
            setMaxFlowPath={setMaxFlowPath}
            setBottlenecks={setBottlenecks}
            setMaxFlow={setMaxFlow}
          />
        </div>
        <div className="col-12 col-lg-4 order-1 order-lg-2">
          <Configs
            setIsActive={setIsActive}
            augmentingPaths={augmentingPaths}
            currentAugmentingIndex={currentAugmentingIndex}
            bottlenecks={bottlenecks}
            maxFlowPath={maxFlowPath}
            maxFlow={maxFlow}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
