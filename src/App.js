import Canvas from "./components/canvas.jsx";
import PreparedBy from "./components/preparedBy";
import "bootstrap/dist/css/bootstrap.css";
import Configs from "./components/configs.jsx";
import React from "react";

function App() {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <div className="container">
      <h3 className="display-4 text-center">
        Ford Fulkerson Algorithm and Min-Cut Simulation
      </h3>
      <PreparedBy />
      <hr />
      <div className="row">
        <div className="col-12 col-lg-8 order-2 order-lg-1">
          <Canvas isActive={isActive} />
        </div>
        <div className="col-12 col-lg-4 order-1 order-lg-2">
          <Configs setIsActive={setIsActive} />
        </div>
      </div>
    </div>
  );
}

export default App;
