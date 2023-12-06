import HelloWorld from "./HelloWorld";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import "./libs/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="/Home" element={<HelloWorld />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
export default App;
