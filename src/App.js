import { Route, Routes } from "react-router-dom";
import Calculator from "./Calculator";
import Temp from "./Temp";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Calculator />}></Route>
        <Route path="/Temp" element={<Temp />}></Route>
      </Routes>
    </div>
  );
}
export default App;
