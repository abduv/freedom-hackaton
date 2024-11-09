import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import { Main2 } from "./components/main2";
function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Main2 />} />
        <Route exact path="/main" element={<Main2 />} />
      </Routes>
    </div>
  );
}

export default App;
