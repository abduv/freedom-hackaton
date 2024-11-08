import { Routes, Route } from 'react-router-dom';
import { Main } from "./components/main"
// import { Footer } from "./components/footer"
// import { Header } from "./components/header"

function App() {

  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route exact path="/" component={Main} />
        <Route exact path="/main" component={Main} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}
export default App;
