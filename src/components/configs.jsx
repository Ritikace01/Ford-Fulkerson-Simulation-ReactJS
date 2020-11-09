import React from "react";
import coordinates from "../actions/nodeCoordinates";

function Configs(props) {
  const { maxFlowPath, maxFlow } = props;

  let [buttonDisabled, setButtonDisabled] = React.useState(false);
  let [currentIndex, setCurrentIndex] = React.useState(0);
  let [augmentingPaths, setAugmentingPaths] = React.useState(null);
  let [bottlenecks, setBottlenecks] = React.useState([]);

  React.useEffect(() => {
    setCurrentIndex(props.currentAugmentingIndex);
    setAugmentingPaths(props.augmentingPaths);
    setBottlenecks(props.bottlenecks);
  }, [props.currentAugmentingIndex, props.augmentingPaths, props.bottlenecks]);

  const displayPath = () => {
    //
    if (augmentingPaths && augmentingPaths.length > currentIndex) {
      const path = augmentingPaths[currentIndex];
      return path.map((node, index) => {
        if (node === -1) return null;
        const child = coordinates[index];
        return (
          <p className="lead d-inline">
            <strong>{"-> " + child.node}</strong>
          </p>
        );
      });
    }
  };

  const displayBottlenecks = () => {
    //
    if (bottlenecks && bottlenecks.length > currentIndex)
      return bottlenecks
        .filter((value, index) => index <= currentIndex)
        .map((value, index) => (
          <React.Fragment>
            <p className="lead d-inline">
              <strong>{value + (index !== currentIndex ? " + " : null)}</strong>
            </p>
          </React.Fragment>
        ));
  };

  const finalMessage = () => {
    if (bottlenecks)
      return (
        <React.Fragment>
          <p className="lead">
            <strong>This is the max flow path.</strong>
          </p>
          <p className="lead d-inline">
            <strong>
              The max flow is:{" "}
              {bottlenecks.reduce((total, current) => total + current, 0)}
            </strong>
          </p>
        </React.Fragment>
      );
  };

  return (
    <div>
      <p className="lead">
        <strong>Start Ford-Fulkerson Simulation: </strong>
      </p>
      <button
        type="button"
        disabled={buttonDisabled}
        onClick={() => {
          props.setIsActive(true);
          setButtonDisabled(true);
        }}
        className="btn btn-lg btn-outline-dark"
      >
        Start Simulation
      </button>
      <hr />
      {augmentingPaths && currentIndex < augmentingPaths.length ? (
        <p className="lead">Augmenting Path:</p>
      ) : null}
      {buttonDisabled ? (
        <React.Fragment>
          {augmentingPaths && currentIndex < augmentingPaths.length ? (
            <p className="lead d-inline">
              <strong>s</strong>
            </p>
          ) : null}
          {displayPath()}
          {augmentingPaths && currentIndex < augmentingPaths.length ? (
            <React.Fragment>
              <hr />
              <p className="lead">Max Flow:</p>
              {displayBottlenecks()}
            </React.Fragment>
          ) : null}
          {currentIndex === augmentingPaths.length ? finalMessage() : null}
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default Configs;
