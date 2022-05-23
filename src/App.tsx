import { Routes, Route } from "react-router-dom";
import Calendar from "./components/Calendar";
import GridGame from "./components/GridGame";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/game" element={<GridGame />} />
      </Routes>
    </div>
  );
}

export default App;
