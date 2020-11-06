import "./styles.css";
import Canvas from "./components/canvas.jsx";
import PreparedBy from "./components/preparedBy";

function App() {
  return (
    <div className="container">
      <h1>Ford Fulkerson Algorithm and Min-Cut Simulation</h1>
      <PreparedBy />
      <hr />
      <Canvas />
    </div>
  );
}

export default App;
