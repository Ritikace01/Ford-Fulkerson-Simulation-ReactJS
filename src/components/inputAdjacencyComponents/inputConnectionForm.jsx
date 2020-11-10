import React from "react";
import checkImage from "bootstrap-icons/icons/check2.svg";
import coordinates from "../../actions/nodeCoordinates";

function InputConnectionForm(props) {
  const addConnection = props.addConnection;

  const [vertex, setVertex] = React.useState(-1);
  const [capacity, setCapacity] = React.useState("");
  const [adjacencyList, setAdjacencyList] = React.useState([]);
  const [currentNode, setCurrentNode] = React.useState(null);

  React.useEffect(() => {
    setAdjacencyList(props.adjacencyList);
    setCurrentNode(props.currentNode);
  }, [props.adjacencyList, props.currentNode]);

  const handleSubmit = () => {
    //do sending back data statements...
    if (vertex !== "-1" && capacity !== "") {
      const connection = {
        nodeId: parseInt(vertex),
        capacity: capacity,
      };
      addConnection(connection);
    }
  };

  return (
    <React.Fragment>
      <div className="form-row d-inline">
        <div
          className="form-group col-md-3 "
          style={{ display: "inline-block" }}
        >
          <div className="input-group intput-group-sm">
            <div className="input-group-prepend">
              <select
                defaultValue={-1}
                onChange={(e) => {
                  setVertex(e.currentTarget.value);
                }}
                className="custom-select custom-select-sm rounded-0"
              >
                <option value={-1} disabled={true}>
                  Select Vertex
                </option>
                {adjacencyList.length !== 0 &&
                  adjacencyList
                    .filter((node, index) => {
                      const another = adjacencyList[
                        currentNode
                      ].connections.find((n, i) => {
                        //
                        if (n.nodeId === node.nodeId) return n;
                        else return null;
                      });
                      const reverse = adjacencyList[
                        node.nodeId
                      ].connections.find((node) => node.nodeId === currentNode);

                      if (
                        another ||
                        reverse ||
                        node.nodeId === 0 ||
                        currentNode === node.nodeId
                      )
                        return null;
                      else return node;
                    })
                    .map((node, index) => {
                      return (
                        <option key={index} value={node.nodeId}>
                          {node.node}
                        </option>
                      );
                    })}
              </select>
            </div>
            <input
              type="text"
              placeholder="Capacity"
              onChange={(e) => {
                setCapacity(e.currentTarget.value);
              }}
              className="form-control  form-control-sm"
              aria-label="Text input with segmented dropdown button"
            />
            <div className="input-group-append">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-outline-success btn-sm"
              >
                <img src={checkImage} className=" d-inline" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default InputConnectionForm;
