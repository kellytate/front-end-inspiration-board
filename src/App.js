import "./App.css";
import AboutScreen from "./screens/AboutScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <div className="App">
      <main>
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about" element={<AboutScreen />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
};

export default App;
