import Canvas from "./components/canvas.jsx";
import PreparedBy from "./components/preparedBy";
import "bootstrap/dist/css/bootstrap.css";
import Configs from "./components/configs.jsx";
import React from "react";
import InputAdjacency from "./components/inputAdjacency.jsx";

function App() {
  const [isActive, setIsActive] = React.useState(false);
  const [adjacencyList, setAdjacencyList] = React.useState([]);
  const [augmentingPaths, setAugmentingPaths] = React.useState([]);
  const [currentAugmentingIndex, setCurrentAugmentingIndex] = React.useState(0);
  const [bottlenecks, setBottlenecks] = React.useState(null);
  const [maxFlowPath, setMaxFlowPath] = React.useState([]);
  const [maxFlow, setMaxFlow] = React.useState(null);
  const [isGraphChanged, setIsGraphChanged] = React.useState(false);

  return (
    <div className="container">
      <h3 className="display-4 text-center"> 
        Ford Fulkerson Algorithm Simulation
      </h3>
      <PreparedBy />
      <hr />
      <div className="row">
        <div className="col-12">
          <InputAdjacency
            setAdjacencyList={setAdjacencyList}
            setIsGraphChanged={setIsGraphChanged}
            setIsActive={setIsActive}
          />
        </div>
        <div className="col-12 col-xl-8 order-2 order-xl-1">
          <Canvas
            adjacencyList={adjacencyList}
            isGraphChanged={isGraphChanged}
            setIsGraphChanged={setIsGraphChanged}
            isActive={isActive}
            setAugmentingPaths={setAugmentingPaths}
            setCurrentAugmentingIndex={setCurrentAugmentingIndex}
            setMaxFlowPath={setMaxFlowPath}
            setBottlenecks={setBottlenecks}
            setMaxFlow={setMaxFlow}
          />
        </div>
        <div className="col-12 col-xl-4 order-1 order-xl-2">
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
