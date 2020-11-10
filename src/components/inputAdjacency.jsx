import React from "react";
import arrowImage from "bootstrap-icons/icons/arrow-right.svg";
import InputConnectionForm from "./inputAdjacencyComponents/inputConnectionForm";
import coordinates from "./../actions/nodeCoordinates";

const InputAdjacency = (props) => {
  const [adjacencyList, setAdjacencyList] = React.useState([]);
  const [activeAdd, setActiveAdd] = React.useState([]);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  //initializing adjacency list with default graph:
  React.useEffect(() => {
    const adjList = [
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
        connections: [
          { nodeId: 5, node: "t", capacity: "10", isFlowing: false },
        ],
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
      },
    ];
    setActiveAdd([false, false, false, false, false, false]);
    setAdjacencyList(adjList);
    props.setAdjacencyList(adjList);
  }, []);

  const handleAdd = (index) => {
    const active = activeAdd;
    active[index] = true;
    setActiveAdd(active);
    forceUpdate();
  };

  const addConnection = (nodeIndex, value) => {
    const nodeName = coordinates[value.nodeId].node;
    const adjList = adjacencyList;
    value.node = nodeName;
    value.isFlowing = false;
    adjList[nodeIndex].connections.push(value);
    setAdjacencyList(adjList);
    const active = [...activeAdd];
    active[nodeIndex] = false;
    setActiveAdd(active);
    props.setIsActive(false);
    props.setIsGraphChanged(true);
    forceUpdate();
  };

  const disabledCondition = (index) => {
    console.log("adjacency lsit: ", adjacencyList);
    const filteredList = adjacencyList.filter((node, i) => {
      const another = adjacencyList[index].connections.find((n, i) => {
        //
        if (n.nodeId === node.nodeId) return n;
        else return null;
      });
      const reverse = adjacencyList[node.nodeId].connections.find(
        (node) => node.nodeId === index
      );

      if (another || reverse || node.nodeId === 0 || index === node.nodeId)
        return null;
      else return node;
    });
    console.log("filteredList = ", filteredList);
    return filteredList.length === 0;
  };

  const handleDelete = (nodeIndex, connectionIndex) => {
    const adjList = adjacencyList;
    const connections = adjList[nodeIndex].connections;
    connections.splice(connectionIndex, 1);
    adjList[nodeIndex].connections = connections;
    setAdjacencyList(adjList);
    props.setIsGraphChanged(true);
    props.setIsActive(false);
    forceUpdate();
    console.log(nodeIndex, connectionIndex);
  };

  const renderNodeLists = () => {
    if (adjacencyList.length !== 0)
      return coordinates
        .filter((m, index) => index < 5)
        .map((node, index) => {
          return (
            <div className="mt-4 mb-4" key={index}>
              <button
                type="button"
                disabled={true}
                className=" btn btn-outline-dark rounded-circle mr-1 shadow"
              >
                <strong>{node.node}</strong>
              </button>
              <img src={arrowImage} className=" d-inline mr-2" />
              {
                /* write code for mapping all connected nodes*/
                adjacencyList[index].connections.map((n, i) => {
                  return (
                    <div
                      class="alert alert-light border shadow d-inline m-2"
                      role="alert"
                    >
                      <strong>{n.node + ", " + n.capacity}</strong>
                      <a
                        type="button"
                        onClick={() => handleDelete(index, i)}
                        className="btn btn-danger btn-sm ml-3"
                      >
                        <strong>x</strong>
                      </a>
                    </div>
                    // <button
                    //   key={i}
                    //   type="button"
                    //   disabled={true}
                    //   className="btn-sm btn btn-secondary mr-1"
                    // >
                    //   <strong>{n.node + ", " + n.capacity}</strong>

                    //   <a
                    //     type="button"
                    //     onClick={() => handleDelete(index, i)}
                    //     className="btn btn-danger btn-sm ml-3"
                    //   >
                    //     <strong>x</strong>
                    //   </a>
                    // </button>
                  );
                })
              }
              {!activeAdd[index] ? (
                <button
                  onClick={() => handleAdd(index)}
                  type="button"
                  disabled={disabledCondition(index)}
                  className="btn btn-dark btn"
                >
                  <strong>+</strong>
                </button>
              ) : null}
              {activeAdd[index] ? (
                <div className="mt-2 d-inline">
                  <InputConnectionForm
                    adjacencyList={adjacencyList}
                    currentNode={index}
                    addConnection={(value) => addConnection(index, value)}
                  />
                </div>
              ) : null}
            </div>
          );
        });
  };

  return (
    <div>
      <div>
        <h5>Input: </h5>
        {activeAdd.length !== 0 ? renderNodeLists() : null}
      </div>
    </div>
  );
};

export default InputAdjacency;
