import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import Main  from "./components/main"
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
