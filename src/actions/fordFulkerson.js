const adjacencyList = [
  {
    nodeId: 0,
    node: "s",
    connections: [
      { nodeId: 1, node: "a", capacity: "13" },
      { nodeId: 3, node: "c", capacity: "8" },
    ],
  },
  {
    nodeId: 1,
    node: "a",
    connections: [
      { nodeId: 3, node: "c", capacity: "8" },
      { nodeId: 2, node: "b", capacity: "10" },
    ],
  },
  {
    nodeId: 2,
    node: "b",
    connections: [
      { nodeId: 3, node: "c", capacity: "1" },
      { nodeId: 4, node: "d", capacity: "3" },
    ],
  },
  {
    nodeId: 3,
    node: "c",
    connections: [{ nodeId: 5, node: "t", capacity: "10" }],
  },
  {
    nodeId: 4,
    node: "d",
    connections: [
      { nodeId: 3, node: "c", capacity: "8" },
      { nodeId: 5, node: "t", capacity: "7" },
    ],
  },
  {
    nodeId: 5,
    node: "t",
    connections: [],
  },
];

let flowGraph = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

for (let i = 0; i < 5; i++) {
  let j = 0;
  let k;
  let t = 0;
  while (adjacencyList[i]["connections"][j] != undefined) {
    k = adjacencyList[i]["connections"][j]["nodeId"];
    flowGraph[i][k] = adjacencyList[i]["connections"][j]["capacity"] - "0";
    j++;
  }
}

var parent = [0, 0, 0, 0, 0, 0];

function BFS(residueGraph) {
  let visited = [false, false, false, false, false, false];
  let q = [];
  q.push(0);
  visited[0] = true;
  parent[0] = -1;
  while (q.length != 0) {
    let u = q.shift();
    for (let v = 0; v < 6; v++) {
      if (visited[v] === false && residueGraph[u][v] > 0) {
        q.push(v);
        parent[v] = u;
        visited[v] = true;
      }
    }
  }
  return visited[5] == true;
}
function FordFulkerson() {
  let maxFlow = 0;
  let residueGraph = [[], [], [], [], [], []];

  for (let i = 0; i < 6; i++)
    for (let j = 0; j < 6; j++) residueGraph[i][j] = flowGraph[i][j];

  let v = 0;
  let u = 0;
  while (BFS(residueGraph)) {
    let bottleneck = Number.MAX_VALUE;
    for (v = 5; v != 0; v = parent[v]) {
      u = parent[v];
      bottleneck = Math.min(bottleneck, residueGraph[u][v]);
    }

    for (v = 5; v != 0; v = parent[v]) {
      u = parent[v];
      residueGraph[u][v] -= bottleneck;
      residueGraph[v][u] += bottleneck;
    }

    maxFlow += bottleneck;
  }

  let flowOfGraph = [[], [], [], [], [], []];

  for (let i = 0; i < 6; i++)
    for (let j = 0; j < 6; j++)
      if (flowGraph[i][j] > residueGraph[i][j])
        flowOfGraph[i][j] = flowGraph[i][j] - residueGraph[i][j];
      else flowOfGraph[i][j] = 0;

  console.log("Capacity of Flow Graph", flowGraph);
  console.log("Flow of Flow Graph", flowOfGraph);
  console.log("Residue Graph", residueGraph);
  console.log("Max Flow", maxFlow);
}

FordFulkerson();
