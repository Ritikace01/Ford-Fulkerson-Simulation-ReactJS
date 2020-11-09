import React from "react";

function Configs(props) {
  let [buttonDisabled, setButtonDisabled] = React.useState(false);

  return (
    <div>
      <p className="lead">Start Ford-Fulkerson Simulation: </p>
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
    </div>
  );
}

export default Configs;
